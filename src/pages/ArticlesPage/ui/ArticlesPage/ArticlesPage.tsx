import React, { memo, useCallback, useRef } from 'react'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page/ui/Page/Page'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { SortedArticleList } from 'features/SortedArticlesList'
import type { OnOpenArticle } from 'entities/Article'
import { getArticlesPageStartIndex } from 'pages/ArticlesPage/model/selectors/getArticlesPageStartIndex/getArticlesPageStartIndex'
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError'
import { fetchArticlesNextPage } from '../../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
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
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: false,
  })
  const dispatch = useAppDispatch()
  const { t } = useTranslation('articles')

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const startIndex = useSelector(getArticlesPageStartIndex)

  const pageRef = useRef<HTMLDivElement>(null)

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage())
  }, [dispatch])

  const onOpenArticle = useCallback<OnOpenArticle>(
    ({ index }) => {
      dispatch(articlesPageActions.setStartIndex(index))
    },
    [dispatch]
  )

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
    <Page ref={pageRef} className={className}>
      <SortedArticleList
        articles={articles}
        isLoading={isLoading}
        onLoadNextPart={onLoadNextPart}
        scrollParent={pageRef ?? undefined}
        onOpenArticle={onOpenArticle}
        startIndex={startIndex}
      />
    </Page>
  )
}

export default memo(ArticlesPage)
