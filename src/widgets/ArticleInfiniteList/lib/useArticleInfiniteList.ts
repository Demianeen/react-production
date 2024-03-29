import type { OnOpenArticle } from '@/entities/Article'
import { useComputeListItemsLimit } from '@/entities/Article'
import { useEffect, useCallback } from 'react'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useArticleInfiniteListLimit } from '../model/selectors/getArticleInfiniteListLimit/getArticleInfiniteListLimit'
import { useArticleInfiniteListView } from '../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { useFetchArticlesNextPage } from '../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { useInitArticleInfiniteList } from '../model/services/initArticleInfiniteList/initArticleInfiniteList'
import {
  articleInfiniteListReducer,
  useArticleInfiniteListActions,
} from '../model/slice/articleInfiniteListSlice'

const reducers: AsyncReducersList = {
  articleInfiniteList: articleInfiniteListReducer,
}

export const useArticleInfiniteList = (
  virtualizedListRef: HTMLDivElement | null
) => {
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: false,
  })

  const { setStartIndex, setLimit } = useArticleInfiniteListActions()
  const initArticleInfiniteList = useInitArticleInfiniteList()
  const fetchArticlesNextPage = useFetchArticlesNextPage()

  const view = useArticleInfiniteListView()
  const limit = useArticleInfiniteListLimit()

  const limitCalculated = useComputeListItemsLimit({
    view,
    containerRef: virtualizedListRef,
  })

  useEffect(() => {
    // limit intended to change only once
    if (limitCalculated && !limit) {
      setLimit(limitCalculated * 3)
    }
  }, [limitCalculated, setLimit, limit])

  const onLoadNextPart = useCallback(() => {
    fetchArticlesNextPage()
  }, [fetchArticlesNextPage])

  const onOpenArticle = useCallback<OnOpenArticle>(
    ({ index }) => {
      setStartIndex(index)
    },
    [setStartIndex]
  )

  useEffect(() => {
    // limit intended to change only once
    if (limit) {
      initArticleInfiniteList()
    }
  }, [initArticleInfiniteList, limit])

  return {
    onLoadNextPart,
    onOpenArticle,
  }
}
