import Ember from 'ember';
import {raf} from '../utils/e3-raf';
const {get, set, computed, Evented} = Ember;

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
   An optional hook to do somethign before a tick occurs.
   */
  tickWillRender(time) {},

  /*
   An optional hook to do somethign after a tick occurs.
   */
  tickDidRender(time) {},

  /*
   A flag that says wether there is an animation already running.
   */
  hasActiveQueue: false,

  /*
   The timestamp of the last tick in the RAF loop.
   */
  lastAnimationTick: 0,

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
   Start an animation.
   */
  _animate() {
    var that = this;
    set(this, 'hasActiveQueue', true);
    requestAnimationFrame(function(newTime) {
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

    // Save this as the last tick
    set(this, 'lastAnimationTick', time);
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
