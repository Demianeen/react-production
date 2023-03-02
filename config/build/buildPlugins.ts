import { BuildOptions } from "./types/config";
import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack, { ProgressPlugin, WebpackPluginInstance } from "webpack";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default ({ paths, isDev }: BuildOptions): WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
      filename: "css/[name].[contenthash:8]",
      chunkFilename: "css/[name].[contenthash:8]",
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];
};
