import { lazy } from 'react'

export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(
        // @ts-expect-error it is just for the purpose of the course
        () => resolve(import('./ArticlesPage')),
        1000
      )
    })
)
