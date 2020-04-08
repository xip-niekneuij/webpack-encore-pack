const fs = require('fs');

describe('Tests', function() {
  test('files should be built', () => {
    expect(fs.existsSync('./test-app/public/build/manifest.json')).toBeTruthy();
    expect(fs.existsSync('./test-app/public/build/entrypoints.json')).toBeTruthy();
    expect(fs.readFileSync('./test-app/public/build/entrypoints.json').toString()).toMatchSnapshot();
    expect(fs.existsSync('./test-app/public/build/runtime.js')).toBeTruthy();
    expect(fs.existsSync('./test-app/public/build/app.js')).toBeTruthy();
    expect(fs.existsSync('./test-app/public/build/app.js')).toBeTruthy();
  });

  test('files should be executed correctly on a webpage', async () => {
    expect.assertions(3);

    page.on('console', msg => {
      expect(msg.text()).toBe('Hello world from app.js!');
    });

    await page.goto('http://127.0.0.1:8111');

    expect(await page.title()).toContain('Webpack App');
    expect(await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('background-color'))).toBe('rgb(221, 221, 221)'); // #ddd
  });
});
