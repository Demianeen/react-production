import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { SelectOption } from '@/shared/ui/deprecated/Popups'
import { Select } from '@/shared/ui/redesigned/Popups'
import { ToggleFeature } from '@/shared/lib/features'
import { SortField } from '../../model/const/sortField'

interface SelectSortFieldProps {
  className?: string
  onChangeSortField: (sortField: SortField) => void
  sortField?: SortField
}

export const SelectSortField = memo(
  ({
    className,
    onChangeSortField,
    sortField,
  }: SelectSortFieldProps) => {
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
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Select
            options={sortOptions}
            label={t('Sort by')}
            onChange={onChangeSortField}
            value={sortField}
            className={className}
            direction='down-right'
            data-testid='SelectSortField'
          />
        }
        off={
          <SelectDeprecated
            options={sortOptions}
            label={t('Sort by')}
            onChange={onChangeSortField}
            value={sortField}
            className={className}
            direction='down-right'
            data-testid='SelectSortField'
          />
        }
      />
    )
  }
)

SelectSortField.displayName = 'SelectSortField'
