import Ember from 'ember';
const {get, set, computed, copy} = Ember;

export default Ember.Mixin.create({
  meta: computed(function() {
    return {};
  }),

  /*
   Update some meta value with this meta object.
   */
  updateMeta(key, name, value) {
    let meta = copy(get(this, 'meta'));

    if(!get(meta, key)) {
      set(meta, key, {});
    }

    set(meta, key+'.'+name, value);
    set(this, 'meta', meta);
  },

  /*
   Remove a previously registered meta item.
   */
  removeMeta(key, name) {
    let meta = copy(get(this, 'meta'));
    if(key in meta) {
      delete meta[key][name];
    }

    set(this, 'meta', meta);
  }
});
