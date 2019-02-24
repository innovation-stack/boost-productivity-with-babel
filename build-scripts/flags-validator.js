const fs = require('fs-extra');
const util = require('./util');

const CONSOLE_COLOR_FORMATS = util.getConsoleColorFormats();

module.exports =  function (args) {
    let result = {};
    if (!args.tenant) {
        console.log(CONSOLE_COLOR_FORMATS.RED, 'Tenant flag does not exist');
        result.isValid = false;
    } else if (!args.config) {
        console.log(CONSOLE_COLOR_FORMATS.RED, 'Webpack config flag does not exist');
        result.isValid = false;
    } else {
        result.isValid = true;
    }
    return result;
};