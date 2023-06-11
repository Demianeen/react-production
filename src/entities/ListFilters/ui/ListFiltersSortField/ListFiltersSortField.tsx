import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@/shared/ui/Popups'
import type { SelectOption } from '@/shared/ui/Popups'
import { SortField } from '../../model/const/sortField'

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

    return (
      <Select
        options={sortOptions}
        label={t('Sort by')}
        onChange={onChangeSortField}
        value={sortField}
        className={className}
        direction='down-right'
        data-testid='ListFiltersSortField'
      />
    )
  }
)

ListFiltersSortField.displayName = 'ListFiltersSortField'
