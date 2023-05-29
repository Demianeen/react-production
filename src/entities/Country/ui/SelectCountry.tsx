import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@/shared/ui/Popups/ui/Select/Select'
import type { Direction } from '@/shared/types/ui'
import { Country } from '../model/const/country'

interface SelectCountryProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
  direction?: Direction
  maxWidth?: boolean
}

export const SelectCountry = memo(
  ({
    className,
    value,
    onChange,
    readonly,
    direction,
    maxWidth,
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
        defaultValue={t('Your country')}
        direction={direction}
        maxWidth={maxWidth}
      />
    )
  }
)

SelectCountry.displayName = 'SelectCountry'
