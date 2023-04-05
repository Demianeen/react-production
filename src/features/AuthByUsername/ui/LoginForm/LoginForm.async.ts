import { lazy } from 'react'

export const LoginFormAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error it is just for the purpose of the course
      setTimeout(() => resolve(import('./LoginForm')), 1000)
    })
)
