import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/deprecated/Button'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { routes } from '@/shared/lib/router/routes'
import { EditArticle } from '@/features/EditArticle'

interface ArticleDetailsPageHeaderProps {
  className?: string
  id: number
}

export const ArticleDetailsPageHeader = memo(
  ({ className, id }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('article-details')

    return (
      <HStack
        justify='between'
        className={className}
        as='header'
        maxWidth
      >
        <Button as={AppLink} to={routes.articles()}>
          {t('Back to list')}
        </Button>
        <EditArticle id={id} />
      </HStack>
    )
  }
)

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader'
