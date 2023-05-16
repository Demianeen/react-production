import type { FormEvent } from 'react'
import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { HStack } from 'shared/ui/Stack'
import {
  commentFormActions,
  commentFormReducer,
} from '../../model/slice/commentFormSlice'
import { getCommentFormBody } from '../../model/selectors/getCommentFormBody/getCommentFormBody'
import styles from './CommentForm.module.scss'

export interface CommentFormProps {
  className?: string
  onSendComment: (body: string) => void
}

const reducers: ReducersList = {
  commentForm: commentFormReducer,
}

const CommentForm = ({
  className,
  onSendComment,
}: CommentFormProps) => {
  useDynamicModuleLoader(reducers)
  const { t } = useTranslation('article-details')

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

  return (
    <HStack
      as='form'
      className={classNames(styles.commentForm, {}, [
        className,
      ])}
      onSubmit={onSubmit}
      align='end'
      gap={1}
      maxWidth
    >
      <Input
        label={t('Add new comment')}
        placeholder={t('Comment body')}
        value={commentBody}
        onChange={onCommentBodyChange}
        className={styles.input}
        wrapperClassName={styles.inputWrapper}
        maxWidth
      />
      <Button type='submit'>{t('Send')}</Button>
    </HStack>
  )
}

export default memo(CommentForm)
