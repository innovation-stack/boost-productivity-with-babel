const path = require('path');

module.exports = {
  entry: './src/index.js', // relative path
  output: {
    path: path.join(__dirname, 'dist'), // absolute path
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: []
  },
  plugins: []
};