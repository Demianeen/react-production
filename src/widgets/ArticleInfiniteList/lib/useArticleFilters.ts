import type { SortField } from '@/entities/ListFilters'
import type { SortOrder } from '@/shared/const/sort'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getArticleInfiniteListOrder } from '../model/selectors/getArticleInfiniteListOrder/getArticleInfiniteListOrder'
import { getArticleInfiniteListSearch } from '../model/selectors/getArticleInfiniteListSearch/getArticleInfiniteListSearch'
import { getArticleInfiniteListSortField } from '../model/selectors/getArticleInfiniteListSortField/getArticleInfiniteListSortField'
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../model/slice/articleInfiniteListSlice'

export const useArticleFilters = () => {
  const dispatch = useAppDispatch()
  const sortField = useSelector(getArticleInfiniteListSortField)
  const order = useSelector(getArticleInfiniteListOrder)
  const search = useSelector(getArticleInfiniteListSearch)

  const onChangeSortField = useCallback(
    (newSortField: SortField) => {
      dispatch(articleInfiniteListActions.setSortField(newSortField))
      dispatch(articleInfiniteListActions.setPage(1))
      dispatch(fetchArticles({ replace: true }))
    },
    [dispatch]
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articleInfiniteListActions.setOrder(newOrder))
      dispatch(articleInfiniteListActions.setPage(1))
      dispatch(fetchArticles({ replace: true }))
    },
    [dispatch]
  )

  const onSearch = useCallback(
    (newQuery: string) => {
      dispatch(articleInfiniteListActions.setSearch(newQuery))
      dispatch(articleInfiniteListActions.setPage(1))
    },
    [dispatch]
  )

  const onSearchDebounced = useCallback(() => {
    dispatch(fetchArticles({ replace: true }))
  }, [dispatch])

  return {
    sortField,
    order,
    search,
    onChangeSortField,
    onChangeOrder,
    onSearch,
    onSearchDebounced,
  }
}
