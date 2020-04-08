const test = require('ava');
const fs = require('fs');

test('files should be built', async t => {
  t.true(fs.existsSync('./test-app/public/build/manifest.json'));
  t.true(fs.existsSync('./test-app/public/build/entrypoints.json'));
  t.true(fs.existsSync('./test-app/public/build/runtime.js'));
  t.true(fs.existsSync('./test-app/public/build/app.js'));
  t.true(fs.existsSync('./test-app/public/build/app.js'));
});
