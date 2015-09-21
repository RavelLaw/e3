import Ember from 'ember';
import layout from '../templates/components/e3-container';
import renderQueue from '../mixins/e3-render-queue';
import meta from '../mixins/e3-meta';
import Group from '../utils/shadow/group';
import ShadowEvent from '../utils/shadow/event';

const {
  computed, on, set, get,
  A:arr,
  tryInvoke
} = Ember;

export default Ember.Component.extend(renderQueue, meta, {
  layout: layout,

  tagName: computed('attrs.type', function() {
    return this.getAttr('type');
  }),

  attributeBindings: ['attrs.height:height', 'attrs.width:width'],

  /*
   Computed property for the vertial range
   */
  verticalRange: computed('attrs.height', function() {
    return [0, this.getAttr('height')];
  }),

  /*
   Computed property for the horizontal range
   */
  horizontalRange: computed('attrs.width', function() {
    return [0, this.getAttr('width')];
  }),

  /*
   The public attributes
   */
  attrs: {
    height: null,
    width: null,
    type: 'canvas'
  },

  /*
   The children of this object.
   */
  children: computed(function() {
    return arr();
  }),

  /*
   The two "stage" that handles all the rendering
   */
  stage: null,

  /*
   Register a child with the stage.
   */
  register(child) {
    get(this, 'children').pushObject(child);
    get(this, 'stage').add(get(child, 'shadow'));
  },

  /*
   Remove a child from the stage.
   */
  unregister(child) {
    get(this, 'children').removeObject(child);
    get(this, 'stage').remove(get(child, 'shadow'));
  },

  /*
   Get the type
   */
  getType() {
    return this.getAttr('type');
  },

  /*
   Render the graph initially on inserting the element.
   */
  initialRender: on('didInsertElement', function() {
    this.renderStage();
  }),

  /*
   Redraw the stage when an animation tick happens.
   */
  afterTick: on('tickDidRender', function() {
    this.renderStage();
  }),

  /*
   Handle mouse move events
   */
  mouseMove(e) {
    let event = new ShadowEvent(e);
    this.renderStage(event);
  },

  mouseDown(e) {
    let event = new ShadowEvent(e);
    this.renderStage(event);
  },

  mouseUp(e) {
    let event = new ShadowEvent(e);
    this.renderStage(event);
  },

  mouseOut(e) {
    let event = new ShadowEvent(e);
    this.renderStage(event);
  },

  /*
   Track the last event that happened so we can simulate mouse out events.
   */
  _previousEvent: null,

  /*
   Take the current state and render it to the stage.
   */
  renderStage(event = null) {
    let prevEvent = get(this, '_previousEvent');

    get(this, 'stage').render(get(this, 'element'), this.getAttr('type'), {
      width: this.getAttr('width'),
      height: this.getAttr('height')
    }, null, event);

    if(event) {
      // Determine which events took place and dispatch them.
      let events = event.getEvents(prevEvent);

      // Dispatch the events.
      events.forEach(ev => {
        let {type, target} = ev;
        tryInvoke(target.component, type, [event, target.data]);
      });

      // Then, set this event as the previous one.
      set(this, '_previousEvent', event);
    }
  },

  /*
   Create the render stage.
   */
  setupShadowElement: on('init', function() {
    let stage = new Group(this, 'stage', this.getAttr('type'));
    set(this, 'stage', stage);
  })
});
