import React, { memo, useCallback } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useSelector } from 'react-redux'
import { CommentList } from 'entities/Comment'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/AddCommentForm'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { ArticleList } from 'entities/Article'
import { View } from 'entities/View'
import { articleDetailsFooterReducer } from '../../model/slice'
import { getArticleRecommendations } from '../../model/slice/articleDetailsRecommendationsSlice'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { sendArticleComment } from '../../model/services/sendArticleComment/sendArticleComment'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentListIsLoading } from '../../model/selectors/getArticleCommentListIsLoading/getArticleCommentListIsLoading'
import { getArticleDetailsRecommendationsIsLoading } from '../../model/selectors/recommendations/getArticleDetailsRecommendationsIsLoading/getArticleDetailsRecommendationsIsLoading'
import { getArticleCommentList } from '../../model/slice/articleCommentListSlice'
import styles from './ArticleCommentList.module.scss'

export interface ArticleCommentListProps {
  className?: string
  articleId: number
}

const reducers: ReducersList = {
  articleDetailsFooter: articleDetailsFooterReducer,
}

export const ArticleCommentList = memo(
  ({ className, articleId }: ArticleCommentListProps) => {
    useDynamicModuleLoader(reducers)
    const { t } = useTranslation('article-details')

    const comments = useSelector(
      getArticleCommentList.selectAll
    )
    const isLoading = useSelector(
      getArticleCommentListIsLoading
    )
    const dispatch = useAppDispatch()

    const onSendComment = useCallback(
      (commentBody: string) => {
        dispatch(sendArticleComment(commentBody))
      },
      [dispatch]
    )

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(articleId))
      dispatch(fetchArticleRecommendations())
    })

    const recommendations = useSelector(
      getArticleRecommendations.selectAll
    )
    const isRecommendationsLoading = useSelector(
      getArticleDetailsRecommendationsIsLoading
    )

    return (
      <>
        <Text
          title={t('Recommend next')}
          className={styles.sectionTitle}
        />
        <ArticleList
          articles={recommendations}
          isLoading={isRecommendationsLoading}
          className={styles.recommendations}
          target='_blank'
          limit={4}
          view={View.GRID}
        />
        {/* we pass onSendComment here to make addCommentForm independent feature that can be used elsewhere. */}
        <Text
          title={t('Comments')}
          className={styles.sectionTitle}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          className={className}
          comments={comments}
          isLoading={isLoading}
        />
      </>
    )
  }
)

ArticleCommentList.displayName = 'ArticleCommentList'
