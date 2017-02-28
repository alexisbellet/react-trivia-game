module.exports = {
    entry: "./entry.js",
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file?name=public/fonts/[name].[ext]'
        }
      ]
    },
    devServer: {
      historyApiFallback: true
  }
};
