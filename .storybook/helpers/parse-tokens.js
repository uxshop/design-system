const fs = require('fs');
const sass = require('sass');
const stylePath = "./src/scss/tokens"

const tokens = sass.compile(`${stylePath}/tokens.scss`);

fs.writeFile(`${stylePath}/tokens.css`, tokens.css, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
