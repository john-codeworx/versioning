const path = require('path');

const cwd = process.cwd();

module.exports = {
  entry: {
    'index': path.join(cwd, 'src', 'index.js'),
    // 'service-worker': path.join(cwd, 'src', 'service-worker.js'),
    'example': path.join(cwd, 'src', 'example.js'),
    'web-worker': path.join(cwd, 'src', 'web-worker.js')
  },
  output: {
    path: path.join(cwd, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(cwd, 'build'),
    compress: true,
    port: 8084
  }
};
