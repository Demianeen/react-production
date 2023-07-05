import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SortOrder } from '@/shared/const/sort'
import type { SelectOption } from '@/shared/ui/deprecated/Popups'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import { Select } from '@/shared/ui/redesigned/Popups'
import { ToggleFeature } from '@/shared/lib/features'

interface ListFiltersOrderProps {
  className?: string
  onChangeOrder: (order: SortOrder) => void
  order?: SortOrder
}

export const ListFiltersOrder = memo(
  ({ className, order, onChangeOrder }: ListFiltersOrderProps) => {
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
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Select
            options={orderOptions}
            label={t('Sort order')}
            onChange={onChangeOrder}
            value={order}
            className={className}
            direction='down-right'
            data-testid='ListFiltersOrder'
          />
        }
        off={
          <SelectDeprecated
            options={orderOptions}
            label={t('Sort order')}
            onChange={onChangeOrder}
            value={order}
            className={className}
            direction='down-right'
            data-testid='ListFiltersOrder'
          />
        }
      />
    )
  }
)

ListFiltersOrder.displayName = 'ListFiltersOrder'
