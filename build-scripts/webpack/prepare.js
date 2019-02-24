const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const populateRules = require('./rules');
const populatePlugins = require('./plugins');
const populateTenant = require('./tenant');
const util = require('../util');

const CONSOLE_COLORS = util.getConsoleColorFormats();
const PORT = util.getPort();

function instantiateWebpack(webpackConfig, resolve) {
    const compiler = webpack(webpackConfig);
    compiler.run(() => {
        const server = new WebpackDevServer(compiler, {
            port: PORT,
            contentBase: './dist',
            open: true,
            historyApiFallback: true
        });
        server.listen(PORT, 'localhost', function () {
            console.log(CONSOLE_COLORS.YELLOW, `server listening on port ${PORT}`);
        });
        resolve({
            webpackPrepared: true
        });
    });
}

function printError(err) {
    console.log(CONSOLE_COLORS.RED, 'Unable to prepeare webpack.');
    console.log(CONSOLE_COLORS.RED, err.message);
}

function prepareWebpack(tenantName, configFileName) {
    return new Promise(async (resolve) => {
        try {
            const webpackConfig = require(path.join(__dirname, `../../${configFileName}`));
            const tenantPath = path.resolve(__dirname, `../../tenants/${tenantName}`);
            populateRules(tenantPath, webpackConfig);
            populatePlugins(tenantPath, webpackConfig);
            const result = await populateTenant(tenantName, tenantPath);
            if (result.tenantPopulated) {
                instantiateWebpack(webpackConfig, resolve);
            } else {
                resolve({
                    webpackPrepared: false
                });
            }
        } catch (ex) {
            printError(ex);
            resolve({
                webpackPrepared: false
            });
        }
    });
}

module.exports = prepareWebpack;
