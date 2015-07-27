import {toArray} from '../matrix-math';
const {keys} = Object;
const ATTRIBUTE_MAP = {
  'radius': 'r',
  'x': 'cx',
  'y': 'cy'
};

export default {
  group(parentContext, selfContext, attrs, matrix) {
    if(!selfContext) {
      selfContext = generateSVGObject(parentContext, 'g');
    }
    renderAttributes(selfContext, {
      transform: `matrix(${toArray(matrix)})`
    });
    return selfContext;
  },

  circle(parentContext, selfContext, attrs) {
    if(!selfContext) {
      selfContext = generateSVGObject(parentContext, 'circle');
    }
    renderAttributes(selfContext, attrs);
    return selfContext;
  },

  stage(parentContext, selfContext, attrs) {
    return parentContext;
  }
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
function renderAttributes(node, attrs) {
  let namepsace = node.namespaceURI;
  keys(attrs).forEach(key => {
    let attrKey = ATTRIBUTE_MAP[key] || key;
    node.setAttribute(attrKey, attrs[key]);
  });
}