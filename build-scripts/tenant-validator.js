/* eslint no-console: 0 */
const fs = require('fs-extra');
const path = require('path');
const util = require('./util');

const CONSOLE_COLOR_FORMATS = util.getConsoleColorFormats();

module.exports = async function (tenantName) {
  let result = {};
  try {
    console.log(CONSOLE_COLOR_FORMATS.YELLOW, `Validating existence of tenant ${tenantName}...`);
    const stats = await fs.stat(path.resolve(__dirname, `../tenants/${tenantName}`));
    if (stats) {
      console.log(CONSOLE_COLOR_FORMATS.GREEN, `${tenantName} exists`);
      result.exists = true;
    }
  } catch (ex) {
    console.log(CONSOLE_COLOR_FORMATS.RED, `Error fetching stats for ${tenantName}`);
    console.log(CONSOLE_COLOR_FORMATS.RED, ex.message);
    result.exists = false;
  }
  return result;
};