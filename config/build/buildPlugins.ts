import { BuildPath } from './types/config';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { ProgressPlugin, WebpackPluginInstance } from 'webpack';

export default (pathToHtml: BuildPath['html']): WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: pathToHtml,
    }),
    new ProgressPlugin(),
  ];
};
