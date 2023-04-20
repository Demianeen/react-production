import React, { memo } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useSelector } from 'react-redux'
import { CommentList } from 'entities/Comment'
import { getArticleCommentListIsLoading } from 'features/ArticleCommentList/model/selectors/getArticleCommentListIsLoading/getArticleCommentListIsLoading'
import { getArticleCommentListError } from 'features/ArticleCommentList/model/selectors/getArticleCommentListError/getArticleCommentListError'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from 'features/ArticleCommentList/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  articleCommentListReducer,
  getArticleCommentList,
} from '../../model/slice/articleCommentListSlice'

export interface ArticleCommentListProps {
  className?: string
  articleId: number
}

const reducers: ReducersList = {
  articleCommentList: articleCommentListReducer,
}

export const ArticleCommentList = memo(
  ({ className, articleId }: ArticleCommentListProps) => {
    useDynamicModuleLoader(reducers)
    const comments = useSelector(
      getArticleCommentList.selectAll
    )
    const isLoading = useSelector(
      getArticleCommentListIsLoading
    )
    const error = useSelector(getArticleCommentListError)
    const dispatch = useAppDispatch()

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(articleId))
    })

    return (
      <CommentList
        className={className}
        comments={comments}
        isLoading={isLoading}
      />
    )
  }
)

ArticleCommentList.displayName = 'ArticleCommentList'
