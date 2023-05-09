import React, { memo, useCallback, useMemo } from 'react'
import type { SelectDirection } from 'shared/ui/Select/Select'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { Currency } from '../model/types/currency'

interface SelectCurrencyProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
  direction?: SelectDirection
}

export const SelectCurrency = memo(
  ({
    className,
    value,
    onChange,
    readonly,
    direction,
  }: SelectCurrencyProps) => {
    const { t } = useTranslation()

    const currencyOptions = useMemo(() => {
      return Object.entries(Currency).map(
        ([enumKey, enumValue]) => ({
          value: enumKey,
          label: enumValue,
        })
      )
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
      />
    )
  }
)

SelectCurrency.displayName = 'SelectCurrency'
