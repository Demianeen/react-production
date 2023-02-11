import { BuildOptions } from './types/config';
import { ResolveOptions } from "webpack";

export default (options: BuildOptions): ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
  preferAbsolute: true,
  modules: [options.paths.src, 'node_modules'],
  mainFiles: ['index'],
  alias: {}
})
