export default function e3HelpersScaleStart(attr) {
  return function() {
    let scale = this.getAttr(attr);
    if (scale) {
      return scale.range[0];
    }
  };
}
