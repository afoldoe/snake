const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    path: `./src/public`,
    filename: `bundle.js`
  },
  devtool: `source-map`,
  plugins: [new HtmlWebpackPlugin({
    template: `./src/app.html`
  })],
  module: {
    preLoader: [{
      test: /\.js$/,
      loader: `eslint-loader`,
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: `babel`,
      query: {
        presets: [`es2015`],
        cacheDirectory: true
      }
    },
    {
      test: /\.css$/,
      loader: `style!css?sourceMap`
    },
    {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!sass?sourceMap'
    },
    {
      test: /\.html$/,
      loader: `html`
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss/includes']
  }
};