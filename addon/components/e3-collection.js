import Ember from 'ember';
import layout from '../templates/components/e3-collection';
import Renderable from '../utils/shadow/renderable';
import calculateChanges from '../utils/e3-calculate-changes';
import interpolate from '../utils/e3-interpolate';
import getEasingFunction, {getPercentComplete} from '../utils/e3-easing';

const {keys} = Object;
const {
  get, set, computed, guidFor,
  run: {once}
} = Ember;

let e3Collection = Ember.Component.extend({
  tagName: '',
  layout: layout,
  data: {},

  /*
   This represents the components we should be rendering for each of the
   items in the array. 'tis a map!
   */
  components: computed(function() {
    return {};
  }),

  /*
   We should only yield the first item and then capture which "register" events
   are created. Then, we can re-create those register events for each of the subsequent
   items in the array.

   - Then, we need to update ALL
   - Keep a Map internally of all the objects; need to determine which are new, which are
     going away, etc.
   */

  // Methods that need to be handled
  getType() {
    return this.getAttr('_e3Context').getType();
  },

  /*
   When registering a child, this is an indication that we have a component that
   should be created for each of the items in the array.
   */
  register(component) {
    let guid = guidFor(component);
    set(this, 'components.'+guid, {
      component: component,
      dataState: [],
      children: Object.create(null)
    });

    this.queueProcessing();
  },

  unregister(component) {
    // TODO: Make this work.
    // let guid = guidFor(component);
    // let children = get(this, 'children');
    // delete children[guid];
    this.queueProcessing();
  },

  didUpdateAttrs(attrs) {
    let updated = this.getAttrFor(attrs.newAttrs, 'iterable');
    let old = this.getAttrFor(attrs.oldAttrs, 'iterable');

    // If the iterable changed only:
    if(updated !== old) {
      this.queueProcessing();
    }
  },

  registerPseudoComponent(pseudoComponent) {
    this.getAttr('_e3Context').register(pseudoComponent);
  },

  /*
   Prevent any registered components from attempting to animate.
   */
  addToQueue() {},

  /*
   Animate an object.
   */
  animateWithContext(callback) {
    this.getAttr('_e3Context').addToQueue(callback);
  },


  queueProcessing() {
    once(this, 'processIterable');
  },

  /*
   This will go and register/unregister/update all of the combinations of components
   and items in the array according to the newest state.
   */
  processIterable() {
    let iterable = this.getAttr('iterable');
    let itemKey = this.getAttr('key');
    let components = get(this, 'components');
    let type = this.getType();
    let context = get(this, '_e3Context');

    let iterableGuids = [];
    let iterableMap = Object.create(null);

    // Populate the guids/map for the current data.
    iterable.forEach(data => {
      let guid = itemKey ? get(data, itemKey) : guidFor(data);
      iterableGuids.push(guid);
      iterableMap[guid] = data;
    });

    // For each of the components, perform operations on enter/exit/active
    keys(components).forEach(key => {
      let {component, children, dataState} = components[key];
      let {enter, exit, active} = calculateChanges(dataState, iterableGuids);
      components[key].dataState = active;

      // For the new items, create a shadow object.
      enter.forEach(guid => {
        let data = iterableMap[guid];
        let enterState = component.generateState('enterState', data);

        // Save this shadow as a child.
        let pseudoComponent = {
          _previousState: enterState,
          shadow: this.generateShadowObject(component, type, enterState)
        };

        children[guid] = pseudoComponent;
        this.registerPseudoComponent(pseudoComponent);
      });

      // For the leaving items, animate them out.
      exit.forEach(guid => {
        let data = iterableMap[guid];
        let child = children[guid];
        let exitState = component.generateState('exitState', data);
        let animation = component.generateAnimationState(data);

        this.renderState(child, exitState, animation, () => {
          child.shadow.destroy();
          delete children[guid];
        });
      });

      active.forEach(guid => {
        let data = iterableMap[guid];
        let child = children[guid];
        let activeState = component.generateState('activeState', data);
        let animation = component.generateAnimationState(data);

        this.renderState(child, activeState, animation);
      });
    });
  },

  renderState(pseudoComponent, resultState, animation, finishedCallback) {
    let startState = get(pseudoComponent, '_previousState');
    let ease = getEasingFunction(animation.ease);
    let start = null;

    this.animateWithContext(time => {
      if(start === null) {
        start = time;
      }

      // Get the overall percent complete.
      let percentComplete = getPercentComplete(start, time, animation.duration, animation.delay);

      // Get the "eased" percent complete.
      let easePercent = ease(percentComplete);

      // Interpolate the current state
      let currentState = interpolate(startState, resultState, easePercent);

      // Save the current state
      pseudoComponent._previousState = currentState;

      // Update the shadown's attributes
      pseudoComponent.shadow.setAttributes(currentState);

      // If we're done, let the animation queue know.
      if(percentComplete >= 1) {
        if(finishedCallback) {
          finishedCallback(this);
        }
        return true;
      } else {
        return false;
      }
    });
  },


  // Then we'll need to handle this stuff, but for an array of items.
  /*
   Generate the shadow object.
   */
  generateShadowObject(component, contextType, attrs) {
    return new Renderable(component, get(component, 'shadowType'), contextType, attrs);
  },

  /*
   Update the attributes on the shadow object.
   */
  updateShadowObject(shadow, attrs) {
    shadow.setAttributes(attrs);
  }
});

e3Collection.reopenClass({
  positionalParams: ['_e3Context', 'iterable']
});

export default e3Collection;
