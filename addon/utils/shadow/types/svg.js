import Ember from 'ember';
import {toArray} from '../matrix-math';
import ATTRIBUTE_MAP from './svg-attribute-map';
const {keys} = Object;
const {copy} = Ember;

export default {
  group(parentContext, selfContext, attrs, matrix) {
    selfContext = preRender(selfContext, parentContext, 'g');
    renderAttributes('group', selfContext, {
      transform: `matrix(${toArray(matrix)})`
    });
    return selfContext;
  },

  circle(parentContext, selfContext, attrs) {
    selfContext = preRender(selfContext, parentContext, 'circle');
    renderAttributes('circle', selfContext, attrs);
    return selfContext;
  },

  rectangle(parentContext, selfContext, attrs) {
    selfContext = preRender(selfContext, parentContext, 'rect');
    renderAttributes('rect', selfContext, attrs);
    return selfContext;
  },

  line(parentContext, selfContext, attrs) {
    selfContext = preRender(selfContext, parentContext, 'line');
    attrs.x1 = attrs.x1 === undefined ? attrs.x : attrs.x1;
    attrs.x2 = attrs.x2 === undefined ? attrs.x : attrs.x2;
    attrs.y1 = attrs.y1 === undefined ? attrs.y : attrs.y1;
    attrs.y2 = attrs.y2 === undefined ? attrs.y : attrs.y2;
    renderAttributes('line', selfContext, attrs);
    return selfContext;
  },

  path(parentContext, selfContext, attrs) {
    selfContext = preRender(selfContext, parentContext, 'path');
    // Create the 'd' string from the attrs x/y
    attrs.d = generatePath(attrs.x, attrs.y);
    renderAttributes('path', selfContext, attrs);
    return selfContext;
  },

  text(parentContext, selfContext, attrs) {
    selfContext = preRender(selfContext, parentContext, 'text');
    // Don't affect other state. We should
    attrs = copy(attrs);
    renderAttributes('text', selfContext, attrs);
    selfContext.textContent = attrs.text;
    return selfContext;
  },

  stage(parentContext/*, selfContext, attrs*/) {
    return parentContext;
  },

  checkEvent(selfContext, event) {
    let originalTarget = event.originalEvent.target;
    return selfContext === originalTarget;
  },

  destroy(selfContext) {
    selfContext.parentNode.removeChild(selfContext);
  }
};

/*
  pre render
 */
function preRender(selfContext, parentContext, type) {
  if(selfContext) {
    return selfContext;
  }
  return generateSVGObject(parentContext, type);
}

/*
 Given a parent SVG node, create and append the child.
 */
function generateSVGObject(parent, type) {
  let namespace = parent.namespaceURI;
  let node = namespace ? document.createElementNS(namespace, type)
    : document.createElement(type);
  parent.appendChild(node);
  return node;
}

/*
 Render the attributes provided in the hash to the node.
 */
function renderAttributes(ns, node, attrs) {
  let map = ATTRIBUTE_MAP[ns] || {};
  keys(map).forEach(key => {
    let attrKey = map[key];
    if(key in attrs) {
      node.setAttribute(attrKey, attrs[key]);
    }
  });
}

/*
 TODO: This needs some borrowing from D3 and should be spun out into a more
 robust line library.
 */
function generatePath(xPoints, yPoints) {
  let length = Math.min(xPoints.length, yPoints.length);
  let result = [];
  for(let i = 0; i < length; i++) {
    let x = xPoints[i];
    let y = yPoints[i];
    result.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }

  return result.join(' ');
}