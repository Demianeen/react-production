import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types/config'

export default ({
  port,
}: BuildOptions): DevServerConfiguration => ({
  port,
  open: true,
  historyApiFallback: true,
  hot: true,
})
