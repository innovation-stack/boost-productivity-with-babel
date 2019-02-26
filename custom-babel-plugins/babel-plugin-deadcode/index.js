/* eslint no-console: 0 */

function getOuterChainedMethod(path) {
  let nextSiblingPath;

  do {
    path = path.getNextSibling().parentPath;
    if (path.type !== 'MemberExpression' && path.type !== 'CallExpression') {
      break;
    }
    nextSiblingPath = path.getNextSibling().parentPath;
  } while (nextSiblingPath.type === 'MemberExpression' && nextSiblingPath.type === 'CallExpression');
  return path;
}

function removeFromInjections(path) {
  const calleePath = path.parentPath;
  if (calleePath.node.arguments.length === 2) {
    const injectionArgsPath = calleePath.get('arguments')[1];
    const properties = injectionArgsPath.node.properties;
    const index = properties.findIndex(function (p) {
      return p.key.name === 'PhotoService';
    });
    if (index >= 0) {
      const propertiesPath = injectionArgsPath.get(`properties.${index}`);
      propertiesPath.remove();
    }
  }
}

function removeInstantiation(path) {
  const parentPath = path.parentPath;
  const args = parentPath.node.arguments;
  if (args[0].name === 'PHOTO_SERVICE' && args[1].name === 'PhotoService') {
    parentPath.remove();
  }
}

function removeMethodCalls(path) {
  const outerPath = getOuterChainedMethod(path.parentPath);
  if (outerPath.type === 'MemberExpression') {
    outerPath.parentPath.remove();
  }
}

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: function (path, options) {
        if (path.node && path.node.source.value.includes('photo.service')) {
          console.log('Options 123: ', options.opts);
          path.remove();
        }
      },
      MemberExpression: function (path) {
        if (path.node.object.name === 'injections' && path.node.property.name === 'set') {
          removeFromInjections(path);
        } else if (path.node.object.name === 'app' && path.node.property.name === 'service') {
          removeInstantiation(path);
        } else if (path.node.object.name === 'PhotoService') {
          removeMethodCalls(path);
        }
      },
      ObjectPattern: function (path) {
        if (path.node) {
          const index = path.node.properties.findIndex(function (p) {
            return p.key.name === 'PhotoService';
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
