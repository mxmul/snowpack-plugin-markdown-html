const { promisify } = require('util');
const nunjucks = require('nunjucks');
const { watchDependencies } = require('snowpack-plugin-nunjucks');

function render({
  html,
  frontmatter,
  loadOptions: { filePath, isDev },
  markChanged,
}) {
  const env = nunjucks.configure(process.cwd());
  const { layout } = frontmatter;

  if (isDev) {
    watchDependencies({
      env,
      filePath,
      onChange: () => {
        markChanged();
      },
    });
  }

  return promisify(env.render.bind(env))(
    layout,
    { ...frontmatter, content: html },
  );
}

module.exports = render;
