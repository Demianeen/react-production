import { typedMemo } from 'shared/lib/react/typedMemo/typedMemo'
import { Listbox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Fragment, useMemo } from 'react'
import TickIcon from 'shared/assets/icons/tick-20-20.svg'
import ArrowDownIcon from 'shared/assets/icons/arrows-up-down-20-20.svg'
import type { Direction } from 'shared/types/ui'
import { Button, ButtonTheme } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { WithLabel } from '../WithLabel/WithLabel'
import styles from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
  disabled?: boolean
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options: SelectOption<T>[]
  value?: T
  defaultValue?: string | T
  onChange?: (value: T) => void
  readonly?: boolean
  maxWidth?: boolean
  // TODO: Implement directions with floating-ui
  direction?: Direction
  name?: string
}

/* eslint-disable @typescript-eslint/naming-convention */
const mapDirection: Record<Direction, string> = {
  'up-right': `${styles.up}`,
  'up-left': `${styles.up} ${styles.left}`,
  'down-right': `${styles.down}`,
  'down-left': `${styles.down} ${styles.left}`,
}
/* eslint-enable @typescript-eslint/naming-convention */

export const Select = typedMemo(
  <T extends string>({
    className,
    label,
    options,
    value,
    defaultValue,
    onChange,
    readonly,
    maxWidth,
    direction = 'down-left',
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
        maxWidth={maxWidth}
      >
        <Listbox
          value={value}
          onChange={onChange}
          disabled={readonly}
          defaultValue={defaultValue}
          name={name}
        >
          <Listbox.Button
            as={Button}
            type='button'
            theme={ButtonTheme.OUTLINE}
            disabledButton={readonly}
            className={classNames(
              styles.button,
              {
                [styles.maxWidth]: maxWidth,
              },
              [className]
            )}
          >
            <span className={styles.label}>
              {selectedOption?.label ?? defaultValue}
            </span>
            <Icon
              Svg={ArrowDownIcon}
              className={styles.icon}
            />
          </Listbox.Button>
          <Listbox.Options
            className={classNames(
              styles.options,
              {
                [styles.maxWidth]: maxWidth,
              },
              [mapDirection[direction]]
            )}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                as={Fragment}
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
