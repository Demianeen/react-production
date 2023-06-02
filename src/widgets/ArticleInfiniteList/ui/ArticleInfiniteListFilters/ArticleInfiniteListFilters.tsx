import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import type {
  SortField,
  View,
} from '@/entities/ListFilters'
import { ListFilters } from '@/entities/ListFilters'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { SortOrder } from '@/shared/const/sort'
import { VStack } from '@/shared/ui/Stack'
import { Search } from '@/shared/ui/Search'
import { articleInfiniteListActions } from '../../model/slice/articleInfiniteListSlice'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { getArticleInfiniteListSearch } from '../../model/selectors/getArticleInfiniteListSearch/getArticleInfiniteListSearch'
import { getArticleInfiniteListView } from '../../model/selectors/getArticleInfiniteListView/getArticleInfiniteListView'
import { getArticleInfiniteListSortField } from '../../model/selectors/getArticleInfiniteListSortField/getArticleInfiniteListSortField'
import { getArticleInfiniteListOrder } from '../../model/selectors/getArticleInfiniteListOrder/getArticleInfiniteListOrder'
import { ArticleInfiniteListTabs } from '../ArticleInfiniteListTabs/ArticleInfiniteListTabs'

interface ArticleInfiniteListFiltersProps {
  className?: string
}

export const ArticleInfiniteListFilters = memo(
  ({ className }: ArticleInfiniteListFiltersProps) => {
    const dispatch = useAppDispatch()
    const sortField = useSelector(
      getArticleInfiniteListSortField
    )
    const order = useSelector(getArticleInfiniteListOrder)
    const view = useSelector(getArticleInfiniteListView)
    const search = useSelector(getArticleInfiniteListSearch)

    const onChangeSortField = useCallback(
      (newSortField: SortField) => {
        dispatch(
          articleInfiniteListActions.setSortField(
            newSortField
          )
        )
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(
          articleInfiniteListActions.setOrder(newOrder)
        )
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const onChangeView = useCallback(
      (newView: View) => {
        dispatch(
          articleInfiniteListActions.setView(newView)
        )
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const onSearch = useCallback(
      (newQuery: string) => {
        dispatch(
          articleInfiniteListActions.setSearch(newQuery)
        )
        dispatch(articleInfiniteListActions.setPage(1))
      },
      [dispatch]
    )

    const onSearchDebounced = useCallback(() => {
      dispatch(fetchArticles({ replace: true }))
    }, [dispatch])

    return (
      <VStack gap={1.25} maxWidth className={className}>
        <ListFilters
          onChangeSortField={onChangeSortField}
          sortField={sortField}
          onChangeOrder={onChangeOrder}
          order={order}
          onChangeView={onChangeView}
          view={view}
        />
        <Search
          onSearch={onSearch}
          onSearchDebounced={onSearchDebounced}
          searchQuery={search}
        />
        <ArticleInfiniteListTabs />
      </VStack>
    )
  }
)

ArticleInfiniteListFilters.displayName =
  'ArticleInfiniteListFilters'
