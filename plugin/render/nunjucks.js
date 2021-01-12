const { promisify } = require('util');

let nunjucks;
let watchDependencies;

try {
  nunjucks = require('nunjucks');
  watchDependencies = require('snowpack-plugin-nunjucks').watchDependencies;
} catch {
  console.error(
    'To use the `nunjucks` renderer, please install peerDependencies: nunjucks snowpack-plugin-nunjucks',
  );
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

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

  return promisify(env.render.bind(env))(layout, {
    ...frontmatter,
    content: html,
  });
}

module.exports = render;
