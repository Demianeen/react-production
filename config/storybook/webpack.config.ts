/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import webpack from 'webpack'
import path from 'path'
import type { BuildPath } from '../build/types/config'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPath = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  }

  if (!config.resolve) config.resolve = {}
  if (!config.resolve.extensions) config.resolve.extensions = []
  if (!config.resolve.modules) config.resolve.modules = []

  config.resolve.modules.push(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': paths.src,
  }

  if (!config.plugins) config.plugins = []

  config.plugins.push(
    new webpack.DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify(''),
      __PROJECT__: JSON.stringify('storybook'),
    })
  )

  if (!config.module) config.module = { rules: [] }

  // exclude svg from default webpack config
  config.module.rules = config.module?.rules?.map((rule) => {
    if (rule === '...') return rule

    const isSvgLoader = rule.test?.toString().includes('svg')
    if (!isSvgLoader) return rule

    return { ...rule, exclude: /.svg$/i }
  })

  config.module?.rules?.push(buildSvgLoader(), buildCssLoader(true))

  return config
}
