import React, { memo } from 'react'
import { Page } from 'widgets/Page'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ArticleEditPageProps {
  className?: string
}

// TODO: add create edit page functionality
const ArticleEditPage = ({
  className,
}: ArticleEditPageProps) => {
  const { t } = useTranslation('article-edit')
  const { id } = useParams()
  const isEdit = Boolean(id)

  return (
    <Page className={className}>
      {isEdit ? t('Edit article') : t('Create new article')}
    </Page>
  )
}

export default memo(ArticleEditPage)
