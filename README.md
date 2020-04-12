# Webpack Encore Pack

![Node CI](https://github.com/Yproximite/webpack-encore-pack/workflows/Node%20CI/badge.svg)
![Release](https://github.com/Yproximite/webpack-encore-pack/workflows/Release/badge.svg)
![Node requirements](https://img.shields.io/badge/node-%3E%3D%2010.*-brightgreen)

> A pack of dependencies including [Webpack Encore](https://github.com/symfony/webpack-encore).

## Features

Webpack Encore Pack is just a pack of dependencies that we always use on our projects (`sass`, `postcss`, ...), this package has no _specific features_.

Included dependencies:
- `@symfony/webpack-encore`
- `autoprefixer`
- `postcss`
- `postcss-loader`
- `sass`
- `sass-loader`

## Installation

This package is hosted on [GitHub Packages](https://github.com/features/packages), so you must tell to npm/yarn where to download it.
Please read [Authenticating to GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).

You can run `npm login --registry=https://npm.pkg.github.com --scope=@yproximite` **or** create a `.npmrc` file with the following content:
```
@yproximite:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<access token>
```

Then run: 
```bash
$ yarn add --dev @yproximite/webpack-encore-pack
```

## Usage

Read the [Webpack Encore documentation](https://symfony.com/doc/current/frontend.html).

This is the base `webpack.config.js` we use:

```js
// webpack.config.js
const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath(`public/build`)
  // public path used by the web server to access the output path
  .setPublicPath(`/build`)

  /*
   * ENTRY CONFIG
   */
  .addEntry('app', [`./assets/app`])
  // .addEntry('page.1', [`./assets/pages/1`])
  // .addEntry('page.2', [`./assets/pages/2`])

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .configureBabelPresetEnv(config => {
    config.useBuiltIns = 'usage';
    config.corejs = 3; // you must install `core-js`
  })

  // enable Sass loader with Dart Sass implementation, see https://sass-lang.com/dart-sass
  .enableSassLoader(options => {
    options.implementation = require('sass');
  })

  // enable PostCSS loader, you must create a `postcss.config.js` file
  .enablePostCssLoader()

  // we use virtual machines with NFS, this is required to make watching work properly
  .configureWatchOptions(options => {
    options.poll = 150; // enable polling, useful in NFS partition (virtual machine)
  });

module.exports = Encore.getWebpackConfig();
```

and `postcss.config.js`:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')(),
  ],
};
```

## Development workflow

You need to install some dependencies first:
```bash
$ yarn
```

### Contribution

- Make a pull request on `master`, its title should follows [Angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-format)
- You should **Squash and Merge** your pull request

### Publishing a new release

This is automatically done by GitHub Actions and [semantic-release](https://github.com/semantic-release/semantic-release) when you merge a pull request.
The preset [`@kocal/semantic-release-preset`](https://github.com/Kocal/semantic-release-preset) is used.
