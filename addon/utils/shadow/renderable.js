import Ember from 'ember';
import renderTypes from './render-types';
const {get, assert, copy} = Ember;

export default function Renderable(component, shapeType, contextType, attrs = null) {
  if(attrs) {
    this.setAttributes(attrs);
  }

  // Set the render method; it may be provided by the shape type directly.
  let method = typeof shapeType === 'function' ? shapeType : get(renderTypes, contextType + '.' + shapeType);
  assert(`[Shadow Renderable] There is no ${shapeType} method for rendering to ${contextType}`, !!method);

  // Get the event that tests wether an event occured on the rendered element.
  let checkMethod = get(renderTypes, contextType+'.checkEvent');
  assert(`[Shadow Renderable] The ${contextType} must implement a 'checkEvent' method`, !!checkMethod);

  // Get the destroy hook (optional).
  let destroyMethod = get(renderTypes, contextType+'.destroy');

  this.renderMethod = method;
  this.checkEvent = checkMethod;
  this.component = component;
  this.destroyContext = destroyMethod;
}

Renderable.prototype = {
  /*
   set the parent of this object.
   */
  parent: null,

  /*
   Keep a reference to the component that this belongs to.
   */
  component: null,

  /*
   The render method.
   */
  renderMethod: null,

  /*
   The check event method.
   */
  checkEvent: null,

  /*
   A property to set the group's context.
   */
  renderContext: null,

  /*
   Destroy context hook
   */
  destroyContext: null,

  /*
   Join a group
   */
  join(group) {
    group._add(this);
    this.parent = group;
  },

  /*
   Destory this element.
   */
  destroy() {
    if(this.destroyContext) {
      this.destroyContext(this.renderContext);
    }
    this.parent = null;
    this.component = null;
    this.renderMethod = null;
    this.checkEvent = null;
    this.renderContext = null;
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
    // No side effects plz!
    this.attrs = copy(attrs);
  },

  /*
   Apply the current attributes to the object.
   */
  render(parentContext, type, parentMatrix, cumMatrix, event) {
    // Only need to render if this isn't SVG.
    if(type !== 'svg' || this.attrsAreDirty) {
      this.renderContext = this.renderMethod(parentContext, this.renderContext, this.attrs, parentMatrix, cumMatrix);
    }

    // Do something to check wether this event is targeting this item.
    if(event) {
      let matched = this.checkEvent(this.renderContext, event);
      if(matched) {
        event.setTarget(this);
      }
    }

    // We've rendered; attrs no longer dirty.
    this.attrsAreDirty = false;
  }
};