import path from "path";
import webpack from "webpack"
import buildDevServer from "./buildDevServer";
import buildLoaders from "./buildLoaders";
import buildPlugins from "./buildPlugins";
import buildResolvers from "./buildResolvers";
import { BuildOptions } from "./types/config"

export default (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(paths.html),
    stats: {
      errorDetails: true
    },
    devtool: 'inline-source-map',
    devServer: buildDevServer(options)
  };
}
