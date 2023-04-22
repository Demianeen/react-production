import type { FC } from 'react'
import { lazy } from 'react'
import type { AddCommentFormProps } from './AddCommentForm'

export const AddCommentFormAsync = lazy<
  FC<AddCommentFormProps>
>(
  () =>
    new Promise((resolve) => {
      setTimeout(
        () => resolve(import('./AddCommentForm')),
        // it is just for the purpose of the course
        1000
      )
    })
)
