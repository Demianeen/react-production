export const getApp = () => {
  const app = document.getElementById('app')

  if (app === null) {
    console.warn('App is not found')
  }

  return app
}
