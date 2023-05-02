import webpack from 'webpack'
import path from 'path'
import type { BuildPath } from '../build/types/config'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'

export default ({
  config,
}: {
  config: webpack.Configuration
}) => {
  const paths: BuildPath = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  }
  config.resolve?.modules?.push(paths.src)
  config.resolve?.extensions?.push('.ts', '.tsx')

  config.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify(''),
      __PROJECT__: JSON.stringify('storybook'),
    })
  )

  if (!config.module)
    throw new Error('config.module not found')

  // because we modify storybook configuration
  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module?.rules?.map(
    (rule) => {
      if (rule === '...') return rule

      const isSvgLoader = rule.test
        ?.toString()
        .includes('svg')
      if (!isSvgLoader) return rule

      return { ...rule, exclude: /.svg$/i }
    }
  )

  config.module?.rules?.push(buildSvgLoader())

  config.module?.rules?.push(buildCssLoader(true))

  return config
}
