import type { InputHTMLAttributes } from 'react'
import React, { memo, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autoFocus?: boolean
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    autoFocus,
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

    return (
      <input
        className={classNames(styles.input, {}, [
          className,
        ])}
        value={value}
        type={type}
        onChange={handleChange}
        ref={inputRef}
        /* I decided to use autofocus for forms */
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus={autoFocus}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
