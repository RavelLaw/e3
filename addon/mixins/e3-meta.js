import Ember from 'ember';
const {get, set, computed} = Ember;

export default Ember.Mixin.create({
  meta: computed(function() {
    return Ember.Object.create();
  }),

  /*
   Update some meta value with this meta object.
   */
  updateMeta(key, name, value) {
    let meta = get(this, 'meta');
    if(!get(meta, key)) {
      set(meta, key, Ember.Object.create());
    }

    set(meta, key+'.'+name, value);
  },

  /*
   Remove a previously registered meta item.
   */
  removeMeta(key, name) {
    let meta = get(this, 'meta.'+key);
    if(meta) {
      set(meta, name);
    }
  }
});
