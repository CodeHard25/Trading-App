// This script copies dist/index.html to dist/404.html and ensures all asset paths are absolute for GitHub Pages SPA support.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

let html = fs.readFileSync(indexPath, 'utf8');
// Replace any href or src that does not start with /Trading-App/assets/ to be absolute
html = html.replace(/(src|href)="(?!\/Trading-App\/assets\/)/g, '$1="/Trading-App/assets/');
fs.writeFileSync(notFoundPath, html);
console.log('404.html generated for GitHub Pages SPA routing.');
