import type { View } from '@/entities/ListFilters'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getArticleInfiniteListView } from '../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../model/slice/articleInfiniteListSlice'

export const useArticleView = () => {
  const dispatch = useAppDispatch()

  const view = useSelector(getArticleInfiniteListView)

  const onChangeView = useCallback(
    (newView: View) => {
      dispatch(articleInfiniteListActions.setView(newView))
      dispatch(articleInfiniteListActions.setPage(1))
      dispatch(fetchArticles({ replace: true }))
    },
    [dispatch]
  )

  return {
    view,
    onChangeView,
  }
}
