> < [Back](./readme.md) to Readme

# Transforms

Transforms are a cornerstone of the patternplate environments. They provide
the necessary brains to transform your raw pattern sources into usable, testable
and deliverable code.

## Installing transforms

The recommended way to install and get new patternplate tranforms is installing them via npm.
Say your CSS workflow is SASS based - you'll want to replace the [less](https://github.com/sinnerschrader/patternplate-transform-less) used by `patternplate init` with the [node-sass](https://github.com/marionebl/patternplate-transform-node-sass) transform.

```bash
# Install patternplate-transform-node-sass via npm
npm remove --save patternplate-transform-less
npm install --save patternplate-transform-node-sass
```

## Enabling transforms

To make patternplate loading transforms you'll have to tell it to do so. Specify your transforms in
`configuration/patternplate-server/transforms.js`. Place configuration for the transform you want to use under its name, sans the `patternplate-transform-*` ordeal:

* patternplate-transform-less => `less`
* patternplate-transform-node-sass => `node-sass`
* patternplate-transform-react => `react`

```js
// configuration/patternplate-server/transforms.js
module.exports = {
	'node-sass': { // [patternplate-transform-]node-sass
		inFormat: 'sass', // specify the format this transform accepts
		outFormat: 'css', // specify the format this transform emits
		opts: { // By convention this object is passed to the used tool directly
			indentWidth: 3
		}
	}
}
```

## Using transforms

In order to apply your freshly configured transform on pattern files you'll have to connect a format with it. Do this by specifying the connection in `configuration/patternplate-server/patterns.js`:

```js
/**
 * configuration/patternplate-server/patterns.js
 * This config will cause patternplate to pick up any index.scss, index.sass,
 * demo.sass and demo.scss files and send it through the node-sass transform
 */
module.exports = {
	formats: {
		scss: {
			transforms: ['node-sass'] // specify the node-sass transform under its configured name here
		},
		sass: {
			transforms: ['node-sass'] // specify the node-sass transform under its configured name here
		}
	}
}
```

---
See [Formats](./formats.md) for further information

## Available transforms

Search for [patternplate-transform](https://www.npmjs.com/search?q=patternplate-transform) on npmjs.org to find new transforms or browse the list below.

|Name| Description | Stability | Tests | Typings |
|----|-------------|-----------|:-----:|:-------:|
| [babel][babel] | babel your JavaScript sources | ![][stable] | ![][smoke] | ![][untyped] |
| [browserify][browserify] | bundle JavaScript sources with browserify | ![][stable] | ![][smoke] | ![][typed] |
| [less][less] | create css from less sources | ![][stable] | ![][tested] | ![][typed] |
| [markdown][markdown] | process html from markdown sources | ![][deprecated] | ![][untested] | ![][untyped] |
| [node-sass][node-sass] | Process SASS and SCSS to CSS with patternplate | ![][experimental] | ![][tested] | ![][typed] |
| [postcss][postcss] | apply postcss to css sources | ![][stable] | ![][untested] | ![][untyped] |
| [react-mount][react-mount] | mount react components with full life cycle on the client side | ![][experimental] | ![][tested] | ![][untyped] |
| [react-to-markup][react-to-markup] | create markup from react components | ![][stable] | ![][tested] | ![][untyped] |
| [react][react] | create reusable React classes from jsx templates | ![][stable] | ![][tested] | ![][untyped] |
| [resolve-includes][resolve-includes] | rewrite dependency includes to interoperable paths | ![][stable] | ![][untested] | ![][untyped] |
| [resolve-imports][resolve-imports] | transform pattern dependency imports to interoperable paths | ![][stable] | ![][untested] | ![][untyped] |
| [styled-components][styled-components] | Serverside rendering for styled-components styled patternplate patterns | ![][experimental] | ![][untested] | ![][untyped] |
| [typescript][typescript] | TypeScript transform for patternplate patterns | ![][stable] | ![][untested] | ![][typed] |
| [uglify][uglify] | uglify your JavaScript sources | ![][stable] | ![][untested] | ![][untyped] |

### Intent to implement

* [consolidate](https://github.com/sinnerschrader/patternplate/issues/97)

The transform you'd like to use is missing from this list?

Holler at [sinnerschrader/patternplate](https://github.com/sinnerschrader/patternplate/issues/new) and we should be able to work this out together.

----
[babel]: https://www.npmjs.com/package/patternplate-transform-babel
[browserify]: https://www.npmjs.com/package/patternplate-transform-browserify
[less]: https://www.npmjs.com/package/patternplate-transform-less
[markdown]: https://www.npmjs.com/package/patternplate-transform-markdown
[node-sass]: https://www.npmjs.com/package/patternplate-transform-node-sass
[postcss]: https://www.npmjs.com/package/patternplate-transform-postcss
[react-mount]: https://www.npmjs.com/package/patternplate-transform-react-mount
[react-to-markup]: https://www.npmjs.com/package/patternplate-transform-react-to-markup
[react]: https://www.npmjs.com/package/patternplate-transform-react
[resolve-includes]: https://www.npmjs.com/package/patternplate-transform-resolve-includes
[resolve-imports]: https://www.npmjs.com/package/patternplate-transform-resolve-imports
[styled-components]: https://www.npmjs.com/package/patternplate-transform-styled-components
[typescript]: https://www.npmjs.com/package/patternplate-transform-typescript
[uglify]: https://www.npmjs.com/package/patternplate-transform-uglify

[deprecated]: https://img.shields.io/badge/stability-deprecated-red.svg?style=flat-square
[experimental]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stable]: https://img.shields.io/badge/stability-stable-green.svg?style=flat-square
[locked]: https://img.shields.io/badge/stability-locked-blue.svg?style=flat-square

[tested]: https://img.shields.io/badge/tested-yes-green.svg?style=flat-square
[smoke]: https://img.shields.io/badge/tested-smoke-orange.svg?style=flat-square
[untested]: https://img.shields.io/badge/tested-no-red.svg?style=flat-square

[typed]: https://img.shields.io/badge/typings-yes-green.svg?style=flat-square
[untyped]: https://img.shields.io/badge/typings-no-red.svg?style=flat-square
