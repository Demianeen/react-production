export const buildSvgLoader = () => ({
  test: /\.svg$/,
  exclude: /node_modules/,
  use: [{
    loader: '@svgr/webpack', options: {
      icon: true,
      svgoConfig: {
        plugins: [
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          }
        ]
      }
    }
  }],
})
