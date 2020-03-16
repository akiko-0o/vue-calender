const path = require('path');
const Sass = require('sass');
const Fiber = require('fibers');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';

const entry = {
  'index.js': './index.js',
};

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: '8080',
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `${isProduction ? '[name]-[local]-' : ''}[sha512:hash:base64:5]`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                fiber: Fiber,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
