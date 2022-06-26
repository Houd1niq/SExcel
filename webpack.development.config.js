const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    index: "./src/index.js", // Don't forget to change this if u will use config files in
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.join(__dirname, "src"),
      "@core": path.join(__dirname, "src", "core"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "development",
  devServer: {
    port: 9000,
    watchFiles: ["./src"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["transform-class-properties"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      inject: "body",
      favicon: "src/assets/favicon3.ico",
      // chunks: ["main"],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "src/assets", to: "assets" }],
    // }),
  ],
};
