const fs = require('fs');
const grayMatter = require('gray-matter');
const { parse } = require('markdown-wasm');

function defaultRender({ frontmatter, html }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${frontmatter.title || ''}</title>
      </head>
      <body>
      ${html}
      </body>
    </html>
  `;
}

module.exports = function (snowpackConfig, options) {
  return {
    name: 'snowpack-plugin-markdown-html',
    resolve: {
      input: ['.md'],
      output: ['.html'],
    },
    async load(loadOptions) {
      const { filePath } = loadOptions;
      const { parseOptions = {}, render = defaultRender } = options;

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
