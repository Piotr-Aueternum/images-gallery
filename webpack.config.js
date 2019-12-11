const resolve = require('path').resolve;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src'],
  output: {
    path: resolve('server/public'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000/',
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  resolve: {
    alias: {
      modules: path.resolve(__dirname, 'src/modules/'),
      components: path.resolve(__dirname, 'src/components/'),
      utilities: path.resolve(__dirname, 'src/utilities'),
      models: path.resolve(__dirname, 'src/models'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};