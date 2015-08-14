export default function e3HelpersScaleEnd(attr) {
  return function() {
    let scale = this.getAttr(attr);
    if (scale) {
      return scale.range[1];
    }
  };
}
