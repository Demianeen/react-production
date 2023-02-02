import { BuildPath, BuildOptions } from './types/config';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { ProgressPlugin, WebpackPluginInstance } from 'webpack';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'

export default ({ paths }: BuildOptions): WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
      filename: "css/[name].[contenthash:8]",
      chunkFilename: "css/[name].[contenthash:8]",
    }),
  ];
};
