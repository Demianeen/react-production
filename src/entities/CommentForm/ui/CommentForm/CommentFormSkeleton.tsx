import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { HStack } from 'shared/ui/Stack'
import { InputSkeleton } from 'shared/ui/Input/InputSkeleton'
import { ButtonSkeleton } from 'shared/ui/Button/ButtonSkeleton'
import styles from './CommentForm.module.scss'

export interface CommentFormSkeletonProps {
  className?: string
}

export const CommentFormSkeleton = ({
  className,
}: CommentFormSkeletonProps) => {
  return (
    <HStack
      className={classNames(styles.commentForm, {}, [
        className,
        styles.skeleton,
      ])}
      align='end'
      gap={1}
      maxWidth
    >
      <InputSkeleton maxWidth />
      <ButtonSkeleton />
    </HStack>
  )
}

export default memo(CommentFormSkeleton)