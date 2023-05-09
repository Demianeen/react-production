import { typedMemo } from 'shared/lib/typedMemo/typedMemo'
import { Listbox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useMemo } from 'react'
import TickIcon from 'shared/assets/icons/tick-20-20.svg'
import ArrowDownIcon from 'shared/assets/icons/arrows-up-down-20-20.svg'
import { Button, ButtonTheme } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { WithLabel } from '../WithLabel/WithLabel'
import styles from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
  disabled?: boolean
}

// TODO: Implement the same with floating-ui
export type SelectDirection = 'up' | 'down'

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options: SelectOption<T>[]
  value?: T
  defaultValue?: string | T
  onChange?: (value: T) => void
  readonly?: boolean
  direction?: SelectDirection
  name?: string
}

export const Select = typedMemo(
  <T extends string>({
    className,
    label,
    options,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'down',
    name,
  }: SelectProps<T>) => {
    const selectedOption = useMemo(
      () =>
        options.find(
          ({ value: optionValue }) => optionValue === value
        ),
      [options, value]
    )

    return (
      <WithLabel
        wrapperClassName={styles.wrapper}
        label={label}
      >
        <Listbox
          value={value}
          onChange={onChange}
          disabled={readonly}
          defaultValue={defaultValue}
          name={name}
        >
          {/* list not closes properly if as=Fragment */}
          <Listbox.Button
            as='div'
            className={styles.buttonWrapper}
          >
            <Button
              type='button'
              theme={ButtonTheme.OUTLINE}
              disabled={readonly}
              className={classNames(styles.button, {}, [
                className,
              ])}
            >
              <span className={styles.label}>
                {selectedOption?.label ?? defaultValue}
              </span>
              <Icon
                Svg={ArrowDownIcon}
                className={styles.icon}
              />
            </Button>
          </Listbox.Button>
          <Listbox.Options
            className={classNames(styles.options, {}, [
              styles[direction],
            ])}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {({ active, selected }) => (
                  <li
                    className={classNames(styles.option, {
                      [styles.active]: active,
                      [styles.selected]: selected,
                      [styles.disabled]: option.disabled,
                    })}
                  >
                    {selected && (
                      <TickIcon className={styles.icon} />
                    )}
                    {option.label}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </WithLabel>
    )
  }
)
