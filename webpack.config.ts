import path from 'path'
import type {
  BuildEnv,
  BuildMode,
  BuildOptions,
  BuildPath,
} from './config/build/types/config'
import buildWebpackConfig from './config/build/buildWebpackConfig'

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
  if (apiUrl) {
    return apiUrl
  }

  if (mode === 'production') {
    return '/api'
  }

  return 'http://localhost:8000'
}

export default (env?: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  }

  const mode: BuildOptions['mode'] = env?.mode ?? 'development'
  const PORT = env?.port ?? 3000
  const apiURL = getApiUrl(mode, env?.apiUrl)
  const isAnalyze = env?.analyze ?? false

  const isDev = mode === 'development'

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    isAnalyze,
    port: PORT,
    apiURL,
    project: 'frontend',
  })
}
