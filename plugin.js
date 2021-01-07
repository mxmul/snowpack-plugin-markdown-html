const fs = require('fs');
const grayMatter = require('gray-matter');
const { parse } = require('markdown-wasm');
const defaultRender = require('./render/default');
const nunjucksRender = require('./render/nunjucks');

const namedRenderers = {
  default: defaultRender,
  nunjucks: nunjucksRender,
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

      let { render = "default" } = options;
      if (render in namedRenderers) {
        render = namedRenderers[render];
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
