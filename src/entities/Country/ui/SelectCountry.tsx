import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { Direction } from '@/shared/types/ui'
import { Select } from '@/shared/ui/redesigned/Popups'
import { ToggleFeature } from '@/shared/lib/features'
import { Country } from '../model/const/country'

interface SelectCountryProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
  direction?: Direction
  maxWidth?: boolean
  required?: boolean
}

export const SelectCountry = memo(
  ({
    className,
    value,
    onChange,
    readonly,
    direction,
    maxWidth,
    required,
  }: SelectCountryProps) => {
    const { t } = useTranslation()

    const countryOptions = useMemo(() => {
      return Object.entries(Country).map(([_enumKey, enumValue]) => ({
        value: enumValue,
        label: enumValue,
      }))
    }, [])

    const handleChange = useCallback(
      (country: string) => {
        // we expect that the value is a valid enum key because of CurrencyProps
        onChange?.(country as Country)
      },
      [onChange]
    )

    const props = {
      className,
      options: countryOptions,
      label: t('Country'),
      value,
      onChange: handleChange,
      readonly,
      defaultValue: t('Your country'),
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

SelectCountry.displayName = 'SelectCountry'
