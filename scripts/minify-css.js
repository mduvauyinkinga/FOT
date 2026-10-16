// Minifies css/styles.css -> css/styles.min.css using the lightningcss
// library (installed as a Vite dependency; no CLI binary is shipped).
// Run via: npm run build:css
const { transform } = require('lightningcss');
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'css', 'styles.css');
const outPath = path.join(__dirname, '..', 'css', 'styles.min.css');
const css = fs.readFileSync(srcPath);

const { code } = transform({
  filename: srcPath,
  code: css,
  minify: true,
  targets: { chrome: 100 << 16, firefox: 100 << 16, safari: 16 << 16 },
});

fs.writeFileSync(outPath, code);
console.log(`styles.min.css written (${css.length} -> ${code.length} bytes)`);
