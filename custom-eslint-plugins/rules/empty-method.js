function isMethodEmpty(node) {
  let isEmpty = false;
  if (node.body && node.body.body.length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}

module.exports = function (context) {
  return {
    MethodDefinition: function (node) {
      if (isMethodEmpty(node.value)) {
        context.report({
          node,
          message: 'Cannot have empty class methods'
        });
      }
    },
    ClassProperty: function (node) {
      if (node.value && node.value.type === 'FunctionExpression' && isMethodEmpty(node.value)) {
        context.report({
          node,
          message: 'Cannot have empty class methods'
        });
      }
    }
  };
};