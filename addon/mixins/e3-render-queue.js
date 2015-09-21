import Ember from 'ember';
import raf from '../utils/e3-raf';
import interpolate from '../utils/e3-interpolate';
import getEasingFunction, {getPercentComplete} from '../utils/e3-easing';
const {get, set, computed, Evented} = Ember;
const RAF = raf();

export default Ember.Mixin.create(Evented, {
  /*
   The list of items that are currently being animated.
   */
  animationQueue: computed(function() {
    return Ember.A();
  }),

  /*
   An optional hook for before a series of animations occur
   */
  animationWillStart() {},

  /*
   An optional hook for after a series of animations occur
   */
  animationDidComplete() {},

  /*
   An optional hook to do something before a tick occurs.
   */
  tickWillRender(/*time*/) {},

  /*
   An optional hook to do something after a tick occurs.
   */
  tickDidRender(/*time*/) {},

  /*
   A flag that says wether there is an animation already running.
   */
  hasActiveQueue: false,

  /*
   Add a new animation to the queue.
   @param animatable is a function which returns true when it's done animating.
   */
  addToQueue(animatable) {
    get(this, 'animationQueue').push(animatable);

    // If we're not animating; start.
    if(!get(this, 'hasActiveQueue')) {
      this.trigger('animationWillStart');
      this._animate();
    }
  },

  /*
   Hook to initiate a component render.
   */
  animateTo(component, resultState, animation, finishedCallback) {
    let startState = get(component, '_previousState');
    let shadow = get(component, 'shadow');
    let ease = getEasingFunction(animation.ease);
    let start = null;

    this.addToQueue(time => {
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
      component._previousState = currentState;

      // Update the shadown's attributes
      shadow.setAttributes(currentState);

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
   Start an animation.
   */
  _animate() {
    var that = this;
    set(this, 'hasActiveQueue', true);
    RAF(function(newTime) {
      that._flushQueue(newTime);
    });
  },

  /*
   Iterate through all the animation steps.
   */
  _flushQueue(time) {
    this.trigger('tickWillRender', time);

    var queue = get(this, 'animationQueue');

    // Iterate through the queue.
    for (var i = queue.length - 1; i >= 0; i--) {
      let done = queue[i](time);

      // If it's done, remove it from the queue.
      if(done) {
        queue.splice(i, 1);
      }
    }

    // Trigger the did render hook.
    this.trigger('tickDidRender', time);

    if(queue.length > 0) {
      // If there's still an active queue, animate again.
      this._animate();
    } else {
      // Otherwise, turn off animation.
      set(this, 'hasActiveQueue', false);
      this.trigger('animationDidComplete');
    }
  }
});
