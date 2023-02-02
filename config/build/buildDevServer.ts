import { BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export default ({ port }: BuildOptions): DevServerConfiguration => ({
  port,
  open: true,
  historyApiFallback: true
});
