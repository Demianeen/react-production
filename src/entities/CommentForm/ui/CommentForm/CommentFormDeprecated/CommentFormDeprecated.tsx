import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/deprecated/Input'
import { Button } from '@/shared/ui/deprecated/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { OnSendComment } from '../../../lib/useCommentForm'
import { useCommentForm } from '../../../lib/useCommentForm'
import styles from './CommentForm.module.scss'

export interface CommentFormDeprecatedProps {
  className?: string
  onSendComment: OnSendComment
}

export const CommentFormDeprecated = ({
  className,
  onSendComment,
}: CommentFormDeprecatedProps) => {
  const { t } = useTranslation('article-details')
  const [commentBody, { onCommentBodyChange, onSubmit }] =
    useCommentForm(onSendComment)

  return (
    <HStack
      as='form'
      className={classNames(styles.commentForm, {}, [className])}
      onSubmit={onSubmit}
      align='end'
      gap={1}
      maxWidth
      data-testid='CommentForm'
    >
      <Input
        label={t('Add new comment')}
        placeholder={t('Comment body')}
        value={commentBody}
        onChange={onCommentBodyChange}
        className={styles.input}
        maxWidth
        data-testid='CommentForm.Input'
        required
      />
      <Button type='submit' data-testid='CommentForm.SubmitButton'>
        {t('Send')}
      </Button>
    </HStack>
  )
}

export default memo(CommentFormDeprecated)
