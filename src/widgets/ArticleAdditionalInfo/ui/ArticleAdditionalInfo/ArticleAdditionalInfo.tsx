import type { Article } from '@/entities/Article'
import { EditArticle } from '@/features/EditArticle'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { getDateText } from '@/shared/lib/getDateText/getDateText'
import styles from './ArticleAdditionalInfo.module.scss'

interface ArticleAdditionalInfoProps {
  className?: string
  id: number
  article: Article
}

export const ArticleAdditionalInfo = memo(
  ({ className, id, article }: ArticleAdditionalInfoProps) => {
    const { user, views, createdAt } = article
    const { t } = useTranslation('article-details')
    return (
      <VStack
        gap={2}
        className={classNamesNew(
          styles.articleAdditionalInfo,
          className,
        )}
        data-testid='ArticleAdditionalInfo'
      >
        <HStack gap={0.5}>
          <Avatar src={user.avatar} user={user} />
          <span data-testid='ArticleAdditionalInfo.CreatedAt'>
            {getDateText(new Date(createdAt))}
          </span>
        </HStack>
        <EditArticle id={id} authorId={article.user.id} />
        <span data-testid='ArticleAdditionalInfo.Views'>
          {t('views', { count: views })}
        </span>
      </VStack>
    )
  },
)

ArticleAdditionalInfo.displayName = 'ArticleAdditionalInfo'
