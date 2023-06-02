import type { BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderArgs extends BuildOptions {
  isTsx?: boolean
}

export const buildBabelLoader = ({
  isDev,
  isTsx,
}: BuildBabelLoaderArgs) => ({
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
      plugins: [
        '@babel/plugin-transform-runtime',
        isTsx &&
          !isDev && [
            babelRemovePropsPlugin(),
            {
              props: ['data-testid'],
            },
          ],
        isDev && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    },
  },
})
