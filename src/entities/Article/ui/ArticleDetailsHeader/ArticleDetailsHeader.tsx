import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { routes } from '@/shared/lib/router/routes'
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
        <Button as={AppLink} to={routes.articles()}>
          {t('Back to list')}
        </Button>
        {canEdit && error === undefined && (
          <Button
            as={AppLink}
            to={routes.articleEdit({ id: String(id) })}
          >
            {t('Edit')}
          </Button>
        )}
      </HStack>
    )
  }
)

ArticleDetailsHeader.displayName = 'ArticleDetailsHeader'
