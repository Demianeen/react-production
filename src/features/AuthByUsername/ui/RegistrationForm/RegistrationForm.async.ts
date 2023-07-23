import { lazy } from 'react'

export const RegistrationFormAsync = lazy(
  () => import('./RegistrationForm')
)
