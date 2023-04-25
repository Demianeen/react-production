import React, { memo, useCallback } from 'react'
import type { ArticleView } from 'entities/Article'
import {
  ArticleList,
  ArticleSelectView,
} from 'entities/Article'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticles } from 'pages/ArticlesPage/model/services/fetchArticles/fetchArticles'
import { useSelector } from 'react-redux'
import { getArticlesPageIsLoading } from 'pages/ArticlesPage/model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'
import { getArticlesPageError } from 'pages/ArticlesPage/model/selectors/getArticlesPageError/getArticlesPageError'
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/getArticlesPageView/getArticlesPageView'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slice/articlesPageSlice'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  useDynamicModuleLoader(reducers)
  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    dispatch(fetchArticles())
    dispatch(articlesPageActions.initView())
  })

  return (
    <div className={className}>
      <ArticleSelectView
        selectedView={view}
        onChangeView={onChangeView}
      />
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </div>
  )
}

export default memo(ArticlesPage)
