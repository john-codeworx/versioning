const path = require('path');

const cwd = process.cwd();

module.exports = {
  entry: {
    'example': path.join(cwd, 'src', 'example.js'),
    'service-worker': path.join(cwd, 'src', 'service-worker.js'),
    'web-worker': path.join(cwd, 'src', 'web-worker.js')
  },
  output: {
    path: path.join(cwd, 'public'),
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
    contentBase: path.join(cwd, 'public'),
    compress: true,
    port: 8084
  }
};
