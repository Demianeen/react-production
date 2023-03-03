import { lazy } from 'react'

export const HomePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error it is just for the purpose of the course
      setTimeout(() => resolve(import('./HomePage')), 1000)
    })
)
