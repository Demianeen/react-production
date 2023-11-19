import type { PluginItem } from '@babel/core'
import type { BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderArgs extends BuildOptions {
  isTsx?: boolean
}

const buildPlugins = ({ isDev, isTsx }: BuildBabelLoaderArgs) => {
  const plugins: PluginItem[] = ['@babel/plugin-transform-runtime']
  const isProd = !isDev

  if (isDev) {
    if (isTsx) {
      plugins.push([
        babelRemovePropsPlugin(),
        {
          props: ['data-testid'],
        },
      ])
    }
  }

  if (isProd) {
    if (isTsx) {
      plugins.push([require.resolve('react-refresh/babel')])
    }
  }

  return plugins
}

export const buildBabelLoader = (options: BuildBabelLoaderArgs) => {
  const { isTsx, isDev } = options
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          '@babel/preset-env',
          [
            '@babel/preset-typescript',
            {
              isTSX: isTsx,
              allExtensions: true,
            },
          ],
          [
            '@babel/preset-react',
            {
              development: isDev,
              runtime: 'automatic',
            },
          ],
        ],
        plugins: buildPlugins(options)
      },
    },
  }
}
