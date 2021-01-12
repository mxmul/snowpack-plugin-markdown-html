const fs = require('fs');
const grayMatter = require('gray-matter');
const { parse } = require('markdown-wasm');

// Lazily import named renderers, because they may have optional
// peer dependencies (e.g. nunjucks)
const namedRenderers = {
  default: () => require('./render/default'),
  nunjucks: () => require('./render/nunjucks'),
};

module.exports = function (snowpackConfig, options) {
  return {
    name: 'snowpack-plugin-markdown-html',
    resolve: {
      input: ['.md'],
      output: ['.html'],
    },
    async load(loadOptions) {
      const { filePath } = loadOptions;
      const { parseOptions = {} } = options;

      let { render = 'default' } = options;
      if (render in namedRenderers) {
        render = namedRenderers[render]();
      }

      const source = fs.readFileSync(filePath);

      const { data: frontmatter, content: markdown } = grayMatter(source);
      const html = parse(markdown, parseOptions);

      return render({
        html,
        frontmatter,
        markdown,
        loadOptions,
        markChanged: () => {
          this.markChanged(filePath);
        },
      });
    },
  };
};
