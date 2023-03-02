import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { ProgressPlugin } from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

export default ({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
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
