import { Move, Line, Point, Arc, SmoothCurve, BezierCurve } from '../commands';

export default function pathFromCommands(commands) {
  let svgCommands = commands.map((command, i) => {

    if (command instanceof Point) {
      return (i === 0 ? 'M' : 'L') + command.x + command.y;
    }

    if (command instanceof Move) {
      return 'M' + command.x + command.y;
    }

    if (command instanceof Line) {
      return 'L' + command.x + command.y;
    }

    if (command instanceof SmoothCurve) {
      return 'S' + command.x2 + command.y2 + command.x + command.y;
    }

    if (command instanceof BezierCurve) {
      return 'C' + command.x1 + command.y1 +
                   command.x2 + command.y2 +
                   command.x  + command.y;
    }

    if (command instanceof Arc) {
      return 'A' + command.rx + command.ry +
                   command.xAxisRotation +
                   command.largeArcFlag +
                   command.sweepFlag +
                   command.x  + command.y;
    }
  });

  return svgCommands.join(' ');
}
