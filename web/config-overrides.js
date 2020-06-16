const {
  override,
  fixBabelImports,
  addLessLoader,
  useBabelRc: babelRC,
  addWebpackResolve,
} = require('customize-cra');

const theme = require('common/theme').default;
const path = require('path');

module.exports = override(
  /**
   * Resolve all dependency
   * which can clash
   */
  addWebpackResolve({
    alias: {
      react: path.resolve(__dirname, '../', 'node_modules', 'react'),
      'react-redux': path.resolve(__dirname, '../', 'node_modules', 'react-redux'),
    },
  }),

  /**
   * Use babel config
   */
  babelRC(),

  /**
   * import from lib directly
   */
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  /**
   * Compile less file
   */
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': theme.brand_primary },
  }),
);
