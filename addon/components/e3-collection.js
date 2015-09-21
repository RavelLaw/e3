import Ember from 'ember';
import layout from '../templates/components/e3-collection';
import Renderable from '../utils/shadow/renderable';
import calculateChanges from '../utils/e3-calculate-changes';
const {keys} = Object;
const {
  get, set, computed, guidFor,
  run: {scheduleOnce}
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
   Prevent the child from doing any actual rendering.
   */
  animateTo() {},

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

  childWillDestroy(component) {
    let components = get(this, 'components');
    let guid = guidFor(component);
    let {children} = components[guid];
    delete components[guid];

    keys(children).forEach(key => {
      let pseudoComponent = children[key];
      this.removePseudoComponent(component, pseudoComponent);
    });

    return true;
  },

  didUpdateAttrs(attrs) {
    let updated = this.getAttrFor(attrs.newAttrs, 'iterable');
    let old = this.getAttrFor(attrs.oldAttrs, 'iterable');

    // If the iterable changed only:
    if(updated !== old) {
      this.queueProcessing();
    }
  },

  childDidUpdateAttrs() {
    this.queueProcessing();
    return true;
  },

  registerPseudoComponent(pseudoComponent) {
    this.getAttr('_e3Context').register(pseudoComponent);
  },

  unregisterPseudoComponent(pseudoComponent) {
    this.getAttr('_e3Context').unregister(pseudoComponent);
  },


  queueProcessing() {
    scheduleOnce('afterRender', this, 'processIterable');
  },

  /*
   This will go and register/unregister/update all of the combinations of components
   and items in the array according to the newest state.
   */
  processIterable() {
    let iterable = this.getAttr('iterable');
    let itemKey = this.getAttr('key');
    let components = get(this, 'components');

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
      let component = components[key];
      this.processIterableComponent(component, iterableGuids, iterableMap);
    });
  },

  /*
   Given one of the descendant components, process the changes given the
   */
  processIterableComponent(componentItem, iterableGuids, iterableMap) {
    let {component, children, dataState} = componentItem;
    let {enter, exit, active} = calculateChanges(dataState, iterableGuids);
    let type = this.getType();
    componentItem.dataState = active;

    // For the new items, create a shadow object.
    enter.forEach(guid => {
      let data = iterableMap[guid];
      let enterState = component.generateState('enterState', data);

      // Save this shadow as a child.
      let pseudoComponent = {
        _previousState: enterState,
        lastData: data,
        guid: guid,
        shadow: this.generateShadowObject(component, type, enterState)
      };

      children[guid] = pseudoComponent;
      this.registerPseudoComponent(pseudoComponent);
    });

    // For the leaving items, animate them out.
    exit.forEach(guid => {
      let pseudoComponent = children[guid];
      delete children[guid];
      this.removePseudoComponent(component, pseudoComponent);
    });

    active.forEach(guid => {
      let data = iterableMap[guid];
      let child = children[guid];
      let activeState = component.generateState('activeState', data);
      let animation = component.generateAnimationState(data);
      child.lastData = data;
      this.triggerAnimateTo(child, activeState, animation);
    });
  },

  triggerAnimateTo(pseudoComponent, resultState, animation, finishedCallback) {
    this.getAttr('_e3Context').animateTo(pseudoComponent, resultState, animation, finishedCallback);
  },

  /*
   Hook to animate out a pseudo compoennt
   */
  removePseudoComponent(component, pseudoComponent) {
    let data = pseudoComponent.lastData;
    let exitState = component.generateState('exitState', data);
    let animation = component.generateAnimationState(data);

    this.triggerAnimateTo(pseudoComponent, exitState, animation, () => {
      this.unregisterPseudoComponent(pseudoComponent);
      pseudoComponent.shadow.destroy();
    });
  },

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
