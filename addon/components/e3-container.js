import Ember from 'ember';
import layout from '../templates/components/e3-container';
import renderQueue from '../mixins/e3-render-queue';
import Group from '../utils/shadow/group';

const {
  computed, on, set, get, A:arr
} = Ember;

export default Ember.Component.extend(renderQueue, {
  layout: layout,

  tagName: computed('attrs.type', function() {
    return this.getAttr('type');
  }),

  attributeBindings: ['attrs.height:height', 'attrs.width:width'],

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
   We may change this at some point to only make certain methods/props available.
   */
  context: computed(function() {
    return this;
  }),

  /*
   Register a child with the stage.
   */
  register(child) {
    get(this, 'children').pushObject(child);
    get(this, 'stage').add(get(child, 'renderable'));
  },

  /*
   Remove a child from the stage.
   */
  unregister(child) {
    get(this, 'children').removeObject(child);
    get(this, 'stage').remove(child);
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

  renderStage() {
    get(this, 'stage').render(get(this, 'element'), this.getAttr('type'), {
      width: this.getAttr('width'),
      height: this.getAttr('height')
    });
  },

  /*
   Create the render stage.
   */
  setupShadowElement: on('init', function() {
    /* globals Two */
    let stage = new Group('stage', this.getAttr('type'));
    set(this, 'stage', stage);
  })
});
