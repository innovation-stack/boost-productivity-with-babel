/* eslint no-console: 0 */
module.exports = function (babel) {
  console.log('inside babel: ', Object.keys(babel));
  return {
    visitor: {
      MemberExpression: function (path) {
        console.log('inside member expression: ', Object.keys(path));
      }
    }
  };
};
