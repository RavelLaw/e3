/*
 This acts as both a way to normalize attribute names, but also acts
 as a white list for the supported properties.
 */
export default {
  'circle': {
    'radius': 'r',
    'x': 'cx',
    'y': 'cy',
    'fill': 'fill',
    'stroke': 'stroke',
    'stroke-width': 'stroke-width'
  },
  'group': {
    'transform': 'transform'
  },
  'rect': {
    'x': 'x',
    'y': 'y',
    'height': 'height',
    'width': 'width',
    'fill': 'fill',
    'stroke': 'stroke',
    'stroke-width': 'stroke-width'
  },
  'line': {
    'x1': 'x1',
    'x2': 'x2',
    'y1': 'y1',
    'y2': 'y2',
    'stroke': 'stroke',
    'stroke-width': 'stroke-width'
  },
  'path': {
    'd': 'd',
    'stroke': 'stroke',
    'stroke-width': 'stroke-width',
    'fill': 'fill'
  },
  'text': {
    'x': 'x',
    'y': 'y',
    'text-align': 'text-anchor'
  }
};
