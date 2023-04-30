import { WithLabel } from 'shared/ui/WithLabel/WithLabel'
import { classNames } from 'shared/lib/classNames/classNames'
import type { ChangeEvent } from 'react'
import { useMemo } from 'react'
import { typedMemo } from 'shared/lib/typedMemo/typedMemo'
import styles from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SpinnerProps<T extends string> {
  className?: string
  label?: string
  options: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = typedMemo(
  <T extends string>({
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  }: SpinnerProps<T>) => {
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
      onChange?.(e.target.value as T)
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
