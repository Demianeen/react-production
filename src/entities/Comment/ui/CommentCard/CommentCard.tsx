import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Text } from '@/shared/ui/deprecated/Text'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { HStack } from '@/shared/ui/deprecated/Stack'
import { routes } from '@/shared/lib/router/routes'
import type { TestProps } from '@/shared/types/tests'
import styles from './CommentCard.module.scss'
import type { Comment } from '../../model/types/comment'

interface CommentCardProps extends TestProps {
  className?: string
  comment: Comment
}

export const CommentCard = memo(
  ({
    className,
    comment,
    'data-testid': testId,
  }: CommentCardProps) => {
    return (
      <article
        className={classNames(styles.commentCard, {}, [className])}
        data-testid={testId}
      >
        <header>
          <HStack
            as={AppLink}
            to={routes.profile({
              id: String(comment.user.id),
            })}
            className={styles.header}
          >
            {comment.user.avatar && (
              <Avatar
                size='2rem'
                src={comment.user.avatar}
                className={styles.avatar}
              />
            )}
            <Text
              className={styles.username}
              text={comment.user.username}
            />
          </HStack>
        </header>
        <Text text={comment.body} />
      </article>
    )
  }
)

CommentCard.displayName = 'CommentCard'
