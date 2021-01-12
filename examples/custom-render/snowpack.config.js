const { stripIndent } = require('common-tags');

module.exports = {
  mount: {
    src: '/',
  },
  plugins: [
    [
      'snowpack-plugin-markdown-html',
      {
        render({ frontmatter, html }) {
          return stripIndent`
          <!DOCTYPE html>
          <html>
          <head>
              <title>${frontmatter.title || ''}</title>
              <style>
              html, body {
                background-color: yellow;
                font-family: 'Comic Sans MS';
              }
              </style>
          </head>
          <body>
            ${html}
          </body>
          </html>
      `;
        },
      },
    ],
  ],
};
