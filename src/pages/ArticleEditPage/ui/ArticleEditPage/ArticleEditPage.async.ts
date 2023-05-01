import { lazy } from 'react'

export const ArticleEditPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(
        // @ts-expect-error it is just for the purpose of the course
        () => resolve(import('./ArticleEditPage')),
        1000
      )
    })
)
