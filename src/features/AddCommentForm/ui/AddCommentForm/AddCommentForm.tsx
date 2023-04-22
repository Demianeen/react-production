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
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice'
import { getAddCommentFormBody } from '../../model/selectors/getAddCommentFormBody/getAddCommentFormBody'
import styles from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (body: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = ({
  className,
  onSendComment,
}: AddCommentFormProps) => {
  useDynamicModuleLoader(reducers)
  const { t } = useTranslation('article-details')

  const dispatch = useAppDispatch()
  const commentBody = useSelector(getAddCommentFormBody)

  const onCommentBodyChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setBody(value))
    },
    [dispatch]
  )

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onSendComment(commentBody)

      // clear form
      dispatch(addCommentFormActions.setBody(''))
    },
    [commentBody, dispatch, onSendComment]
  )

  return (
    <form
      className={classNames(styles.addCommentForm, {}, [
        className,
      ])}
      onSubmit={onSubmit}
    >
      <Input
        label={t('Add new comment')}
        placeholder={t('Comment body')}
        value={commentBody}
        onChange={onCommentBodyChange}
        className={styles.input}
        wrapperClassName={styles.inputWrapper}
      />
      <Button type='submit'>{t('Send')}</Button>
    </form>
  )
}

export default memo(AddCommentForm)
