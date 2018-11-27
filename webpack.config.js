const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "PullDownAction.js"
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
        use: ["css-loader"]
      }
    ]
  }
};
