import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { RoutePath } from '@/shared/const/routePath'
import styles from './CommentCard.module.scss'
import type { Comment } from '../../model/types/comment'

interface CommentCardProps {
  className?: string
  comment: Comment
}

export const CommentCard = memo(
  ({ className, comment }: CommentCardProps) => {
    return (
      <article
        className={classNames(styles.commentCard, {}, [
          className,
        ])}
      >
        <header>
          <HStack
            as={AppLink}
            to={`${RoutePath.profile}${comment.user.id}`}
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
