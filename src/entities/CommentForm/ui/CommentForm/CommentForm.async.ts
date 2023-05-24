import type { FC } from 'react'
import { lazy } from 'react'
import type { CommentFormProps } from './CommentForm'

export const CommentFormAsync = lazy<FC<CommentFormProps>>(
  () => import('./CommentForm')
)
