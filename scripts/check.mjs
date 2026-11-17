import fs from 'fs';

const required = [
  'index.html',
  'Asset/dist/app.js',
  'Asset/dist/app.css',
  'src/data/projects.json',
  'src/data/brands.json',
  'Asset/img/rifat-portrait.png',
  'Asset/cv/MrShadowRIFAT_CV.pdf'
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    ok = false;
  }
}

if (ok) {
  console.log('All required files verified successfully.');
} else {
  process.exit(1);
}
