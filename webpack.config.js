const path = require("path");

module.exports = {
  entry: {
    PullDownAction: [path.resolve(__dirname, "src/index.js")]
  },
  output: {
    filename: "PullDownAction.js",
    path: path.join(__dirname, "./dist/"),
    library: "[name]",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
