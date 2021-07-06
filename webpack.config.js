const path = require("path");

module.exports = {
  entry: path.resolve(process.cwd(), "source/index.tsx"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this",
    path: path.resolve(process.cwd(), "build"),
  },
  externals: {
    react: "react",
    "styled-components": "styled-components",
  },
};
