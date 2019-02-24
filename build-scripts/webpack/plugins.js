const HtmlWebpackPlugin = require('html-webpack-plugin');

function populatePlugins(tenantPath, webpackConfig) {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: `${tenantPath}/index.html`
    }));
}

module.exports = populatePlugins;