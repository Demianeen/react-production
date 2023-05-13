import React, { memo } from 'react'
import { Button } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HStack } from 'shared/ui/Stack'
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig'
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
          <AppLink
            to={`${RoutePath.article_details + id}/edit`}
          >
            <Button type='button'>{t('Edit')}</Button>
          </AppLink>
        )}
      </HStack>
    )
  }
)

ArticleDetailsHeader.displayName = 'ArticleDetailsHeader'
