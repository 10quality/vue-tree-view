# Tree View Component (for [Vue](http://vuejs.org/))

[![GitHub version](https://badge.fury.io/gh/10quality%2Fvue-tree-view.svg)](https://badge.fury.io/gh/10quality%2Fvue-tree-view)
[![Bower version](https://badge.fury.io/bo/vue-tree-view.svg)](https://badge.fury.io/bo/vue-tree-view)

Tree view component for [Vue Js](http://vuejs.org/).

[Demo](http://codepen.io/amostajo/pen/zBYoPM)

[Demo (with Bootstrap)](http://codepen.io/amostajo/pen/mEdOxP)

[Demo (with customized CSS)](http://codepen.io/amostajo/pen/BzaQxW)

## Package index
- [Installation](#installation)
- [Usage](#usage)
    - [Props](#props)
    - [Events](#event)
- [License](#license)

## Installation

Several installation options are available:

- [Download the latest release](https://github.com/10quality/vue-tree-view/releases).
- Install with [Bower](http://bower.io): `bower install vue-tree-view`.

## Usage

Add the following resources for the *tree view* to function correctly.

```html
<!-- Required Stylesheets -->
<link href="[component path]/dist/vue.tree-view.min.css" rel="stylesheet">

<!-- Required Javascript -->
<script src="vue.js"></script>
<script src="[component path]/dist/vue.tree-view.min.js"></script>
```

Add the component in your vue view.

```html
<!-- Assuming your view app is APP. -->
<body id="app">

    <treeview :value.sync="value"
        :model="treeData"
    ></treeview>

</body>
```

Where:
* *model* is the tree data within your vue model.
* *value* is the selected value in the tree you want to bind with your model.

### Props

List of available props to use in component:

Prop        | Data Type         | Default   | Description
----------- | ----------------- | --------- | -----------
`model`     | Array             | []        | Tree data.
`value`     | String or Numeric |           | Tree's selected value.
`class`     | String            |           | CSS Class to add to treeview.
`children`  | String            | nodes     | Name of the property in the *tree* that contains child nodes.
`labelname` | String            | label     | Name of the property in the *tree* that contains the node's label.
`valuename` | String            | value     | Name of the property in the *tree* that contains the node's value.

Usage example ([Demo](http://codepen.io/amostajo/pen/rLNWZQ)):

```html
<body id="app">

    <treeview :value.sync="id"
        :model="users"
        class="form-control"
        labelname="name"
        valuename="id"
    ></treeview>

</body>
```

```javascript
new Vue({
    el: '#app',
    data: {
        id: undefined, // Binded to component.
        users: [
            {
                name: 'John',
                id: 1
            },
            {
                name: 'Jane',
                id: 2
            }
        ],
    }, 
});
```

### Events

List of available events to use in component:

Event            | Passes                  | Description
---------------- | ----------------------- | -----------
`treeview_click` | `node`: Selected node   | Triggered when a node is clicked.

Usage example ([Demo](http://codepen.io/amostajo/pen/zBYomb)):

```javascript
new Vue({
    el: '#app',
    events: {
        'treeview_click': function(node) {
            // TODO my code here
            console.log(node.label);
            console.log(node.value);
        }
    }, 
});
```

## License

Copyright (c) 2016 [10Quality](http://www.10quality.com/). Under MIT License.