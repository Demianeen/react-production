import React, { memo, useMemo } from 'react'
import { SortOrder } from 'shared/types/sort'
import type { SelectOption } from 'shared/ui/Select/Select'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'

interface ListFiltersOrderProps {
  className?: string
  onChangeOrder: (order: SortOrder) => void
  order?: SortOrder
}

export const ListFiltersOrder = memo(
  ({
    className,
    order,
    onChangeOrder,
  }: ListFiltersOrderProps) => {
    const { t } = useTranslation('articles')

    const orderOptions: SelectOption<SortOrder>[] = useMemo(
      () => [
        {
          value: SortOrder.ASC,
          label: t('Ascending'),
        },
        {
          value: SortOrder.DESC,
          label: t('Descending'),
        },
      ],
      [t]
    )

    return (
      <Select
        options={orderOptions}
        label={t('Sort order')}
        onChange={onChangeOrder}
        value={order}
        className={className}
      />
    )
  }
)

ListFiltersOrder.displayName = 'ListFiltersOrder'
