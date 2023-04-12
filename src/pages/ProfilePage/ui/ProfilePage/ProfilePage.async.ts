import { lazy } from 'react'

export const ProfilePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(
        // @ts-expect-error it is just for the purpose of the course
        // eslint-disable-next-line import/no-cycle
        () => resolve(import('./ProfilePage')),
        1000
      )
    })
)
