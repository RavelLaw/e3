import Ember from 'ember';
import renderable from '../mixins/e3-renderable';
import Renderable from '../utils/shadow/renderable';

export default Ember.Object.extend(renderable, {
  generateShadowObject(attrs, contextType) {
    return new Renderable('circle', contextType, attrs);
  },

  updateShadowObject(shadowObject, attrs) {
    shadowObject.setAttributes(attrs);
    return shadowObject;
  }
});