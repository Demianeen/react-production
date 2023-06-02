export const buildSvgLoader = () => ({
  test: /\.svg$/,
  exclude: /node_modules/,
  use: ['@svgr/webpack'],
})
