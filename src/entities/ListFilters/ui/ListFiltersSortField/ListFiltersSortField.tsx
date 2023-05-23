import { memo, useMemo } from 'react'
import type { SelectOption } from 'shared/ui/Popups/ui/Select/Select'
import { Select } from 'shared/ui/Popups/ui/Select/Select'
import { useTranslation } from 'react-i18next'

import { SortField } from 'entities/ListFilters/model/const/sortField'

interface ListFiltersSortFieldProps {
  className?: string
  onChangeSortField: (sortField: SortField) => void
  sortField?: SortField
}

export const ListFiltersSortField = memo(
  ({
    className,
    onChangeSortField,
    sortField,
  }: ListFiltersSortFieldProps) => {
    const { t } = useTranslation('articles')

    const sortOptions: SelectOption<SortField>[] = useMemo(
      () => [
        {
          value: SortField.CREATED_AT,
          label: t('Date created'),
        },
        {
          value: SortField.TITLE,
          label: t('Title'),
        },
        {
          value: SortField.VIEWS,
          label: t('Views'),
        },
      ],
      [t]
    )

    // const onChangeOrder = useCallback(
    //   (newOrder: SortOrder) => {
    //     dispatch(
    //       listFiltersActions.setOrder(newOrder)
    //     )
    //     dispatch(articlesPageActions.setPage(1))
    //     dispatch(fetchArticles({ replace: true }))
    //   },
    //   [dispatch]
    // )
    //
    // const onChangeSortField = useCallback(
    //   (newSortField: ArticleSortField) => {
    //     dispatch(
    //       listFiltersActions.setSortField(
    //         newSortField
    //       )
    //     )
    //     dispatch(articlesPageActions.setPage(1))
    //     dispatch(fetchArticles({ replace: true }))
    //   },
    //   [dispatch]
    // )

    return (
      <Select
        options={sortOptions}
        label={t('Sort by')}
        onChange={onChangeSortField}
        value={sortField}
        className={className}
      />
    )
  }
)

ListFiltersSortField.displayName = 'ListFiltersSortField'
