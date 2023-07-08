import type { Article } from '@/entities/Article'
import { EditArticle } from '@/features/EditArticle'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
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
          className
        )}
      >
        <HStack gap={0.5}>
          <Avatar src={user.avatar} user={user} />
          {createdAt}
        </HStack>
        <EditArticle id={id} />
        {t('views', { count: views })}
      </VStack>
    )
  }
)

ArticleAdditionalInfo.displayName = 'ArticleAdditionalInfo'
