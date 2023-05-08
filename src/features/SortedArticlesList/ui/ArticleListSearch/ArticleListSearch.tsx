import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Input } from 'shared/ui/Input/Input'
import {
  articlesPageActions,
  fetchArticles,
} from 'pages/ArticlesPage'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { getSortedArticleListSearch } from '../../model/selectors/getSortedArticleListSearch/getSortedArticleListSearch'
import { sortedArticleListActions } from '../../model/slice/sortedArticleListSlice'

interface SelectArticleListSearchProps {
  className?: string
}

export const ArticleListSearch = memo(
  ({ className }: SelectArticleListSearchProps) => {
    const { t } = useTranslation('articles')

    const dispatch = useAppDispatch()

    const searchQuery = useSelector(
      getSortedArticleListSearch
    )

    const debouncedFetchArticles = useDebounce(
      () => dispatch(fetchArticles({ replace: true })),
      500
    )

    const onChangeSearch = useCallback(
      (query: string) => {
        dispatch(sortedArticleListActions.setSearch(query))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchArticles()
      },
      [debouncedFetchArticles, dispatch]
    )

    return (
      <Input
        placeholder={t('Search...')}
        className={className}
        value={searchQuery}
        onChange={onChangeSearch}
      />
    )
  }
)

ArticleListSearch.displayName = 'ArticleListSearch'
