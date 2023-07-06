import type { HTMLAttributeAnchorTarget } from 'react'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { OnOpenArticle } from '@/entities/Article'
import { VirtualizedArticleList } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { ArticleFiltersContainer } from '../../ArticleFiltersContainer/ArticleFiltersContainer'
import { ArticleViewSelectorContainer } from '../../ArticleViewSelectorContainer/ArticleViewSelectorContainer'
import { initArticleInfiniteList } from '../../../model/services/initArticleInfiniteList/initArticleInfiniteList'
import { INITIAL_ARTICLE_VIEW } from '../../../model/const/view'
import { getArticleInfiniteListError } from '../../../model/selectors/getArticleInfiniteListError/getArticleInfiniteListError'
import { getArticleInfiniteListIsLoading } from '../../../model/selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'
import { getArticleInfiniteListStartIndex } from '../../../model/selectors/getArticleInfiniteListStartIndex/getArticleInfiniteListStartIndex'
import { getArticleInfiniteListView } from '../../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { fetchArticlesNextPage } from '../../../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import {
  getArticles,
  articleInfiniteListActions,
} from '../../../model/slice/articleInfiniteListSlice'
import { articleInfiniteListReducer } from '../../../testing'
import styles from './ArticleInfiniteListRedesigned.module.scss'

export interface ArticleInfiniteListRedesignedProps {
  className?: string
  scrollParent?: HTMLElement | null
  target?: HTMLAttributeAnchorTarget
}

const reducers: ReducersList = {
  articleInfiniteList: articleInfiniteListReducer,
}

// TODO: Make navigation through articles with tabs
export const ArticleInfiniteListRedesigned = ({
  className,
  scrollParent,
  target,
}: ArticleInfiniteListRedesignedProps) => {
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: false,
  })

  const { t } = useTranslation('articles')
  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticleInfiniteListIsLoading)
  const error = useSelector(getArticleInfiniteListError)
  const startIndex = useSelector(getArticleInfiniteListStartIndex)
  const view = useSelector(getArticleInfiniteListView)

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage())
  }, [dispatch])

  const onOpenArticle = useCallback<OnOpenArticle>(
    ({ index }) => {
      dispatch(articleInfiniteListActions.setStartIndex(index))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(initArticleInfiniteList())
  }, [dispatch])

  if (error) {
    return (
      <HStack justify='center' align='center' maxWidth maxHeight>
        <Title level={2}>{t('Failed to load articles')}</Title>
      </HStack>
    )
  }

  return (
    <StickyContentLayout
      className={styles.stickyContentLayout}
      right={
        <VStack gap={1}>
          <ArticleViewSelectorContainer />
          <ArticleFiltersContainer />
        </VStack>
      }
      content={
        <VirtualizedArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={className}
          skeletonsLimit={view === INITIAL_ARTICLE_VIEW ? 8 : 1}
          onLoadNextPart={onLoadNextPart}
          scrollParent={scrollParent}
          startIndex={startIndex}
          onOpenArticle={onOpenArticle}
          target={target}
        />
      }
    />
  )
}
