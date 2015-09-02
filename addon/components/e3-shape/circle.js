import e3AnimatedChild from '../e3-animated-child';
import middleOfScale from '../../utils/e3-helpers/scale/middle';

export default e3AnimatedChild.extend({
  shadowType: 'circle',

  enterState: {},

  exitState: {},

  activeState: {
    x: 100,
    y: 100,
    radius: 20,
    fill: 'red'
  }
});
