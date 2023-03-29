import MiniCSSExtractPlugin from 'mini-css-extract-plugin'

export const buildCssLoader = (isDev: boolean) => ({
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
    // Translates CSS into CommonJS
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: (resolvePath: string) =>
            resolvePath.includes('.module.'),
          localIdentName: isDev
            ? '[path][name]__[local]'
            : '[hash:base64:8]',
        },
      },
    },
    // Compiles Sass to CSS
    'sass-loader',
  ],
})
