export const buildBabelLoader = (isDev: boolean) => ({
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
        isDev && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    },
  },
})
