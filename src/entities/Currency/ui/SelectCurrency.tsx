import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@/shared/ui/deprecated/Popups'
import type { Direction } from '@/shared/types/ui'
import { Currency } from '../model/const/currency'

interface SelectCurrencyProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
  direction?: Direction
  maxWidth?: boolean
}

export const SelectCurrency = memo(
  ({
    className,
    value,
    onChange,
    readonly,
    direction,
    maxWidth,
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

    return (
      <Select
        className={className}
        options={currencyOptions}
        label={t('Currency')}
        value={value}
        onChange={handleChange}
        readonly={readonly}
        defaultValue={t('Your currency')}
        direction={direction}
        maxWidth={maxWidth}
      />
    )
  }
)

SelectCurrency.displayName = 'SelectCurrency'
