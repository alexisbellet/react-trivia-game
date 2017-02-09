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
        },{
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    devServer: {
      historyApiFallback: true
  }
};
