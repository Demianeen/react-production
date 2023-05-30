import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { RoutePath } from '@/shared/const/routePath'
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import { getArticleDetailsCanEdit } from '../../model/selectors/getArticleDetailsCanEdit/getArticleDetailsCanEdit'

interface ArticleDetailsHeaderProps {
  className?: string
  id: number
}

export const ArticleDetailsHeader = memo(
  ({ className, id }: ArticleDetailsHeaderProps) => {
    const { t } = useTranslation('article-details')
    const canEdit = useSelector(getArticleDetailsCanEdit)
    const error = useSelector(getArticleDetailsError)

    return (
      <HStack
        justify='between'
        className={className}
        as='header'
      >
        <Button as={AppLink} to={RoutePath.articles}>
          {t('Back to list')}
        </Button>
        {canEdit && error === undefined && (
          <Button
            as={AppLink}
            to={`${RoutePath.article_details + id}/edit`}
          >
            {t('Edit')}
          </Button>
        )}
      </HStack>
    )
  }
)

ArticleDetailsHeader.displayName = 'ArticleDetailsHeader'
