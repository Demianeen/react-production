import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { ProgressPlugin } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import type { BuildOptions } from './types/config'

export default ({
  paths,
  isDev,
  isAnalyze,
  apiURL,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiURL),
      __PROJECT__: JSON.stringify(project),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.locales,
          to: paths.buildLocales,
        },
      ],
    }),
  ]

  const devPlugins = [new ReactRefreshWebpackPlugin()]

  if (isDev) {
    plugins.push(...devPlugins)
  }

  if (isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
