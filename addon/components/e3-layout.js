import Ember from 'ember';
const {guidFor} = Ember;
let stop = 0;
let e3Layout = Ember.Component.extend({
  tagName: '',

  /*
   At minimum, we should provide data array to a layout.
   */
  attrs: {
    data: null
  },

  /*
   Any attributes changed; recalculate the layout.
   */
  didUpdateAttrs() {
    this.getAttr('_e3Context').updateMeta(
      'layouts',
      this.getAttr('name'),
      this._generateLayout()
    );
  },

  /*
   Internal private hook to trigger the layout's implementation of the
   using component's `generateLayout()`
   */
  _generateLayout() {
    let data = this.getData();
    return this.generateLayout(data);
  },

  /*
   Hook to get the data that will be used to generate the layout.
   */
  getData() {
    return this.getAttr('data');
  },

  /*
   Generate item layout
   */
  _generateItemLayout(data) {
    return this.generateItemLayout(data);
  },

  /*
   Actually generate the layout
   */
  generateLayout(data) {
    let guidMap = Object.create(null);

    // For each item, create a layout.
    data.forEach(item => {
      let guid = guidFor(item);
      guidMap[guid] = this._generateItemLayout(item);
    });

    return function(item) {
      return guidMap[guidFor(item)];
    };
  },

  generateItemLayout(data) {}
});

e3Layout.reopenClass({
  positionalParams: ['_e3Context', 'name']
});

export default e3Layout;
