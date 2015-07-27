import Ember from 'ember';
import renderTypes from './render-types';
const {get, assert} = Ember;

export default function Renderable(shapeType, contextType, attrs = null) {
  if(attrs) {
    this.setAttributes(attrs);
  }

  // Set the render method
  let method = get(renderTypes, contextType + '.' + shapeType);
  assert(`[Shadow Renderable] There is no ${shapeType} method for rendering to ${contextType}`, !!method);
  this.renderMethod = method;
}

Renderable.prototype = {
  /*
   set the parent of this object.
   */
  parent: null,

  /*
   The render method.
   */
  renderMethod: null,

  /*
   A property to set the group's context.
   */
  renderContext: null,

  /*
   Join a group
   */
  join(group) {
    group._add(this);
    this.parent = group;
  },

  /*
   Leave the parent group.
   */
  leave() {
    this.parent._remove(this);
    this.parent = null;
  },

  /*
   An object that represents the current attributes to render.
   */
  attrs: null,

  /*
   A flag that tracks wether the current attributes have been rendered
   */
  attrsAreDirty: true,

  /*
   A flag to track wether this has rendered.
   */
  hasRendered: false,

  /*
   Set the attributes for the next render.
   */
  setAttributes(attrs) {
    this.attrsAreDirty = true;
    this.attrs = attrs;
  },

  /*
   Apply the current attributes to the object.
   */
  render(parentContext, type, parentMatrix, cumMatrix) {
    // Only need to render if this isn't SVG.
    if(type !== 'svg' || this.attrsAreDirty) {
      this.renderContext = this.renderMethod(parentContext, this.renderContext, this.attrs, parentMatrix, cumMatrix);
    }

    // We've rendered; attrs no longer dirty.
    this.attrsAreDirty = false;
  }
};