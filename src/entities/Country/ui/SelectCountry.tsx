import React, { memo, useCallback, useMemo } from 'react'
import { Select } from 'shared/ui/Select/Select'
import { useTranslation } from 'react-i18next'
import { Country } from '../model/types/country'

interface SelectCountryProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

export const SelectCountry = memo(
  ({
    className,
    value,
    onChange,
    readonly,
  }: SelectCountryProps) => {
    const { t } = useTranslation()

    const countryOptions = useMemo(() => {
      return Object.entries(Country).map(
        ([enumKey, enumValue]) => ({
          value: enumKey,
          label: enumValue,
        })
      )
    }, [])

    const handleChange = useCallback(
      (country: string) => {
        // we expect that the value is a valid enum key because of CurrencyProps
        onChange?.(country as Country)
      },
      [onChange]
    )

    return (
      <Select
        className={className}
        options={countryOptions}
        label={t('Country')}
        value={value}
        onChange={handleChange}
        readonly={readonly}
      />
    )
  }
)

SelectCountry.displayName = 'SelectCountry'
