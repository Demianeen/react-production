import type webpack from 'webpack'
import buildDevServer from './buildDevServer'
import buildLoaders from './buildLoaders'
import buildPlugins from './buildPlugins'
import buildResolvers from './buildResolvers'
import type { BuildOptions } from './types/config'

export default (
  options: BuildOptions
): webpack.Configuration => {
  const { mode, paths, isDev } = options

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    stats: {
      errorDetails: true,
    },
    devtool: isDev && 'eval-cheap-module-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
