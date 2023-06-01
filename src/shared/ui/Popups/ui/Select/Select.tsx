import { Listbox } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNames } from '@/shared/lib/classNames/classNames'
import TickIcon from '@/shared/assets/icons/tick-20-20.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrows-up-down-20-20.svg'
import type { Direction } from '@/shared/types/ui'
import { mapDirection } from '../../const/mapDirection'
import { Button, ButtonTheme } from '../../../Button/Button'
import { Icon } from '../../../Icon/Icon'
import { WithLabel } from '../../../WithLabel/WithLabel'
import styles from './Select.module.scss'
import popupStyles from '../../styles/Popup.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
  disabled?: boolean
}

interface SelectProps<T extends string> {
  className?: string
  /**
   * @description Label of select block
   */
  label?: string
  /**
   * @description List of items to render in select dropdown
   */
  options: SelectOption<T>[]
  value?: T
  defaultValue?: string | T
  onChange?: (value: T) => void
  readonly?: boolean
  /**
   * @description Flag that sets width to 100% for select
   */
  maxWidth?: boolean
  /**
   * @description Direction of dropdown
   * @default 'down-left'
   */
  direction?: Direction
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
        wrapperClassName={popupStyles.popup}
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
                [popupStyles.maxWidth]: maxWidth,
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
                [popupStyles.maxWidth]: maxWidth,
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
                      [popupStyles.active]: active,
                      [popupStyles.disabled]:
                        option.disabled,
                      [styles.selected]: selected,
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
