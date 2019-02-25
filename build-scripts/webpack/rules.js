/* eslint no-console: 0 */
const sassRule = {
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ],
  exclude: /node_modules/
};

const htmlRule = {
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader'
    }
  ],
  exclude: /node_modules/
};

function populateRules(tenantPath, webpackConfig) {
  sassRule.include = [tenantPath];
  htmlRule.include = [tenantPath];

  webpackConfig.module.rules.push(sassRule);
  webpackConfig.module.rules.push(htmlRule);
}

module.exports = populateRules;