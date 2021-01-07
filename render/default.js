function render({ frontmatter, html }) {
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

module.exports = render;
