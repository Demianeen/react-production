import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useCallback, type FormEvent, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import {
  commentFormActions,
  commentFormReducer,
} from '../model/slice/commentFormSlice'
import { getCommentFormBody } from '../model/selectors/getCommentFormBody/getCommentFormBody'

export type OnSendComment = (body: string) => void

const reducers: AsyncReducersList = {
  commentForm: commentFormReducer,
}

export type UseCommentFormReturnBind = {
  onCommentBodyChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export type UseCommentFormReturnType = [
  string,
  UseCommentFormReturnBind
]

export const useCommentForm = (
  onSendComment: OnSendComment
): UseCommentFormReturnType => {
  useDynamicModuleLoader(reducers)

  const dispatch = useAppDispatch()
  const commentBody = useSelector(getCommentFormBody)

  const onCommentBodyChange = useCallback(
    (value: string) => {
      dispatch(commentFormActions.setBody(value))
    },
    [dispatch]
  )

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onSendComment(commentBody)

      // clear form
      dispatch(commentFormActions.setBody(''))
    },
    [commentBody, dispatch, onSendComment]
  )

  return useMemo(
    () => [
      commentBody,
      {
        onCommentBodyChange,
        onSubmit,
      },
    ],
    [commentBody, onCommentBodyChange, onSubmit]
  )
}
