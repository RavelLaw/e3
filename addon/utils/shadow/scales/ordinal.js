import Ember from 'ember';
const {guidFor} = Ember; // We're using this to create a map. Alternatives? It's private.
const {max} = Math;

/*
 This assumes that the domain is full of unique values. Note: Domain does not need to be
 an array of primitives; objects are perfectly acceptable.

 The options supported are:
  banding {boolean} Wether the output should be banded (start point + band width)
  outerPadding {int} Amount to pad at the start and end of the range
  padding {percent} The space to place between the banded elements
  sort {function} A normal sort function that takes two arguments (a,b) and compares them.
    If this is not provided, the existing sort order of the domain is used. ALSO, this can
    help give hints for what to do when we have values that fall outside the domain.
 */
export default function shadowScalesOrdinal(range = [0,1], domain = [0,1], options = {}) {
  let {banding, outerPadding, padding, sort} = options;
  let spaceBetween = 0;
  let [r0, r1] = range;

  // Sort the domain if a sorting function is provided.
  if(sort) {
    domain.sort(sort);
  }

  // Apply the outer padding as necessary.
  if(outerPadding) {
    r0 = r0 + outerPadding;
    r1 = r1 - outerPadding;
  }

  // The number of bands is 1 shorter if we're not banding.
  let bands = max(1, banding ? domain.length : domain.length - 1);

  // This is the amount of space we're working within
  let usedRange = r1 - r0;

  // The size of a step
  let step = usedRange / bands;

  // If there's meant to be padding between the steps and is only supported
  // when we're also doing banding.
  if(padding && banding) {
    spaceBetween = usedRange * padding;
    usedRange = usedRange - spaceBetween;
    step = usedRange / bands;
  }

  // Create the lookup map.
  let map = {};
  let stepSpacing = (spaceBetween / max(1, (bands - 1)));

  // Create a lookup in the map for each item in the domain.
  domain.forEach((domItem, index) => {
    let guid = guidFor(domItem);
    map[guid] = (usedRange / bands) * index + r0 + stepSpacing * index;
  });

  // Create the closure that will return the matched value.
  let resultFunction = function(val) {
    let guid = guidFor(val);
    if(guid in map) {
      return map[guid];
    } else if(sort) {
      let sibiling = calculateMissingPosition(val, domain, sort);
      return map[guidFor(sibiling)];
    } else {
      return r0;
    }
  };

  // Make the band width available
  resultFunction.bandWidth = step;

  return resultFunction;
}

/*
 Compare the lookedUpVal against each item in the domain, using the sort function,
 to guess where the result should be.
 */
function calculateMissingPosition(lookedUpVal, domain, sort) {
  let i = -1;
  let length = domain.length;
  let found = domain[length - 1];

  while(++i < length) {
    let item = domain[i];

    if(sort(lookedUpVal, item) < 0) {
      found = item;
      break;
    }
  }

  return found;
}