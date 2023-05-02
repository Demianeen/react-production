import type { FC } from 'react'
import { lazy } from 'react'
import type { AddCommentFormProps } from './AddCommentForm'

export const AddCommentFormAsync = lazy<
  FC<AddCommentFormProps>
>(() => import('./AddCommentForm'))
