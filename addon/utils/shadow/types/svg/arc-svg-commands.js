const {pi} = Math;
import { Line, Move, Arc, Close } from '../commands';

/*
 * Lovingly plucked from d3.js
 *
 * https://github.com/mbostock/d3/blob/master/src/svg/arc.js
 */
export default function arcSvgCommands(x, y, startAngle, angle, innerRadius, outerRadius) {

  var r0 = Math.max(0, +innerRadius),
      r1 = Math.max(0, +outerRadius),
      a0 = startAngle - pi / 2,
      a1 = (startAngle + angle) - pi / 2,
      da = Math.abs(a1 - a0),
      cw = a0 > a1 ? 0 : 1,
      commands = [];

  // Ensure that the outer radius is always larger than the inner radius.
  if (r1 < r0) {
    let rc = r1;
    r1 = r0;
    r0 = rc;
  }

  // Special case for an arc that spans the full circle.
  if (da >= 2 * pi - 0.000001) {
    commands.push(circleSegment(r1, cw));
    if (r0) {
      commands.push(circleSegment(r0, 1 - cw));
    }
    commands.push(new Close());
    return commands;
  }

  var p0 = 0,
      p1 = 0,
      x0,
      y0,
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      l0,
      l1;

  // Compute the two outer corners.
  if (r1) {
    x0 = r1 * Math.cos(a0 + p1);
    y0 = r1 * Math.sin(a0 + p1);
    x1 = r1 * Math.cos(a1 - p1);
    y1 = r1 * Math.sin(a1 - p1);

    // Detect whether the outer corners are collapsed.
    l1 = Math.abs(a1 - a0 - 2 * p1) <= pi ? 0 : 1;
    if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
      var h1 = (a0 + a1) / 2;
      x0 = r1 * Math.cos(h1);
      y0 = r1 * Math.sin(h1);
      x1 = y1 = null;
    }
  } else {
    x0 = y0 = 0;
  }

  // Compute the two inner corners.
  if (r0) {
    x2 = r0 * Math.cos(a1 - p0);
    y2 = r0 * Math.sin(a1 - p0);
    x3 = r0 * Math.cos(a0 + p0);
    y3 = r0 * Math.sin(a0 + p0);

    // Detect whether the inner corners are collapsed.
    l0 = Math.abs(a0 - a1 + 2 * p0) <= pi ? 0 : 1;
    if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === (1 - cw) ^ l0) {
      var h0 = (a0 + a1) / 2;
      x2 = r0 * Math.cos(h0);
      y2 = r0 * Math.sin(h0);
      x3 = y3 = null;
    }
  } else {
    x2 = y2 = 0;
  }

  commands.push(new Move(x, y));
  if (x1 != null) {
    commands.push(new Arc(r1, r1, l1, cw, x1, y1));
  }

  commands.push(new Line(x2, y2));
  if (x3 != null) {
    commands.push(new Arc(r0, r0, l0, 1 - cw, x3, y3));
  }

  commands.push(new Close());
  return commands;
}

function circleSegment(r1, cw) {
  return [
    new Move(0, r1),
    new Arc(r1, r1, 0, 1, cw, 0, -r1),
    new Arc(r1, r1, 0, 1, cw, 0, r1),
  ];
}

// Note: similar to d3_cross2d, d3_geom_polygonInside
function d3_svg_arcSweep(x0, y0, x1, y1) {
  return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
}
