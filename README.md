# snowpack-plugin-markdown-html

[![npm][npm]][npm-url]

Use [markdown-wasm](https://github.com/rsms/markdown-wasm) to build `.md` files to HTML.

### Usage

From a terminal, run the following:

```
npm install --save-dev snowpack-plugin-markdown-html
```

Then add this plugin to your Snowpack config:

```js
// snowpack.config.json
{
  "plugins": [
    "snowpack-plugin-markdown-html"
  ]
}
```

### Plugin Options

| Name        | Type                         | Description                                                                                                                   |
| ----------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `render` | `({html: string, frontmatter: Object, markdown: string, loadOptions: PluginLoadOptions, markChanged: () => void}) => string` | (optional) Custom render function. *`markChanged` can be used to bust Snowpack's cache of the `.md` file, e.g. if a layout file has changed.* |
| `parseOptions` | `Object` | (optional) See https://github.com/rsms/markdown-wasm#api |


[npm]: https://img.shields.io/npm/v/snowpack-plugin-markdown-html.svg
[npm-url]: https://npmjs.com/package/snowpack-plugin-markdown-html
