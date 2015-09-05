import Ember from 'ember';

/*
 A layout is a function that takes a model as an input, and returns an object
 that represents the position for that object. Most likey, the returned result
 of the layout is something like
  {
    x: {INTEGER},
    y: {INTEGER}
  }
 */
export function e3BindLayout(params/*, hash*/) {
  let [layout, layoutProp] = params;

  if(layout) {
    return function(data) {
      let itemLayout = layout(data);
      if(itemLayout) {
        return itemLayout[layoutProp];
      }
    };
  }
}

export default Ember.Helper.helper(e3BindLayout);
