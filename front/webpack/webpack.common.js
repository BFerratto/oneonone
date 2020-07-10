const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { resolve } = path;
const src = resolve(__dirname, "../src");
const entry = resolve(src, "./index.tsx");
const output = resolve(__dirname, "../../dist");
const template = resolve(__dirname, "./index.html");

module.exports = {
  context: __dirname,
  entry,
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
  },
  output: {
    path: output,
    filename: "main.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /__tests__/],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-modules-typescript-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template,
      filename: "index.html",
    }),
  ],
};
