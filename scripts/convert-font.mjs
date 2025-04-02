// scripts/convert-font.mjs
import fs from 'fs';
import ttf2woff2 from 'ttf2woff2';

// 1. Read the font file
const input = fs.readFileSync('public/fonts/TrenchSlab-Variable.ttf');

// 2. Convert to WOFF2
const output = ttf2woff2(input);

// 3. Save the converted file
fs.writeFileSync('public/fonts/TrenchSlab.woff2', output);

console.log('✅ Conversion successful! Check public/fonts/');