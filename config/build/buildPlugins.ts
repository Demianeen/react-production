import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { ProgressPlugin } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type { BuildOptions } from './types/config'

export default ({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8]',
      chunkFilename: 'css/[name].[contenthash:8]',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ]

  const devPlugins = [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new ReactRefreshWebpackPlugin(),
  ]

  if (isDev) {
    plugins.push(...devPlugins)
  }

  return plugins
}
