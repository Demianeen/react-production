import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { Input } from '../Input'

interface SearchProps {
  className?: string
  /**
   * @description Callback for each search query change
   * @param {string} query
   */
  onSearch?: (query: string) => void
  /**
   * @description Callback for each search query change with debounce
   * @param {string} query
   */
  onSearchDebounced?: (query: string) => void
  /**
   * @description Current search query
   */
  searchQuery?: string
  /**
   * @description Debounce delay in ms
   */
  debounceDelay?: number
}

export const Search = memo(
  ({
    className,
    onSearch,
    searchQuery,
    onSearchDebounced,
    debounceDelay = 500,
  }: SearchProps) => {
    const { t } = useTranslation()

    const debouncedFunction = useDebounce(
      () => onSearchDebounced?.(searchQuery ?? ''),
      debounceDelay
    )

    const onChangeSearch = useCallback(
      (query: string) => {
        onSearch?.(query)
        debouncedFunction()
      },
      [debouncedFunction, onSearch]
    )

    return (
      <Input
        placeholder={t('Search...')}
        className={className}
        value={searchQuery}
        onChange={onChangeSearch}
        maxWidth
        data-testid='Search'
      />
    )
  }
)

Search.displayName = 'Search'
