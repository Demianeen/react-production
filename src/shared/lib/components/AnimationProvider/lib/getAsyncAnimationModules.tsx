export const getAsyncAnimationModules = () => {
  return Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react'),
  ])
}
