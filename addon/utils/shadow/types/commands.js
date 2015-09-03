// gets set to move for the first command and line for all others
export function Point(x, y) {
  this.type = 'point';
  this.x = x;
  this.y = y;
}

export function Move(x, y) {
  this.type = 'move';
  this.x = x;
  this.y = y;
}

export function Line(x, y) {
  this.type = 'line';
  this.x = x;
  this.y = y;
}

export function SmoothCurve(x2, y2, x, y) {
  this.type = 'smooth-curve';
  this.x2 = x2;
  this.y2 = y2;
  this.x = x;
  this.y = y;
}

export function BezierCurve(x1, y1, x2, y2, x, y) {
  this.type = 'bezier-curve';
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.x = x;
  this.y = y;
}

export function Arc(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
  this.type = 'arc';
  this.x = x;
  this.y = y;
  this.xAxisRotation = xAxisRotation;
  this.largeArcFlag = largeArcFlag;
  this.sweepFlag = sweepFlag;
  this.rx = rx;
  this.ry = ry;
}

export function Close() {
  this.type = 'close';
}
