import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { Direction } from '@/shared/types/ui'
import { ToggleFeature } from '@/shared/lib/features'
import { Select } from '@/shared/ui/redesigned/Popups'
import { Currency } from '../model/const/currency'

interface SelectCurrencyProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
  direction?: Direction
  maxWidth?: boolean
  required?: boolean
}

export const SelectCurrency = memo(
  ({
    className,
    value,
    onChange,
    readonly,
    direction,
    maxWidth,
    required,
  }: SelectCurrencyProps) => {
    const { t } = useTranslation()

    const currencyOptions = useMemo(() => {
      return Object.entries(Currency).map(([enumKey, enumValue]) => ({
        value: enumKey,
        label: enumValue,
      }))
    }, [])

    const handleChange = useCallback(
      (currency: string) => {
        // we expect that the value is a valid enum key because of CurrencyProps
        onChange?.(currency as Currency)
      },
      [onChange]
    )

    const props = {
      className,
      options: currencyOptions,
      label: t('Currency'),
      value,
      onChange: handleChange,
      readonly,
      defaultValue: t('Your currency'),
      direction,
      required,
    }

    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={<Select {...props} />}
        off={<SelectDeprecated {...props} maxWidth={maxWidth} />}
      />
    )
  }
)

SelectCurrency.displayName = 'SelectCurrency'
