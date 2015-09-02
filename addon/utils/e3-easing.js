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

export default function e3Easing(type) {
  return EASING[type] || EASING.linear;
}
