const util = {};

const CONSOLE_COLOR_FORMATS = {
    'RED': '\x1b[31m%s\x1b[0m',
    'GREEN': '\x1b[32m%s\x1b[0m',
    'YELLOW': '\x1b[33m%s\x1b[0m',
    'NAVY_BLUE': '\x1b[36m%s\x1b[0m'
};

const PORT = 8020;

util.getConsoleColorFormats = () => CONSOLE_COLOR_FORMATS;
util.getPort = () => PORT;

module.exports = util;