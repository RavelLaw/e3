import {toArray, identity} from '../matrix-math';
const {
  PI
} = Math;
export default {
  group(parentContext, selfContext, attrs) {
    return parentContext;
  },

  circle(parentContext, selfContext, attrs, matrix, cumMatrix) {
    parentContext.beginPath();
    parentContext.setTransform.apply(parentContext, toArray(matrix));
    parentContext.arc(attrs.x, attrs.y, attrs.radius, 0, 2 * PI);
    parentContext.fillStyle = attrs.fill;
    parentContext.fill();
    return parentContext;
  },

  stage(parentContext, selfContext, attrs) {
    if(!selfContext) {
      selfContext = parentContext.getContext('2d');
    }
    let {width, height} = attrs;
    selfContext.setTransform.apply(selfContext, toArray(identity()));
    selfContext.clearRect(0, 0, width, height);
    return selfContext;
  },

  checkEvent(selfContext, event) {
    let {x, y} = event;
    return selfContext.isPointInPath(x, y);
  }
}