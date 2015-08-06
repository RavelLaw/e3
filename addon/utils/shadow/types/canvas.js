import {toArray, identity} from '../matrix-math';
const {
  PI
} = Math;

export default {
  group(parentContext) {
    return parentContext;
  },

  circle(parentContext, selfContext, attrs, matrix) {
    preShape(parentContext, attrs, matrix);
    parentContext.arc(attrs.x, attrs.y, attrs.radius, 0, 2 * PI);
    postShape(parentContext, attrs, matrix);
    return parentContext;
  },

  rectangle(parentContext, selfContext, attrs, matrix) {
    preShape(parentContext, attrs, matrix);
    parentContext.rect(attrs.x, attrs.y, attrs.width, attrs.height);
    postShape(parentContext, attrs, matrix);
    return parentContext;
  },

  line(parentContext, selfContext, attrs, matrix) {
    preShape(parentContext, attrs, matrix);
    attrs.x1 = attrs.x1 === undefined ? attrs.x : attrs.x1;
    attrs.x2 = attrs.x2 === undefined ? attrs.x : attrs.x2;
    attrs.y1 = attrs.y1 === undefined ? attrs.y : attrs.y1;
    attrs.y2 = attrs.y2 === undefined ? attrs.y : attrs.y2;
    parentContext.moveTo(attrs.x1, attrs.y1);
    parentContext.lineTo(attrs.x2, attrs.y2);
    postShape(parentContext, attrs, matrix);
    return parentContext;
  },

  path(parentContext, selfContext, attrs, matrix) {
    preShape(parentContext, attrs, matrix);
    generatePath(parentContext, attrs.x, attrs.y);
    postShape(parentContext, attrs, matrix);
    return parentContext;
  },

  text(parentContext, selfContext, attrs, matrix) {
    preShape(parentContext, attrs, matrix);
    parentContext.fillText(attrs.text, attrs.x, attrs.y);
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
};

function preShape(parentContext, attrs, matrix) {
  parentContext.beginPath();
  parentContext.setTransform.apply(parentContext, toArray(matrix));
}

function postShape(parentContext, attrs) {
  let workingVal;
  let shouldStroke = false;

  if(attrs.fill && attrs.fill !== 'none') {
    parentContext.fillStyle = attrs.fill;
    parentContext.fill();
  }

  if(workingVal = attrs['stroke-width']) {
    shouldStroke = true;
    parentContext.lineWidth = workingVal+'';
  }

  if(workingVal = attrs['stroke']) {
    shouldStroke = true;
    parentContext.strokeStyle = workingVal;
  }

  if(shouldStroke) {
    parentContext.stroke();
  }

  // Restore the context.
  parentContext.restore();
}

function generatePath(context, xPoints, yPoints) {
  let length = Math.min(xPoints.length, yPoints.length);

  for(let i = 0; i < length; i++) {
    let x = xPoints[i];
    let y = yPoints[i];
    if(i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
}