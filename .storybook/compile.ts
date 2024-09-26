import { writeFile } from 'node:fs';
import { compile } from 'sass';

const tokensPath = './src/scss/tokens';

const tokens = compile(`${tokensPath}/tokens.scss`);

writeFile(`${tokensPath}/stories/tokens.css`, tokens.css, (err) => {
  if (err) console.error(err);
});
