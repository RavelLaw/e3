export default function ShadowEvent(e) {
  this.originalEvent = e;
  this.x = e.offsetX;
  this.y = e.offsetY;
}

ShadowEvent.prototype = {
  /*
   This is the browser's event.
   */
  originalEvent: null,

  /*
   The X position of the mouse event.
   */
  x: null,

  /*
   The Y position of the mouse event.
   */
  y: null,

  /*
   The lowest level matched renderable.
   */
  target: null,

  /*
   Track the mouse down target for drag events.
   */
  mouseDownEvent: null,

  /*
   Event type will be determined after the
   event capturing takes place.
   */
  eventType: null,

  /*
   Returns an array of the target's parents.
   */
  getTargetParents() {
    let currentTarget = this.target;
    let result = [];

    while(currentTarget.parent) {
      result.unshift(currentTarget.parent);
      currentTarget = currentTarget.parent;
    }

    return resul;
  },

  /*
   If it's determined that this event matches an element,
   set it to the target.
   */
  setTarget(target) {
    this.target = target;
  },

  /*
   Compare this event with a different event to determine the events that took place.
   TODO: Add support for bubbling to groups :-|
   */
  getEvents(previousEvent) {
    let type = this.originalEvent.type;
    previousEvent = previousEvent || {};

    switch(type) {
      case 'mousemove':
        return mouseMoveEvents(this, previousEvent);
        break;
      case 'mousedown':
        return mouseDownEvents(this, previousEvent);
        break;
      case 'mouseup':
        return mouseUpEvents(this, previousEvent);
        break;
      case 'mouseout':
        return mouseOutEvents(this, previousEvent);
        break;
      default:
        return [];
        break;
    }
  }
};

function ev(type, target, event) {
  return {
    type: type,
    target: target
  };
}

function mouseMoveEvents(current, previous) {
  /*
    - #if mouseDownEvent
      - dispatch drag on prevMouseDownEvent.setTarget
      - Copy the mouseDownEvent from prev to current
    - #else if target !== previousTarget
      - mouseenter on target
      - #if previousTarget
        - mouseleave on previousTarget
    - # else if target === previousTarget
      - dispatch mousemove on target
   */
  let events = [];
  if(previous.mouseDownEvent) {
    let {x, y} = previous.mouseDownEvent;
    current.dx = current.x - x;
    current.dy = current.y - y;
    current.mouseDownEvent = previous.mouseDownEvent;
    events.push(ev('drag', previous.mouseDownEvent.target));
  } else if(current.target !== previous.target) {
    if(current.target) {
      events.push(ev('mousEnter', current.target));
    }
    if(previous.target) {
      events.push(ev('mouseLeave', previous.target));
    }
  } else if(current.target && current.target === previous.target) {
    events.push(ev('mouseMove', current.target));
  }
  return events;
}

function mouseDownEvents(current, previous) {
  /*
    - set the mouseDownEvent to this
    - dispatch mousedown on target
   */
  let events = [];
  if(current.target) {
    current.mouseDownEvent = current;
    events.push(ev('mouseDown', current.target));
  }
  return events;
}

function mouseUpEvents(current, previous) {
  /*
    - dispatch mouseup on target
    - #if prevTarget === currentTarget
      - dispatch click on target
   */
  let events = [];
  if(current.target) {
    events.push(ev('mouseUp', current.target));
    if(current.target === previous.target) {
      events.push(ev('click', current.target));
    }
  }
  return events;
}

function mouseOutEvents(current, previous) {
  /*
    - dispatch mouseup on previousTarget
   */
  let events = [];
  if(previous.target) {
    events.push(ev('mouseOut', previous.target));
  }

  if(previous.mouseDownEvent) {
    events.push(ev('mouseUp', previous.mouseDownEvent.target));
  }
  return events;
}