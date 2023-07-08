import { memo } from 'react'
import {
  getArticleDetailsCanEdit,
  getArticleDetailsError,
} from '@/entities/Article'
import { ToggleFeature } from '@/shared/lib/features'
import { routes } from '@/shared/lib/router/routes'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/redesigned/Button'
import type { EntityId } from '@reduxjs/toolkit'

interface EditArticleProps {
  className?: string
  id: EntityId
}

export const EditArticle = memo(
  ({ className, id }: EditArticleProps) => {
    const { t } = useTranslation('article-details')
    const canEdit = useSelector(getArticleDetailsCanEdit)
    const error = useSelector(getArticleDetailsError)

    if (!canEdit || error !== undefined) {
      return null
    }

    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Button
            as={AppLink}
            to={routes.articleEdit({ id: String(id) })}
            className={className}
          >
            {t('Edit')}
          </Button>
        }
        off={
          <ButtonDeprecated
            as={AppLink}
            to={routes.articleEdit({ id: String(id) })}
            className={className}
          >
            {t('Edit')}
          </ButtonDeprecated>
        }
      />
    )
  }
)

EditArticle.displayName = 'EditArticle'
