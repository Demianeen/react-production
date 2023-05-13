import type { InputHTMLAttributes } from 'react'
import React, { memo, useEffect } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { WithLabel } from '../WithLabel/WithLabel'
import styles from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>

interface InputProps extends HTMLInputProps {
  label?: string
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autoFocus?: boolean
  readonly?: boolean
  wrapperClassName?: string
  maxWidth?: boolean
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
    ...props
  }: InputProps) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      onChange?.(e.target.value)
    }
    const inputRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus()
      }
    }, [autoFocus])

    const mods: Mods = {
      [styles.readonly]: readonly,
    }

    return (
      <WithLabel
        label={label}
        wrapperClassName={wrapperClassName}
        maxWidth={maxWidth}
      >
        <input
          id={label}
          className={classNames(styles.input, mods, [
            className,
          ])}
          value={value}
          type={type}
          onChange={handleChange}
          ref={inputRef}
          /* I decided to use autofocus for forms */
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={autoFocus}
          readOnly={readonly}
          {...props}
        />
      </WithLabel>
    )
  }
)

Input.displayName = 'Input'
