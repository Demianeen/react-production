import React, { memo, useCallback } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page/ui/Page/Page'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { SortedArticleList } from 'features/SortedArticlesList'
import { getArticlesPageLimit } from '../../model/selectors/getArticlesPageLimit/getArticlesPageLimit'
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError'
import { fetchArticlesNextPage } from '../../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import {
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
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: false,
  })
  const dispatch = useAppDispatch()
  const { t } = useTranslation('articles')

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const limit = useSelector(getArticlesPageLimit)

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage())
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
      <SortedArticleList
        articles={articles}
        isLoading={isLoading}
        limit={limit}
      />
    </Page>
  )
}

export default memo(ArticlesPage)
