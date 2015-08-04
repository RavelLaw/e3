import {
  identity,
  translate,
  rotate
} from './matrix-math';

export default function Matrix() {
  return true;
}

Matrix.prototype = {
  _scaleX: 1,
  _scaleY: 1,
  _rotation: 0,
  _translateX: 0,
  _translateY: 0,

  /*
   Set the scale transformation
   */
  scale(amountX = 1, amountY = null) {
    amountY = amountY !== null ? amountY : amountX;
    this._scaleX = amountX;
    this._scaleY = amountY;
  },

  /*
   Rotate the transform
   amount is in radians
   */
  rotate(amount = 0) {
    this._rotation = amount;
  },

  /*
   Translate the position of the group
   */
  translate(x = 0, y = 0) {
    this._translateX = x;
    this._translateY = y;
  },

  calculate() {
    var result = identity();

    // Apply the translation.
    result = translate(result, this._translateX, this._translateY);

    // Apply the rotation
    result = rotate(result, this._rotation);
  }
};