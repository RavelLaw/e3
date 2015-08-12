export default function e3HelpersScaleEnd(attr) {
  return function() {
    let scale = this.getAttr(attr);
    if (scale) {
      let [min, max] = scale.range;
      return max;
    }
  };
}
