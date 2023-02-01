import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { ProgressPlugin, Configuration } from 'webpack'

const config: Configuration = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
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
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new ProgressPlugin(),
  ]
};

export default config;
