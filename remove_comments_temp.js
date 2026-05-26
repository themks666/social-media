const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'frontend', 'src', 'pages', 'userPage', 'HomeWithAuth.tsx');
let text = fs.readFileSync(file, 'utf8');
text = text.replace(/\/\/.*$/gm, '');
text = text.replace(/\/\*[\s\S]*?\*\//g, '');
text = text.replace(/<!--([\s\S]*?)-->/g, '');
fs.writeFileSync(file, text, 'utf8');
console.log('removed comments from HomeWithAuth.tsx');
