const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const NpmInstallPlugin = require("npm-install-webpack-plugin");

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build")
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    filename: "bundle.js",
    path: PATHS.build
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
        include: PATHS.app
      }
    ]
  }
};

if (TARGET === "start" || !TARGET) {
  module.exports = merge(common, {
    devtool: "eval-source-map",
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: "errors-only",
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({save: true})
    ]
  });
}

if (TARGET === "build") {
  module.exports = merge(common, {});
}
