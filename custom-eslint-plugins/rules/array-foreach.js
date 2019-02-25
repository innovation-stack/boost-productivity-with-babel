module.exports = function (context) {
  return {
    'MemberExpression': function (node) {
      if (node.property.name === 'forEach') {
        context.report({
          node,
          message: 'Avoid using Array\'s forEach(). Prefer native "for" loops or map(), reduce() higher order functions'
        });
      }
    }
  };
};