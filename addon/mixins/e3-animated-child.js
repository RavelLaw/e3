import Ember from 'ember';
import e3Child from './e3-child';
const {get, set, copy, tryInvoke, run: {scheduleOnce}} = Ember;
const {keys} = Object;


export default Ember.Mixin.create(e3Child, {
  /*
   The public set-able attributes. This will be expanded on by the component itself.
   */
  attrs: {
    data: null,
    zindex: null
  },

  /*
   The previous actualized state of the object.
   */
  _previousState: null,

  /*
   This will be an object that represents how the object should be rendered when it
   is initially rendered into the viz. This will be merged with the transition state.
     ex: {
        x: 'xScale',
        y: 'yScale',
        r: function() {
          return this.calcRadius();
        }
     }
   */
  enterState: null,

  /*
   This describes the result/static state after new data has been applied.
   */
  activeState: null,

  /*
   This describes the last state of the object before it is removed from the viz. It
   is merged with the activeState, similar to how the enter state is.
   */
  exitState: null,

  /*
   The state object that describes the animation properties (this can be based
   on the data provided to the object).
   */
  animationState: null,

  /*
   Track the status of this renderable.
   */
  hasRendered: false,

  /*
   A hook to provide the data context to calculate all the properties.
   */
  getDataContext() {
    return this.getAttr('data');
  },

  /*
   Apply the current state to the animation hash.
   */
  generateAnimationState(dataContext = null) {
    let animation = get(this, 'animation');
    let attrs = get(this, 'attrs');
    let data = dataContext || this.getAttr('data');
    let resultState = {};

    if(!animation) {
      return resultState;
    }

    keys(animation).forEach((key, index) => {
      let val = attrs.hasOwnProperty(key) ? this.getAttr(key) : get(animation, key);
      resultState[key] = typeof val === 'function' ? val.call(this, data, index) : val;
    });

    return resultState;
  },

  /*
   Given the data and a state object, which is made up of primitives or functions,
   output the result object with all primitive values.

   Also, if there was an attribute set with the same name directly, use that instead.
   */
  generateState(stateName, dataContext = null) {
    let activeState = get(this, 'activeState');

    let data = dataContext || this.getDataContext();
    let attrs = this.get('attrs');
    let resultState = {};
    let requiredKeys = keys(activeState).concat(keys(attrs));
    let state;

    // First apply the values to the active state
    requiredKeys.forEach((key, index) => {
      let val = attrs.hasOwnProperty(key) ? this.getAttr(key) : get(activeState, key);
      resultState[key] = typeof val === 'function' ? val.call(this, data, index) : val;
    });

    // Then, apply the overrides to the state if it's not the active state.
    if(stateName !== 'activeState' && (state = get(this, stateName))) {
      keys(state).forEach((key, index) => {
        let val = get(state, key);
        resultState[key] = typeof val === 'function' ? val.call(this, data, index) : val;
      });
    }

    // Then, make sure that from among the required values, there is a value set.
    let isValidState = true;
    requiredKeys.forEach(key => {
      let val = resultState[key];
      if(val === undefined || val === null) {
        isValidState = false;
      }
    });

    if(isValidState) {
      return resultState;
    } else {
      return false;
    }
  },

  /*
   Regsiter this state to the context/stage once we've received attributes for the first time.
   */
  didInitAttrs() {
    this.setupInitialState();
  },

  /*
   Setup the intial state
   */
  setupInitialState() {
    let state = this.generateState('enterState');

    if(state) {
      this._previousState = state;
      this.generateShadowObject(this.getType(), state);
      this.registerToContext();
      set(this, 'hasRendered', true);
      scheduleOnce('afterRender', this, 'doRenderNewState');
      return true;
    }

    return false;
  },

  /*
   Whenever the did render hook runs, start an animation to update the shadow object.
   TODO: Make sure we handle animation interruptions.
   */
  didUpdateAttrs() {
    if(get(this, 'hasRendered') || this.setupInitialState()) {
      scheduleOnce('afterRender', this, 'doRenderNewState');
    }

    tryInvoke(get(this, '_e3Context'), 'childDidUpdateAttrs');
  },

  /*
   Make sure we only attempt a render once in a run loop.
   */
  doRenderNewState() {
    let resultState = this.generateState('activeState');

    // Only render if the state is a truthy value.
    if(resultState) {
      this.triggerAnimateTo(resultState);
    }
  },

  /*
   Render this out when it's going to be destroyed.
   */
  willDestroyElement() {
    let resultState = this.generateState('exitState');
    let shadow = get(this, 'shadow');
    let context = this.getAttr('_e3Context');

    // Let the parent attempt to handle this first.
    if(tryInvoke(get(this, '_e3Context'), 'childWillDestroy', [this])) {
      return;
    }

    if(!shadow) {
      return;
    }

    if(resultState) {
      this.triggerAnimateTo(resultState, () => {
        context.unregister(this);
        shadow.destroy();
      });
    } else {
      context.unregister(this);
      shadow.destroy();
    }
  },

  /*
   Render State
   */
  triggerAnimateTo(resultState, finishedCallback) {
    let animation = this.generateAnimationState();
    this.getAttr('_e3Context').animateTo(this, resultState, animation, finishedCallback);
  },

  /*
   Setup the various states. The active state is the default, and there
   may be overrides for the enter & exit states.
   */
  init() {
    let activeState = get(this, 'activeState');
    let enterState = get(this, 'enterState');
    let exitState = get(this, 'exitState');
    let animationState = get(this, 'animationState');

    // If there is an enter state, merge its properties with the active state.
    set(this, 'enterState', enterState ? copy(enterState) : copy(activeState));
    set(this, 'exitState', exitState ? copy(exitState) : copy(get(this, 'enterState')));

    // Also, make sure we create a copy so these can be overwritten.
    set(this, 'activeState', copy(activeState));
    if(animationState) {
      set(this, 'animationState', copy(animationState));
    }

    this._super();
  }
});
