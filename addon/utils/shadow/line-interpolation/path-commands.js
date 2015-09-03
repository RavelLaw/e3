import monotone from './monotone';
import { Point } from './monotone';

export default function generatePath(xPoints, yPoints, interpolation = 'linear') {

  var points = _zipPoints(xPoints, yPoints);
  var commands;
  switch(interpolation) {
    case 'linear':
      commands = points.map(point => {
        return new Point(point[0], point[1]);
      });
      break;
    case 'monotone':
      commands = monotone(points);
      break;
  }

  return commands;
}


function _zipPoints(xPoints, yPoints) {
  let points = [];
  let length = Math.min(xPoints.length, yPoints.length);
  for(let i = 0; i < length; i++) {
    let x = xPoints[i];
    let y = yPoints[i];
    points.push([x, y]);
  }
  return points;
}
