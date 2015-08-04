export default function e3HelpersScaleMiddle(attr) {
  return function(d) {
    let scale = this.getAttr(attr);
    if(scale) {
      let [min, max] = scale.range;
      return ((max - min) / 2) + min;
    } else {
      return 0;
    }
  }
}
