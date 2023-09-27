import { Listbox } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNamesNew as classNames } from '@/shared/lib/classNames/classNamesNew'
import TickIcon from '@/shared/assets/icons/deprecated/tick-20-20.svg'
import type { DiagonalDirection } from '@/shared/types/position'
import type { TestProps } from '@/shared/types/tests'
import ArrowDownIcon from '@/shared/assets/icons/redesigned/arrow-down.svg'
import { WithLabel } from '../../../WithLabel'
import { mapDirection } from '../../const/mapDirection'
import { Button } from '../../../Button/Button'
import { Icon } from '../../../Icon/Icon'
import styles from './Select.module.scss'
import popupStyles from '../../styles/Popup.module.scss'

export interface SelectOption<T extends string> {
  value: T
  label: string
  disabled?: boolean
}

interface SelectProps<T extends string> extends TestProps {
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
  direction?: DiagonalDirection
  name?: string
  required?: boolean
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
    'data-testid': testId = 'Select',
    required = false,
  }: SelectProps<T>) => {
    const selectedOption = useMemo(
      () =>
        options.find(
          ({ value: optionValue }) => optionValue === value,
        ),
      [options, value],
    )

    return (
      <Listbox
        value={value}
        onChange={onChange}
        disabled={readonly}
        defaultValue={defaultValue}
        name={name}
      >
        <WithLabel
          label={label}
          as={Listbox.Label}
          wrapperClassName={popupStyles.popup}
        >
          <Listbox.Button
            as={Button}
            type='button'
            role='combobox'
            variant='filled'
            paddings='horizontal'
            disabledButton={readonly}
            addonRight={<Icon Svg={ArrowDownIcon} />}
            maxWidth={maxWidth}
            className={classNames(styles.button, className)}
            data-testid={`${testId}.Button`}
            aria-required={required}
          >
            {selectedOption?.label ?? defaultValue}
          </Listbox.Button>
          <Listbox.Options
            className={classNames(
              styles.options,
              mapDirection[direction],
              popupStyles.menu,
              {
                [popupStyles.maxWidth]: maxWidth,
              },
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
                      [popupStyles.disabled]: option.disabled,
                      [styles.selected]: selected,
                    })}
                    data-testid={`${testId}.Option.${option.value}`}
                    data-selected={selected}
                  >
                    {selected && <TickIcon className={styles.icon} />}
                    {option.label}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </WithLabel>
        {required && (
          <div
            aria-hidden='true'
            tabIndex={-1}
            className={styles.selectNativeWrapper}
          >
            <select
              disabled={readonly}
              onClick={() => {}}
              onChange={() => {}}
              tabIndex={-1}
              value={value === null ? undefined : value}
              name={name}
              required={required}
              aria-hidden='true'
              autoCapitalize='off'
              autoComplete='off'
              className={styles.selectNative}
            >
              <option value='' defaultChecked aria-hidden='true' />
              {options.map((option) => {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    aria-hidden='true'
                  >
                    {option.label}
                  </option>
                )
              })}
            </select>
          </div>
        )}
      </Listbox>
    )
  },
)
