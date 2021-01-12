const { stripIndent } = require('common-tags');

function render({ frontmatter, html }) {
  return stripIndent`
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

module.exports = render;
