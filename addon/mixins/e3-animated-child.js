import Ember from 'ember';
import e3Child from './e3-child';
import interpolate from '../utils/e3-interpolate';
const {get, set, merge, copy} = Ember;
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
   Given the data and a state object, which is made up of primitives or functions,
   output the result object with all primitive values.

   Also, if there was an attribute set with the same name directly, use that instead.
   */
  generateState(state) {
    let data = this.getAttr('data');
    let zindex = this.getAttr('zindex');
    let attrs = this.get('attrs');
    let resultState = {};

    // Add the current index if there is one.
    resultState.zindex = this.getAttr('zindex');

    // For each of the keys in the state, either just use
    // the value if it's not a function; or apply the data to the function.
    if(state) {
      keys(state).forEach(key => {
        let val = attrs.hasOwnProperty(key) ? this.getAttr(key) : get(state, key);
        if(typeof val === 'function') {
          resultState[key] = val.call(this, data, index);
        } else {
          resultState[key] = val;
        }
      });
    }

    return resultState;
  },

  /*
   Regsiter this state to the context/stage once we've received attributes for the first time.
   */
  didInitAttrs() {
    let state = this.generateState(get(this, 'enterState'));
    this._previousState = state;
    this.generateShadowObject(this.getType(), state);
    this.registerToContext();
  },

  /*
   Hook to start an animation of this object.
   */
  animateWithContext(callback) {
    this.getAttr('context').addToQueue(callback);
  },

  /*
   Whenever the did render hook runs, start an animation to update the shadow object.
   TODO: Make sure we handle animation interruptions.
   */
  didRender() {
    let resultState = this.generateState(get(this, 'activeState'));
    this.renderState(resultState);
  },

  /*
   Render this out when it's going to be destroyed.
   */
  willDestroyElement() {
    let resultState = this.generateState(get(this, 'exitState'));
    let shadow = get(this, 'shadow');
    let context = this.getAttr('context');

    this.renderState(resultState, () => {
      context.unregister(this);
      shadow.destroy();
    });
  },

  /*
   Render State
   */
  renderState(resultState, finishedCallback) {
    let startState = get(this, '_previousState');
    let animation = this.generateState(get(this, 'animation'));
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
    set(this, 'enterState', enterState ? merge(copy(activeState), enterState) : copy(activeState));
    set(this, 'exitState', exitState ? merge(copy(activeState), exitState) : copy(activeState));

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
function getPercentComplete(startTime, currentTime, totalDuration = 200, delay = 400) {
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