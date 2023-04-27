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
import { Page } from 'shared/ui/Page/Page'
import { fetchArticlesNextPage } from 'pages/ArticlesPage/model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign } from 'shared/ui/Text/Text'
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
  const { t } = useTranslation('articles')

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

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticles())
  })

  if (error) {
    return (
      <Page>
        <Text
          title={t('Failed to load articles')}
          align={TextAlign.CENTER}
        />
      </Page>
    )
  }

  return (
    <Page
      className={className}
      onScrollEnd={onLoadNextPart}
    >
      <ArticleSelectView
        selectedView={view}
        onChangeView={onChangeView}
      />
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </Page>
  )
}

export default memo(ArticlesPage)
