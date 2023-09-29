import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import {
  CreateArticle,
  CreateArticleSkeleton,
} from '@/widgets/CreateArticle'
import {
  useArticleDetailsCanEdit,
  useGetArticleDetailsQuery,
} from '@/entities/Article'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Text } from '@/shared/ui/deprecated/Text'

interface ArticleEditPageProps {
  className?: string
}

// TODO: add create edit page functionality
const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('article-edit')
  const { id } = useParams()
  const isEdit = Boolean(id)

  const numberId = Number(id)

  const {
    data: article,
    isLoading,
    isSuccess,
  } = useGetArticleDetailsQuery(numberId ?? skipToken)
  const canEdit = useArticleDetailsCanEdit(article?.user.id)

  if (isLoading) {
    return (
      <Page>
        <CreateArticleSkeleton />
      </Page>
    )
  }

  if (isEdit && !canEdit && isSuccess) {
    return (
      <Page>
        <Text title={t('You cannot edit this article')} />
      </Page>
    )
  }

  return (
    <Page
      className={className}
      data-testid='ArticleEditPage'
      id='articleEditPage'
    >
      {isEdit ? t('Edit article') : t('Create new article')}
      <CreateArticle editArticle={article} />
    </Page>
  )
}

export default memo(ArticleEditPage)
