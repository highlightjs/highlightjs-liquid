# Liquid Language Grammar for highlight.js

![license](https://badgen.net/badge/license/MIT/blue)

A language grammar for Shopify's Liquid templating language in highlight.js.

## Usage

Simply include the highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. You'll use the minified version found in the `dist` directory.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/liquid.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
```

### Using directly from the UNPKG CDN

```html
<script
  type="text/javascript"
  src="https://unpkg.com/highlightjs-liquid@0.9.1/dist/liquid.min.js"
></script>
```

- More info: <https://unpkg.com>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require("highlight.js");
var hljsLiquid = require("highlightjs-liquid");

hljs.registerLanguage("liquid", hljsLiquid);
hljs.highlightAll();
```

## License

This package is released under the MIT License. See [LICENSE](LICENSE) file for details.

### Author & Maintainer

Laurel King <laurel.king@shopify.com>
Mathieu Legault <mathieu.legault@shopify.com>

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Liquid: <https://shopify.dev/docs/api/liquid>
