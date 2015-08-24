import Ember from 'ember';
import e3Child from './e3-child';
import interpolate from '../utils/e3-interpolate';
const {get, set, copy, run: {scheduleOnce}} = Ember;
const {keys} = Object;
const {max, min} = Math;

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
   Given the data and a state object, which is made up of primitives or functions,
   output the result object with all primitive values.

   Also, if there was an attribute set with the same name directly, use that instead.
   */
  generateState(stateName) {
    let activeState = get(this, 'activeState');

    let data = this.getDataContext();
    let attrs = this.get('attrs');
    let resultState = {};
    let requiredKeys = keys(activeState);
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
   Hook to start an animation of this object.
   */
  animateWithContext(callback) {
    this.getAttr('_e3Context').addToQueue(callback);
  },

  /*
   Whenever the did render hook runs, start an animation to update the shadow object.
   TODO: Make sure we handle animation interruptions.
   */
  didUpdateAttrs() {
    if(get(this, 'hasRendered') || this.setupInitialState()) {
      scheduleOnce('afterRender', this, 'doRenderNewState');
    }
  },

  /*
   Make sure we only attempt a render once in a run loop.
   */
  doRenderNewState() {
    let resultState = this.generateState('activeState');

    // Only render if the state is a truthy value.
    if(resultState) {
      this.renderState(resultState);
    }
  },

  /*
   Render this out when it's going to be destroyed.
   */
  willDestroyElement() {
    let resultState = this.generateState('exitState');
    let shadow = get(this, 'shadow');
    let context = this.getAttr('_e3Context');

    if(!shadow) {
      return;
    }

    if(resultState) {
      this.renderState(resultState, () => {
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
  renderState(resultState, finishedCallback) {
    let startState = get(this, '_previousState');
    let animation = this.generateState('animation');
    var start = null;

    // Start an animation.
    this.animateWithContext(time => {
      if(start === null) {
        start = time;
      }

      // Get the overall percent complete.
      let percentComplete = getPercentComplete(start, time, animation.duration, animation.delay);

      // Get the "eased" percent complete.
      let easePercent = ease(animation.easing, percentComplete);

      // Interpolate the current state
      let currentState = interpolate(startState, resultState, easePercent);

      // Save this current state.
      this._previousState = currentState;

      // Then, lastly, apply the attributes to the shadow object.
      this.updateShadowObject(currentState);

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

/*
 Calculate the percentage complete based on the times/delays.
 */
function getPercentComplete(startTime, currentTime, totalDuration = 200, delay = 0) {
  let currentDuration = currentTime - delay - startTime;

  // This should only happen if there's a delay.
  if(currentDuration < 0) {
    return 0;
  }

  return max(0, min(1, currentDuration / totalDuration));
}

/*
 Lookup the easing function and apply.
 */
function ease(easeName, percent) {
  return percent;
}
