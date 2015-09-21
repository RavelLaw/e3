import Ember from 'ember';
const {guidFor, get} = Ember;
const {keys} = Object;

export default function e3CalculateChanges(previousArr, newArr) {
  let toRemove = Object.create(null);
  let additions = [];
  let updates = [];
  let removals = [];
  let active = [];

  // Populate toRemove with all the current items.
  previousArr.forEach(itm => {
    toRemove[guidFor(itm)] = itm;
  });

  newArr.forEach(itm => {
    let guid = guidFor(itm);
    active.push(itm);

    // If exists, mark as update and delete from toRemove.
    if(guid in toRemove) {
      updates.push(toRemove[guid]);
      delete toRemove[guid];
    } else {
      additions.push(itm);
    }
  });

  // Convert removals to an array.
  keys(toRemove).forEach(key => {
    removals.push(toRemove[key]);
  });

  return {
    enter: additions,
    exit: removals,
    update: updates,
    active: active
  };
}
