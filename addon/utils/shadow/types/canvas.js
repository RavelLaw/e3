import {toArray} from '../matrix-math';
const {
  PI
} = Math;
export default {
  group(parentContext, selfContext, attrs) {
    return parentContext;
  },

  circle(parentContext, selfContext, attrs, matrix, cumMatrix) {
    parentContext.beginPath();
    parentContext.setTransform.apply(parentContext, toArray(cumMatrix));
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
    selfContext.clearRect(0, 0, width, height);
    return selfContext;
  }
}