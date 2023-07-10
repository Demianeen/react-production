import type { FC } from 'react'
import { lazy } from 'react'
import type { CommentFormDeprecatedProps } from './CommentFormDeprecated/CommentFormDeprecated'

export const CommentFormAsync = lazy<FC<CommentFormDeprecatedProps>>(
  () => import('./CommentForm')
)
