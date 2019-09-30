/* eslint-disable filenames/match-exported, sort-keys */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import pkg from './package.json';

// eslint-disable-next-line no-process-env
const production = process.env.NODE_ENV === 'production';

const plugins = [
  sourcemaps(),
  babel({
    exclude: [
      '../../node_modules/**',
      'node_modules/**'
    ]
  }),
  resolve({
    customResolveOptions: {
      moduleDirectory: [
        'node_modules',
        '../../node_modules'
      ]
    }
  }),
  commonjs()
];

// NOTE: see https://github.com/rollup/rollup/issues/408 to understand why we silences `THIS_IS_UNDEFINED` warnings
const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  warn(warning);
};

const config = [
  {
    input: 'src/index.js',
    onwarn,
    output: {
      sourcemap: true,
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      ...plugins,
      production && terser()
    ]
  }
];

export default config;
