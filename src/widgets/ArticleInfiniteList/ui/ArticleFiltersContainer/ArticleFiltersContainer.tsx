import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ArticleListFilters } from '@/features/ArticleListFilters'
import type { ArticleType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getArticleInfiniteListType } from '../../model/selectors/getArticleInfinteListType/getArticleInfiniteListType'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../../model/slice/articleInfiniteListSlice'
import { useArticleFilters } from '../../lib/useArticleFilters'

export interface ArticleFiltersContainerProps {
  className?: string
}

export const ArticleFiltersContainer = typedMemo(
  ({ className }: ArticleFiltersContainerProps) => {
    const {
      sortField,
      order,
      search,
      onChangeSortField,
      onChangeOrder,
      onSearch,
      onSearchDebounced,
    } = useArticleFilters()

    const dispatch = useAppDispatch()

    const onChangeType = useCallback(
      (type: ArticleType) => {
        dispatch(articleInfiniteListActions.setType(type))
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const tab = useSelector(getArticleInfiniteListType)

    return (
      <ArticleListFilters
        className={className}
        onChangeSortField={onChangeSortField}
        onChangeOrder={onChangeOrder}
        onSearch={onSearch}
        onSearchDebounced={onSearchDebounced}
        sortField={sortField}
        order={order}
        search={search}
        onChangeTab={onChangeType}
        tab={tab}
      />
    )
  }
)
