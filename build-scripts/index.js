const argv = require('yargs').argv;
const validateFlags = require('./flags-validator');
const validateTenant = require('./tenant-validator');
const prepareWebpack = require('./webpack/prepare');

async function build() {
  let result;
  result = validateFlags(argv);
  if (result.isValid) {
    const {
      tenant,
      config
    } = argv;
    result = await validateTenant(tenant);
    if (result.exists) {
      await prepareWebpack(tenant, config);
    }
  }
}

build();