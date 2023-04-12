import { WithLabel } from 'shared/ui/WithLabel/WithLabel'
import { classNames } from 'shared/lib/classNames/classNames'
import type { ChangeEvent } from 'react'
import { memo, useMemo } from 'react'
import styles from './Select.module.scss'

export interface SelectOption {
  value: string
  label: string
}

interface SpinnerProps {
  className?: string
  label?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo(
  ({
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  }: SpinnerProps) => {
    const optionsList = useMemo(() => {
      return options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className={styles.option}
        >
          {opt.label}
        </option>
      ))
    }, [options])

    const handleChange = (
      e: ChangeEvent<HTMLSelectElement>
    ) => {
      onChange?.(e.target.value)
    }

    return (
      <WithLabel label={label}>
        <select
          id={label}
          className={classNames(styles.select, {}, [
            className,
          ])}
          value={value}
          onChange={handleChange}
          disabled={readonly}
        >
          {optionsList}
        </select>
      </WithLabel>
    )
  }
)

Select.displayName = 'Select'
