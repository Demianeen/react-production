import { Listbox } from '@headlessui/react'
import type { ComponentPropsWithoutRef } from 'react'
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

interface MultiplePropsTrue<T extends string> {
  value?: T[]
  defaultValue?: string[] | T[]
  onChange?: (value: T[]) => void
  multiple: true
}

interface MultiplePropsFalse<T extends string> {
  value?: T
  defaultValue?: string | T
  onChange?: (value: T) => void
  multiple?: false
}

type SelectProps<T extends string> = {
  className?: string
  /**
   * @description Label of select block
   */
  label?: string
  /**
   * @description List of items to render in select dropdown
   */
  options: SelectOption<T>[]
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
  clear?: boolean
  listProps?: ComponentPropsWithoutRef<typeof Listbox.Options>
} & TestProps &
  (MultiplePropsTrue<T> | MultiplePropsFalse<T>)

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
    multiple,
    required = false,
    clear,
    listProps,
  }: SelectProps<T>) => {
    const selectedOptionLabel = useMemo(() => {
      if (multiple) {
        const selectedOptions = options.filter(
          ({ value: optionValue }) => value?.includes(optionValue),
        )
        return selectedOptions
          ?.map(({ label: optionLabel }) => optionLabel)
          .join(', ')
      }

      const selectedOption = options.find(
        ({ value: optionValue }) => optionValue === value,
      )

      return selectedOption?.label
    }, [multiple, options, value])

    return (
      <Listbox
        value={value}
        onChange={onChange}
        disabled={readonly}
        defaultValue={defaultValue}
        multiple={multiple}
        name={name}
      >
        <WithLabel
          required={required}
          label={label}
          as={Listbox.Label}
          wrapperClassName={popupStyles.popup}
        >
          <Listbox.Button
            as={Button}
            type='button'
            role='combobox'
            variant={clear ? 'clear' : 'filled'}
            paddings={clear ? 'none' : 'horizontal'}
            disabledButton={readonly}
            addonRight={
              clear ? undefined : <Icon Svg={ArrowDownIcon} />
            }
            maxWidth={maxWidth}
            className={classNames(styles.button, className)}
            data-testid={`${testId}.Button`}
            aria-required={required}
          >
            {selectedOptionLabel ?? defaultValue}
          </Listbox.Button>
          <Listbox.Options
            {...listProps}
            className={classNames(
              styles.options,
              mapDirection[direction],
              popupStyles.menu,
              {
                [popupStyles.maxWidth]: maxWidth,
              },
              listProps?.className,
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
              multiple={multiple}
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
