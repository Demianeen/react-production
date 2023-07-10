import type { HTMLAttributeAnchorTarget } from 'react'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { OnOpenArticle } from '@/entities/Article'
import { VirtualizedArticleList } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { HStack } from '@/shared/ui/redesigned/Stack'
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
import { ArticleInfiniteListFilters } from '../../ArticleInfiniteListFilters/ArticleInfiniteListFilters'

interface ArticleInfiniteListDeprecatedProps {
  className?: string
  scrollParent?: HTMLElement | null
  target?: HTMLAttributeAnchorTarget
}

const reducers: ReducersList = {
  articleInfiniteList: articleInfiniteListReducer,
}

export const ArticleInfiniteListDeprecated = ({
  className,
  scrollParent,
  target,
}: ArticleInfiniteListDeprecatedProps) => {
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
        <Text
          title={t('Failed to load articles')}
          size={TextSize.L}
        />
      </HStack>
    )
  }

  return (
    <VirtualizedArticleList
      articles={articles}
      isLoading={isLoading}
      view={view}
      className={className}
      skeletonsLimit={view === INITIAL_ARTICLE_VIEW ? 8 : 1}
      onLoadNextPart={onLoadNextPart}
      scrollParent={scrollParent}
      Header={ArticleInfiniteListFilters}
      startIndex={startIndex}
      onOpenArticle={onOpenArticle}
      target={target}
    />
  )
}