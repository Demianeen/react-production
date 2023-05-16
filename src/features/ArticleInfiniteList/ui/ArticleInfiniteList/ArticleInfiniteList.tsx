import type {
  HTMLAttributeAnchorTarget,
  RefObject,
} from 'react'
import React, { useCallback } from 'react'
import type { OnOpenArticle } from 'entities/Article'
import { VirtualizedArticleList } from 'entities/Article'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { PageError } from 'widgets/PageError'
import { initArticleInfiniteList } from '../../model/services/initArticleInfiniteList/initArticleInfiniteList'
import { getArticleInfiniteListView } from '../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { ArticleInfiniteListFilters } from '../ArticleInfiniteListFilters/ArticleInfiniteListFilters'
import { getArticleInfiniteListStartIndex } from '../../model/selectors/getArticleInfiniteListStartIndex/getArticleInfiniteListStartIndex'
import { getArticleInfiniteListIsLoading } from '../../model/selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'
import { getArticleInfiniteListError } from '../../model/selectors/getArticleInfiniteListError/getArticleInfiniteListError'
import {
  articleInfiniteListActions,
  articleInfiniteListReducer,
  getArticles,
} from '../../model/slice/articleInfiniteListSlice'
import { fetchArticlesNextPage } from '../../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { INITIAL_ARTICLE_VIEW } from '../../model/const/view'

interface ArticleInfiniteListProps {
  className?: string
  scrollParentRef?: RefObject<HTMLElement>
  target?: HTMLAttributeAnchorTarget
}

const reducers: ReducersList = {
  articleInfiniteList: articleInfiniteListReducer,
}

export const ArticleInfiniteList = ({
  className,
  scrollParentRef,
  target,
}: ArticleInfiniteListProps) => {
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: false,
  })

  const { t } = useTranslation('articles')
  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(
    getArticleInfiniteListIsLoading
  )
  const error = useSelector(getArticleInfiniteListError)
  const startIndex = useSelector(
    getArticleInfiniteListStartIndex
  )
  const view = useSelector(getArticleInfiniteListView)

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage())
  }, [dispatch])

  const onOpenArticle = useCallback<OnOpenArticle>(
    ({ index }) => {
      dispatch(
        articleInfiniteListActions.setStartIndex(index)
      )
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(initArticleInfiniteList())
  })

  if (error) {
    return <PageError text={t('Failed to load articles')} />
  }

  return (
    <VirtualizedArticleList
      articles={articles}
      isLoading={isLoading}
      view={view}
      className={className}
      skeletonsLimit={view === INITIAL_ARTICLE_VIEW ? 8 : 1}
      onLoadNextPart={onLoadNextPart}
      scrollParentRef={scrollParentRef}
      Header={ArticleInfiniteListFilters}
      startIndex={startIndex}
      onOpenArticle={onOpenArticle}
      target={target}
    />
  )
}
