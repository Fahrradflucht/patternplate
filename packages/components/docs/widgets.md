# Widgets

`patternplate` provides widgets for your use in Markdown files.
Widgets can display information derived from your component library.

## Pattern List

`<PatternList />` displays an unordered list of patterns matching a search query.
Placing the following code inside a `widget` code block creates a list
of all patterns with the tag `widget`.

```js
const React = require('react');
const {PatternList} = require("@patternplate/widgets");

module.exports = () =>  <PatternList query="tags=widget" />;
```

```widget
const React = require('react');
const {PatternList} = require("@patternplate/widgets");

module.exports = () =>  <PatternList query="tags=widget" />;
```


## Pattern Demo

`<PatternDemo />` displays the demo for the pattern referenced via `id`.

```js
const React = require('react');
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () =>  <PatternDemo id="src/button" />;
```

```widget
const React = require('react');
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () =>  <PatternDemo id="src/button" />;
```