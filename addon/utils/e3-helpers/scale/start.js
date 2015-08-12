export default function e3HelpersScaleStart(attr) {
  return function() {
    let scale = this.getAttr(attr);
    if (scale) {
      let [min, max] = scale.range;
      return min;
    }
  };
}
