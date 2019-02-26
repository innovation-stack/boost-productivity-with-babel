/* eslint no-console: 0 */
const path = require('path');

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

const jsRule = {
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }
    }
  ],
  include: [
    path.resolve(__dirname, '../../src')
  ],
  exclude: /node_modules/
};

function getExclusions(tenantPath) {
  let exclusions;
  try {
    exclusions = require(`${tenantPath}/exclusions.json`);
  } catch (ex) {
    exclusions = undefined;
  }
  return exclusions;
}

function populateRules(tenantPath, webpackConfig) {
  const exclusions = getExclusions(tenantPath) || {};
  sassRule.include = [tenantPath];
  htmlRule.include = [tenantPath];

  webpackConfig.module.rules.push(sassRule);
  webpackConfig.module.rules.push(htmlRule);
  webpackConfig.module.rules.push(jsRule);
  jsRule.use[0].options.plugins.unshift(['babel-plugin-deadcode', exclusions]);
}

module.exports = populateRules;