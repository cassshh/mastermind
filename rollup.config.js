import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  entry: 'src/app.mjs',
  dest: 'build/src/app.mjs',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    copy({
      'index.html': 'build/index.html',
      'images/': 'build/images/',
      'browserconfig.xml': 'build/browserconfig.xml',
      'favicon.ico': 'build/favicon.ico',
      'favicon-16x16.png': 'build/favicon-16x16.png',
      'favicon-32x32.png': 'build/favicon-32x32.png',
      'manifest.json': 'build/manifest.json',
      'service-worker.js': 'build/service-worker.js',
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js':
        'build/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
      verbose: true
    })
  ]
};
