import Ember from 'ember';
import layout from '../templates/components/e3-container';
import Group from '../utils/shadow/group';
import e3AnimatedChild from './e3-animated-child';
import meta from '../mixins/e3-meta';
const {get, set, computed} = Ember;

export default e3AnimatedChild.extend(meta, {
  shadowType: 'group',
  layout: layout,
  _shadowRegistrationQueue: computed(function() {
    return Ember.A();
  }),

  /*
   The default transformation values
   */
  enterState: {},

  activeState: {},

  /*
   Generate the shadow object.
   */
  generateShadowObject(contextType, attrs) {
    let shadow = new Group(this, 'group', contextType, attrs);
    let queue = get(this, '_shadowRegistrationQueue');
    set(this, '_shadowRegistrationQueue', []);

    set(this, 'shadow', shadow);
    queue.forEach(childShadow => {
      shadow.add(childShadow);
    });
  },


   // Since this is both a context and a child, override the behaviors.

  register(child) {
    let shadow = get(this, 'shadow');
    if(shadow) {
      get(this, 'shadow').add(get(child, 'shadow'));
    } else {
      get(this, '_shadowRegistrationQueue').pushObject(get(child, 'shadow'));
    }
  },

  unregister(child) {
    let shadow = get(this, 'shadow');
    if(shadow) {
      get(this, 'shadow').remove(get(child, 'shadow'));
    } else {
      get(this, '_shadowRegistrationQueue').removeObject(get(child, 'shadow'));
    }
  },

  animateTo(component, resultState, animation, finishedCallback) {
    return this.getAttr('_e3Context').animateTo(component, resultState, animation, finishedCallback);
  }
});
