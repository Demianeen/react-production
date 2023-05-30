import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/Input'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

interface ListFiltersSearchProps {
  className?: string
  onSearch?: (query: string) => void
  onSearchDebounced?: (query: string) => void
  searchQuery?: string
  debounceDelay?: number
}

export const ListFiltersSearch = memo(
  ({
    className,
    onSearch,
    searchQuery,
    onSearchDebounced,
    debounceDelay = 500,
  }: ListFiltersSearchProps) => {
    const { t } = useTranslation('articles')

    const debouncedFetchArticles = useDebounce(
      () => onSearchDebounced?.(searchQuery ?? ''),
      debounceDelay
    )

    const onChangeSearch = useCallback(
      (query: string) => {
        onSearch?.(query)
        debouncedFetchArticles()
      },
      [debouncedFetchArticles, onSearch]
    )

    return (
      <Input
        placeholder={t('Search...')}
        className={className}
        value={searchQuery}
        onChange={onChangeSearch}
        maxWidth
      />
    )
  }
)

ListFiltersSearch.displayName = 'ListFiltersSearch'
