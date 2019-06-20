const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

sass.renderSync({
  data: path.join(__dirname, 'shared/main.scss')
});

// sass.render({
//   file: path.join(__dirname, 'shared', 'main.scss')
// }, (err, result) => {
//   if (err) console.log(err);
//   else {
//     fs.writeFile(path.join(__dirname, 'shared', 'main.css'), JSON.stringify(result), 'utf-8', (err) => {
//       if (err) console.log(err);
//       else console.log('success!');
//     })
//   }
// });