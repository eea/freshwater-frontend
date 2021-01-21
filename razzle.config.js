/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

if (process.env.NODE_ENV === 'production') {
  module.exports = require(`${voltoPath}/razzle.config`);
} else {
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

  let voltoConfig = require(`${voltoPath}/razzle.config`);

  module.exports = {
    ...voltoConfig,
    modifyWebpackConfig: (opts) => {
      const vc = voltoConfig.modifyWebpackConfig(opts);
      const hardSource = new HardSourceWebpackPlugin({
        // Either an absolute path or relative to webpack's options.context.
        cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        // Either a string of object hash function given a webpack config.
        configHash: function (webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require('node-object-hash')({ sort: false }).hash(
            webpackConfig,
          );
        },
        // Either false, a string, an object, or a project hashing function.
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
        // An object.
        info: {
          // 'none' or 'test'.
          mode: 'none',
          // 'debug', 'log', 'info', 'warn', or 'error'.
          level: 'debug',
        },
        // Clean up large, old caches automatically.
        cachePrune: {
          // Caches younger than `maxAge` are not considered for deletion. They must
          // be at least this (default: 2 days) old in milliseconds.
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // All caches together must be larger than `sizeThreshold` before any
          // caches will be deleted. Together they must be at least this
          // (default: 50 MB) big in bytes.
          sizeThreshold: 50 * 1024 * 1024,
        },
      });
      vc.plugins.push(hardSource);
      return vc;
    },
  };
}
