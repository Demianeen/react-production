import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ArticleListFilters } from '@/features/ArticleListFilters'
import type { ArticleType } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  VStack,
  type FlexDirection,
} from '@/shared/ui/redesigned/Stack'
import { useMedia } from '@/shared/lib/hooks/useMedia/useMedia'
import { ListFiltersView } from '@/entities/ListFilters'
import { useArticleView } from '../../lib/useArticleView'
import { getArticleInfiniteListType } from '../../model/selectors/getArticleInfinteListType/getArticleInfiniteListType'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { articleInfiniteListActions } from '../../model/slice/articleInfiniteListSlice'
import { useArticleFilters } from '../../lib/useArticleFilters'

export interface ArticleFiltersContainerProps {
  className?: string
  listRef: HTMLDivElement | null
}

export const ArticleFiltersContainer = typedMemo(
  ({ className, listRef }: ArticleFiltersContainerProps) => {
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
    const [direction, setDirection] =
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
        setDirection('row')
      } else {
        setDirection('column')
      }
    }, [])
    useMedia(onResize)

    const tab = useSelector(getArticleInfiniteListType)

    const viewProps = useArticleView(listRef)

    return (
      <VStack gap={1}>
        <ListFiltersView
          className={className}
          showLabel={direction === 'row'}
          {...viewProps}
        />
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
          direction={direction}
        />
      </VStack>
    )
  }
)
