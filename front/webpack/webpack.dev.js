const common = require("./webpack.common");
module.exports = {
  ...common,
  mode: "development",
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    publicPath: "/",
    allowedHosts: ["0.0.0.0", "localhost", "*"],
    port: process.env.port || 3001,
  },
  devtool: "inline-source-map",
  watch: true,
};
