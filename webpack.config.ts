import path from 'path'
import type {
  BuildEnv,
  BuildOptions,
  BuildPath,
} from './config/build/types/config'
import buildWebpackConfig from './config/build/buildWebpackConfig'

export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode: BuildOptions['mode'] =
    env.mode ?? 'development'
  const PORT = env.port ?? 3000
  const apiURL = env.apiURL ?? 'http://localhost:8000'

  const isDev = mode === 'development'

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiURL,
    project: 'frontend',
  })
}
