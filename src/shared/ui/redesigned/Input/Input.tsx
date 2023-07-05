import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { memo, useEffect, useRef } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNamesNew as classNames } from '@/shared/lib/classNames/classNamesNew'
import { useFocus } from '@/shared/lib/hooks/useFocus/useFocus'
import { useTab } from '@/shared/lib/hooks/useTab/useTab'
import type { FlexDirection } from '../Stack'
import { HStack } from '../Stack'
import { WithLabel } from '../WithLabel/WithLabel'
import styles from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>

interface InputProps extends HTMLInputProps {
  /**
   * @description Input block label
   */
  label?: string
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autoFocus?: boolean
  readonly?: boolean
  wrapperClassName?: string
  /**
   * Content to render on the left side of input
   * @example
   * <Input addonLeft={<Icon Svg={SearchIcon} />} />
   */
  addonLeft?: ReactNode
  /**
   * Content to render on the right side of input
   * @example
   * <Input addonRight={<Icon Svg={SearchIcon} />} />
   */
  addonRight?: ReactNode
  /**
   * Flag to set width to 100% for input
   */
  maxWidth?: boolean
  direction?: FlexDirection
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    autoFocus,
    label,
    readonly,
    wrapperClassName,
    maxWidth,
    addonLeft,
    addonRight,
    direction,
    ...props
  }: InputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    const [isInputFocused, bindFocus] = useFocus()
    const { isTabLastKey } = useTab()

    useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus()
      }
    }, [autoFocus])

    const mods: Mods = {
      [styles.readonly]: readonly,
      [styles.focused]: isInputFocused,
      [styles.focusedByTab]: isInputFocused && isTabLastKey,
      [styles.withAddonLeft]: Boolean(addonLeft),
      [styles.withAddonRight]: Boolean(addonRight),
    }

    return (
      <WithLabel
        label={label}
        wrapperClassName={wrapperClassName}
        maxWidth={maxWidth}
        direction={direction}
      >
        <HStack
          className={classNames(styles.inputWrapper, mods, className)}
          maxWidth={maxWidth}
        >
          {addonLeft && (
            <div className={styles.addonLeft}>{addonLeft}</div>
          )}
          <input
            id={label}
            className={classNames(styles.input, {
              [styles.maxWidth]: maxWidth,
            })}
            type={type}
            value={value}
            onChange={handleChange}
            ref={inputRef}
            {...bindFocus}
            /* I decided to use autofocus for forms */
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus={autoFocus}
            readOnly={readonly}
            {...props}
          />
          {addonRight && (
            <div className={styles.addonRight}>{addonRight}</div>
          )}
        </HStack>
      </WithLabel>
    )
  }
)

Input.displayName = 'Input'
