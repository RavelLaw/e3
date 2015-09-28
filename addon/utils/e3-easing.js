const {max, min} = Math;
const EASING = {
  'ease-in-cubic': function(percent) {
    return Math.pow(percent, 3);
  },
  elastic(percent) {
    var p = 0.3;
    return Math.pow(2,-10*percent) * Math.sin((percent-p/4)*(2*Math.PI)/p) + 1;
  },
  linear(percent) {
    return percent;
  }
};

export function getPercentComplete(startTime, currentTime, totalDuration = 200, delay = 0) {
  let currentDuration = currentTime - delay - startTime;

  // This should only happen if there's a delay.
  if(currentDuration < 0) {
    return 0;
  }

  return max(0, min(1, currentDuration / totalDuration));
};

export default function e3Easing(type) {
  return EASING[type] || EASING.linear;
}
