import { memo } from 'react'
import { ListFilters } from '@/entities/ListFilters'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Search } from '@/shared/ui/deprecated/Search'
import { useArticleFilters } from '../../lib/useArticleFilters'
import { useArticleView } from '../../lib/useArticleView'

interface ArticleInfiniteListFiltersProps {
  className?: string
}

export const ArticleInfiniteListFilters = memo(
  ({ className }: ArticleInfiniteListFiltersProps) => {
    const viewProps = useArticleView()

    const {
      sortField,
      order,
      search,
      onChangeSortField,
      onChangeOrder,
      onSearch,
      onSearchDebounced,
    } = useArticleFilters()

    return (
      <VStack gap={1.25} maxWidth className={className}>
        <ListFilters
          onChangeSortField={onChangeSortField}
          sortField={sortField}
          onChangeOrder={onChangeOrder}
          order={order}
          {...viewProps}
        />
        <Search
          onSearch={onSearch}
          onSearchDebounced={onSearchDebounced}
          searchQuery={search}
        />
      </VStack>
    )
  }
)

ArticleInfiniteListFilters.displayName = 'ArticleInfiniteListFilters'
