import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import {
  useArticleDetailsCanEdit,
  useGetArticleDetailsQuery,
} from '@/entities/Article'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Text } from '@/shared/ui/deprecated/Text'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'
import { useConfirmBeforeLeave } from '@/shared/lib/hooks/useConfirmBeforeLeave/useConfirmBeforeLeave'
import { CreateArticleSkeleton } from '../CreateArticle/CreateArticleSkeleton'
import { CreateArticle } from '../CreateArticle/CreateArticle'

interface CreateArticlePageProps {
  className?: string
}

// TODO: add create edit page functionality
const CreateArticlePage = ({ className }: CreateArticlePageProps) => {
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
  const cannotEdit = isEdit && !canEdit && isSuccess

  useConfirmBeforeLeave(cannotEdit)

  if (isLoading) {
    return (
      <Page>
        <CreateArticleSkeleton />
      </Page>
    )
  }

  if (cannotEdit) {
    return (
      <Page>
        <Text title={t('You cannot edit this article')} />
      </Page>
    )
  }

  const titleText = isEdit
    ? t('Edit article')
    : t('Create new article')

  return (
    <Page
      className={className}
      data-testid='CreateArticlePage'
      id='createArticlePage'
    >
      <ToggleFeature
        name='isAppRedesigned'
        on={<Title>{titleText}</Title>}
        off={<Text title={titleText} />}
      />
      <CreateArticle editArticle={article} />
    </Page>
  )
}

export default memo(CreateArticlePage)
