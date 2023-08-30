import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { CreateArticle } from '@/widgets/CreateArticle'

interface ArticleEditPageProps {
  className?: string
}

// TODO: add create edit page functionality
const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('article-edit')
  const { id } = useParams()
  const isEdit = Boolean(id)

  return (
    <Page
      className={className}
      data-testid='ArticleEditPage'
      id='articleEditPage'
    >
      {isEdit ? t('Edit article') : t('Create new article')}
      <CreateArticle />
    </Page>
  )
}

export default memo(ArticleEditPage)
