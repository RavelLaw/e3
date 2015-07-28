import Renderable from './renderable';
import renderTypes from './render-types';
import Ember from 'ember';
import {
  multiply,
  identity,
  translate,
  rotate
} from './matrix-math';
const {merge, isArray, get, assert} = Ember;
const {keys, create} = Object;

export default function Group(component, groupType, contextType, attrs = null) {
  // Make sure the children isntance is different per child.
  this.children = [];

  // If there are attributes by default, set them.
  if(attrs) {
    this.setAttributes(attrs);
  }

  // Then, set the render method
  let method = get(renderTypes, contextType + '.' + groupType);
  assert(`[Shadow Group] There is no group method for rendering to ${contextType}: `+method, !!method);
  this.renderMethod = method;
  this.component = component;
}

Group.prototype = merge(create(Renderable.prototype), {
  /*
   When initialized, this will be an array of this group's children.
   */
  children: null,

  /*
   Add a child to this group.
   */
  _add(child) {
    this.children.push(child);
  },

  /*
   The public add method, which uses the child's join method.
   */
  add(child) {
    child.join(this);
  },

  /*
   The public add method, which uses the child's leave method.
   */
  remove(child) {
    child.leave();
  },

  /*
   Remove a child from this group.
   */
  _remove(child) {
    let index = this.children.indexOf(child);
    if(index !== -1) {
      this.children.splice(index, 1);
    }
  },

  /*
   Given the attributes for this group, apply them to the matrix.
   */
  generateMatrix() {
    let attrs = this.attrs || {};
    let matrix = identity();

    // Apply the transforms the matrix based on the keys.
    if('x' in attrs || 'y' in attrs) {
      matrix = translate(matrix, attrs.x || 0, attrs.y || 0);
    }

    // Apply rotation.
    if('rotation' in attrs) {
      matrix = rotate(matrix, attrs.rotation);
    }

    // Apply the scaling
    if('scale' in attrs) {
      matrix = scale(matrix, attrs.scale, attrs.scale);
    }

    return matrix;
  },

  /*
   The render method to update the children's attributes.
   */
  render(parentContext, type, attrs, parentMatrix, event) {
    let matrix = this.generateMatrix();
    let cumMatrix = parentMatrix ? multiply(parentMatrix, matrix) : matrix;
    let context = this.context = this.renderMethod(parentContext, this.context, attrs, matrix, cumMatrix);
    this.children.forEach(child => {
      child.render(context, type, matrix, cumMatrix, event);
    });
  }
});