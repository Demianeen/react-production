import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/redesigned/Input'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'
import SendIcon from '@/shared/assets/icons/redesigned/send.svg'
import type { OnSendComment } from '../../../lib/useCommentForm'
import { useCommentForm } from '../../../lib/useCommentForm'

export interface CommentFormRedesignedProps {
  className?: string
  onSendComment: OnSendComment
}

export const CommentFormRedesigned = ({
  className,
  onSendComment,
}: CommentFormRedesignedProps) => {
  const { t } = useTranslation('article-details')
  const [commentBody, { onCommentBodyChange, onSubmit }] =
    useCommentForm(onSendComment)

  return (
    <HStack
      as='form'
      className={className}
      onSubmit={onSubmit}
      align='center'
      gap={1}
      maxWidth
      data-testid='CommentForm'
    >
      <Input
        direction='row'
        placeholder={t('Add new comment')}
        value={commentBody}
        onChange={onCommentBodyChange}
        maxWidth
        data-testid='CommentForm.Input'
        required
      />
      <Icon
        Svg={SendIcon}
        data-testid='CommentForm.SubmitButton'
        clickable
        tooltipText='Send'
        buttonProps={{
          type: 'submit',
          noBorderRadius: true,
        }}
      />
    </HStack>
  )
}

export default memo(CommentFormRedesigned)
