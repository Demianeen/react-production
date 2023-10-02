export const getApp = () => {
  const app = document.getElementById('app')

  if (app === null) {
    // eslint-disable-next-line no-console
    console.warn('App is not found')
  }

  return app
}
