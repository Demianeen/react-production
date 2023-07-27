import type { View } from '@/entities/ListFilters'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { computeListItemsLimit } from '@/entities/Article'
import { getArticleInfiniteListView } from '../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { useFetchArticles } from '../model/services/fetchArticles/fetchArticles'
import { useArticleInfiniteListActions } from '../model/slice/articleInfiniteListSlice'

export const useArticleView = (listRef: HTMLDivElement | null) => {
  const view = useSelector(getArticleInfiniteListView)
  const { setView, setPage, setLimit } =
    useArticleInfiniteListActions()
  const fetchArticles = useFetchArticles()

  const onChangeView = useCallback(
    (newView: View) => {
      setView(newView)
      setPage(1)
      const limit = computeListItemsLimit({
        view: newView,
        containerRef: listRef,
      })
      setLimit(limit * 3)
      fetchArticles({ replace: true })
    },
    [fetchArticles, listRef, setLimit, setPage, setView]
  )

  return {
    view,
    onChangeView,
  }
}
