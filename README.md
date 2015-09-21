[![npm version](https://badge.fury.io/js/ember-e3.png)](http://badge.fury.io/js/ember-e3)
[![Build Status](https://travis-ci.org/RavelLaw/e3.svg?branch=master)](https://travis-ci.org/RavelLaw/e3)
[![Code Climate](https://codeclimate.com/github/RavelLaw/e3/badges/gpa.svg)](https://codeclimate.com/github/RavelLaw/e3)

# E3

E3 is an Ember-centric data visualization library.

It borrows heavily from D3 for the math-behind-the-magic, but adheres to the more modern "data down / actions up" paradigm for data binding. E3 also supports rendering both to Canvas and SVG.

Please note that this is in a *very early* beta (alpha?) stage and that the API should not be considered stable...or always functioning. We're not quite feature complete and the first few iterations will try to address that. (See TODO.md for status). I would not yet consider this production ready.

## Introduction to E3

[![Introduction to E3 on Global Ember Meetup](https://i.vimeocdn.com/video/535975310_1920x1080.jpg)](https://vimeo.com/139890520)

## Installation
Should be as easy as pie:

```
ember install ember-e3
```

Please, Ember 1.13+ only. Sorry. :(

## Examples

Live examples are [available for your perusal](http://ravellaw.github.io/e3/). If you want to view the examples locally, clone this repository, `ember server` and visit `localhost:4200` (example app is in `/tests/dummy/app/`).

[![E3 at the SF Ember.js meetup](http://img.youtube.com/vi/9lXQ024NoRc/0.jpg)](http://www.youtube.com/watch?v=9lXQ024NoRc)

Here's an example of a scatterplot where the x position of the circle represents the year, the y position represents the temperature, and the size of the circle represents the rainfall.

```javascript
// index/route.js
import Ember from 'ember';
export default Ember.Route.extend({
  model() {
    return [
    	{
    	  year: 2010,
    	  rainfall: 12,
    	  temperature: 86
    	},
    	{
    	  year: 2011,
    	  rainfall: 15,
    	  temperature: 88
    	},
    	{
    	  year: 2012,
    	  rainfall: 21,
    	  temperature: 90
    	}
    ];
  }
});
```
```handlebars
// index/template.hbs
{{#e3-container type='canvas' height=400 width=800 as |context meta|}}
  <metadata>
    {{e3-scale/linear context 'x'
      domain=(e3-extent model key='year' padding=0.2)
      range=context.horizontalRange
    }}
    {{e3-scale/linear context 'y'
      domain=(e3-extent model key='temperature' padding=0.2)
      range=context.verticalRange
      invert=true
    }}
    {{e3-scale/linear context 'radius'
      domain=(e3-extent model key='rainfall')
      range=(e3-fixed-range min=5 max=20)
    }}
  </metadata>
  {{#each model as |item|}}
    {{e3-shape/circle context
      data=item
      x=(e3-bind-scale meta.scales.x 'year')
      y=(e3-bind-scale meta.scales.y 'temperature')
      radius=(e3-bind-scale meta.scales.radius 'rainfall')
    }}
  {{/each}}
{{/e3-container}}
```

There's a few things going on here. Let's break it down.

### An Item's Render Context
The first step to creating a visualization is to create the context onto which we will render each individual part. We'll use the `e3-container` component to create one.

This component takes a number of parameters:

- `type`: This can either be `'canvas'` or `'svg'`. *Note:* This value cannot change after the component has initialized.
- `height`: This is the height you would like the canvas to be. This *can* be a variable; changing it will cause the graph to animate to its new size.
- `width`: Same as above.

This component also yields two objects:

- `context`: This must be passed as the first inline argument to each of the children component. The context also has information about the render stage itself including `context.verticalRange` (equivalent to [0,height]) and `context.horizontalRange` (equivalent to [0,width]).
- `meta`: This object will contain references to objects that do not directly render, but are important for *how* things render. A scale is an example of this. Registering a scale called 'x' will make it available at `meta.scales.x`

### Scales
Scales are created with the scale component which takes two inline arguments: the context that this scale is being registered to, and the name that it will be published as.

Because the name dictates how to later use that scale, the following is a valid way to change how you're viewing the data:

```handlebars
  {{#if isZoomedOut}}
    {{e3-scales/linear context 'y' ...}}
  {{else}}
    {{e3-scales/linear context 'y' ...}}
  {{/if}}
```

By toggling the `isZoomedOut` property, the Y Scale that is used to render the objects on the visualization is swapped out and the elements will animate to their new positions.

At the moment, only linear scales are supported but more scales (including ordinal) will arrive shortly.

A linear scale takes both a domain and a range property, which are both arrays with two numbers. Because the domain is usually based on the underlying model, a helper (`e3-extent`) is provided that finds the extent of the values with a given key. This helper also takes a few options:

- `padding`: A percentage (between 0 and 1) of buffer to add at the start and end of the array.
- `min-value`: Force a minimum value (useful for bar charts, for example, where the min value may need to be 0)
- `max-value`: The opposite of above (useful? maybe?)
- `min-delta`: Make sure that the difference of the max and min is at least a certain amount. Useful when you only have one data point and you still want predictable behavior.

### Shapes and such
Currently, we support a limited number of shapes out of the box: Circles, Lines, Paths (for line graphs), Rectangles, and Text.

There's some important things underneath these shapes that dictate how they render and animate. For example, suppose I wanted to create a new circle-type component and override the behavior.

```javascript
// components/super-circle.js
import Ember from 'ember';
import animatedChild from 'ember-e3/mixins/e3-animated-child';
import middleOfScale from 'ember-e3/utils/e3-helpers/scale/middle';

export default Ember.Component.extend(animatedChild, {
	shadowType: 'circle',

	/*
	 This will cause the circles to animate in from the
	 top middle of the chart with an initial random radius.
	 */
	enterState: {
	  x: middleOfScale('x'),
	  y: 0,
	  radius(/* data */) {
	    return Math.random() * 100;
	  }
	},

	/*
	  The behaviors of these properties are overridable directly in
	  the templates.
	 */
	activeState: {
		x: null,
		y: null,
		radius: null
	},

	/*
	  The exit state will merge with the active state so the
	  effect of this is to just animate the radius to 0 when
	  it's leaving the canvas.
	 */
	exitState: {
	  radius: 0
	}
});
```

Then, instantiating this component is similar to the above. Note: I've directly applied values to the x/y/r attributes, but you could bind a function to these, or use the `e3-bind-scale` helper to bind a scale to these properties.

```handlebars
{{super-circle context
  x=100
  y=100
  r=100
}}
```

### Groups
E3 also has a notion of grouping shapes together and applying transformations to that group. Think of a group has a hybrid of a container and a shape.

This would render a circle and a rectangle with the same x position:

```handlebars
{{#e3-group context
	data=data
	x=(e3-bind-scale meta.scales.x 'year')
	as |groupContext groupMeta|}}

	{{e3-shape/rectangle groupContext
	  y=(e3-bind-scale meta.scales.y 'temperature')
	  height=100
	  width=50
	}}
	{{e3-shape/circle groupContext
		y=(e3-bind-scale meta.scales.y 'temperature')
		r=50
	}}

{{/e3-group}}
```

Because a group has its own context and meta object, you could create sub scales within a group context.
