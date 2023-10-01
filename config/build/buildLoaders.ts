import type webpack from 'webpack'
import type { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export default (
  buildOptions: BuildOptions
): webpack.RuleSetRule[] => {
  const svgLoader = buildSvgLoader()

  const codeLoader = buildBabelLoader({
    ...buildOptions,
    isTsx: false,
  })
  const tsxLoader = buildBabelLoader({
    ...buildOptions,
    isTsx: true,
  })

  const cssLoader = buildCssLoader(buildOptions.isDev, buildOptions.paths.src)

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    type: 'asset/resource',
  }

  return [
    fileLoader,
    svgLoader,
    codeLoader,
    tsxLoader,
    cssLoader,
  ]
}
