import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getArticleDetailsError } from 'entities/Article/model/selectors/getArticleDetailsError/getArticleDetailsError'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { getArticleDetailsCanEdit } from '../../model/selectors/getArticleDetailsCanEdit/getArticleDetailsCanEdit'
import styles from './ArticleDetailsHeader.module.scss'

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
      <header
        className={classNames(
          styles.articleDetailsHeader,
          {},
          [className]
        )}
      >
        {/* FIXME: Button inside link */}
        <AppLink to={RoutePath.articles}>
          <Button type='button'>{t('Back to list')}</Button>
        </AppLink>
        {canEdit && error === undefined && (
          <AppLink
            to={`${RoutePath.article_details + id}/edit`}
            className={styles.editBtn}
          >
            <Button type='button'>{t('Edit')}</Button>
          </AppLink>
        )}
      </header>
    )
  }
)

ArticleDetailsHeader.displayName = 'ArticleDetailsHeader'
