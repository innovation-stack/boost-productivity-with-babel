/* eslint no-console: 0 */

const serviceToFileNameCache = {};

function getOuterChainedMethod(path) {
  let nextSiblingPath;

  do {
    path = path.parentPath;
    if (path.type !== 'MemberExpression' && path.type !== 'CallExpression') {
      break;
    }
    nextSiblingPath = path.parentPath;
  } while (nextSiblingPath.type === 'MemberExpression' && nextSiblingPath.type === 'CallExpression');
  return nextSiblingPath;
}

function getFileNameFromServiceName(serviceName = '') {
  let fileName;
  let totalChars = serviceName.length;
  if (serviceToFileNameCache[serviceName]) {
    fileName = serviceToFileNameCache[serviceName];
  } else if (serviceName !== '') {
    try {
      while (--totalChars) {
        if (serviceName[totalChars] === serviceName[totalChars].toUpperCase()) {
          const firstToken = serviceName[0].toLowerCase() + serviceName.substring(1, totalChars);
          let secondToken = serviceName.substring(totalChars);
          secondToken = secondToken[0].toLowerCase() + secondToken.substring(1);
          fileName = `${firstToken}.${secondToken}`;
          serviceToFileNameCache[serviceName] = fileName;
          break;
        }
      }
    } catch (ex) {
      console.log('exception caught for: ', serviceName);
    }
  }
  return fileName;
}

function removeFromInjections(path, servicesToExclude) {
  const calleePath = path.parentPath;

  if (calleePath.node.arguments.length === 2) {
    const injectionArgsPath = calleePath.get('arguments')[1];
    const properties = injectionArgsPath.node.properties;
    const index = properties.findIndex(function (p) {
      return servicesToExclude.indexOf(getFileNameFromServiceName(p.key.name)) !== -1;
    });
    if (index >= 0) {
      const propertiesPath = injectionArgsPath.get(`properties.${index}`);
      propertiesPath.remove();
    }
  }
}

function removeInstantiation(path, servicesToExclude) {
  const parentPath = path.parentPath;
  const args = parentPath.node.arguments;
  if (servicesToExclude.indexOf(getFileNameFromServiceName(args[1].name)) !== -1) {
    parentPath.remove();
  }
}

function removeMethodCalls(path) {
  const outerPath = getOuterChainedMethod(path.parentPath);
  outerPath.parentPath.remove();
}

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: function (path, options) {
        const exclusions = options.opts || {};
        exclusions.services = exclusions.services || [];
        let importFileName = path.node.source.value;
        importFileName = importFileName.substring(importFileName.lastIndexOf('/') + 1);
        if (path.node && exclusions.services.indexOf(importFileName) !== -1) {
          path.remove();
        }
      },
      MemberExpression: function (path, options) {
        const exclusions = options.opts || {};
        exclusions.services = exclusions.services || [];

        if (path.node.object.name === 'injections' && path.node.property.name === 'set') {
          removeFromInjections(path, exclusions.services);
        } else if (path.node.object.name === 'app' && path.node.property.name === 'service') {
          removeInstantiation(path, exclusions.services);
        } else if (exclusions.services.indexOf(getFileNameFromServiceName(path.node.object.name)) !== -1) {
          removeMethodCalls(path);
        }
      },
      ObjectPattern: function (path, options) {
        const exclusions = options.opts || {};
        exclusions.services = exclusions.services || [];

        if (path.node) {
          const index = path.node.properties.findIndex(function (p) {
            return exclusions.services.indexOf(getFileNameFromServiceName(p.key.name)) !== -1;
          });
          if (index >= 0) {
            path.get(`properties.${index}`).remove();
            if (path.node.properties.length === 0) {
              path.parentPath.remove();
            }
          }
        }
      }
    }
  };
};
