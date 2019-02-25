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
      loader: 'babel-loader',
      include: [
        path.join(__dirname, 'src')
      ],
      exclude: /node_modules/,
      options: {
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import'
        ]
      }
    }]
  },
  plugins: []
};