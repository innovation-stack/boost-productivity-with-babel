const path = require('path');

module.exports = {
  entry: './src/index.js', // relative path
  output: {
    path: path.join(__dirname, 'dist'), // absolute path
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }],
      include: [
        path.join(__dirname, './src')
      ],
      exclude: /node_modules/
    }]
  },
  plugins: []
};