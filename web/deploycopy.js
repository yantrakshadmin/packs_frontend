const fs = require('fs');
const path = require('path');

const indexFile = path.join('build', 'index.html');
const error404File = path.join('build', '404.html');
const cnameOriginal = path.join('CNAME');
const cnameBuild = path.join('build', 'CNAME');

fs.copyFile(indexFile, error404File, (err) => {
  if (err) throw err;
  console.log('build/index.html was copied to build/404.html');
});

fs.copyFile(cnameOriginal, cnameBuild, (err) => {
  if (err) throw err;
  console.log('CNAME was copied to build/CNAME');
});
// push