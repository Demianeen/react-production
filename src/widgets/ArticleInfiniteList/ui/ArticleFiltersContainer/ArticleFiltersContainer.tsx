import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ArticleListFilters } from '@/features/ArticleListFilters'
import type { ArticleType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import type { FlexDirection } from '@/shared/ui/redesigned/Stack'
import { useMedia } from '@/shared/lib/hooks/useMedia/useMedia'
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
    const [tabDirection, setTabDirection] =
      useState<FlexDirection>('column')

    const onChangeType = useCallback(
      (type: ArticleType) => {
        dispatch(articleInfiniteListActions.setType(type))
        dispatch(articleInfiniteListActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    const onResize = useCallback(() => {
      if (window.innerWidth < 1000) {
        setTabDirection('row')
      } else {
        setTabDirection('column')
      }
    }, [])
    useMedia(onResize)

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
        direction={tabDirection}
      />
    )
  }
)
