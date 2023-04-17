import { lazy } from 'react'

export const ArticleDetailsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(
        // @ts-expect-error it is just for the purpose of the course
        () => resolve(import('./ArticleDetailsPage')),
        1000
      )
    })
)
