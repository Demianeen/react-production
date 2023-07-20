import type { OnOpenArticle } from '@/entities/Article'
import { useComputeListItemsLimit } from '@/entities/Article'
import { useEffect, useCallback } from 'react'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useArticleInfiniteListLimit } from '../model/selectors/getArticleInfiniteListLimit/getArticleInfiniteListLimit'
import { useArticleInfiniteListView } from '../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { useFetchArticlesNextPage } from '../model/services/fetchArticlesNextPage/fetchArticlesNextPage'
import { useInitArticleInfiniteList } from '../model/services/initArticleInfiniteList/initArticleInfiniteList'
import {
  articleInfiniteListReducer,
  useArticleInfiniteListActions,
} from '../model/slice/articleInfiniteListSlice'

const reducers: ReducersList = {
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
    widthContainerRef: virtualizedListRef,
    itemWidth: 200,
  })

  useEffect(() => {
    if (limitCalculated) {
      console.log('limit', limitCalculated)
      setLimit(limitCalculated * 3)
    }
  }, [limitCalculated, setLimit])

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
      console.log('limit initArticleInfiniteList', limit)
      initArticleInfiniteList()
    }
  }, [initArticleInfiniteList, limit])

  return {
    onLoadNextPart,
    onOpenArticle,
  }
}
