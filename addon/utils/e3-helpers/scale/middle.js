export default function e3HelpersScaleMiddle(attr) {
  return function() {
    let scale = this.getAttr(attr);
    if (scale) {
      let [min, max] = scale.range;
      return ((max - min) / 2) + min;
    } else {
      return 0;
    }
  };
}
