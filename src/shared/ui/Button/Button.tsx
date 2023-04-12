import type { ButtonHTMLAttributes } from 'react'
import React, { memo } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'medium',
  L = 'large',
  XL = 'extraLarge',
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
}

export const Button = memo(
  ({
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square = false,
    size = ButtonSize.M,
    type = 'button',
    disabled = false,
    ...props
  }: ButtonProps) => {
    const mods: Mods = {
      [styles.square]: square,
      [styles.disabled]: disabled,
    }
    return (
      <button
        className={classNames(styles.button, mods, [
          styles[theme],
          styles[size],
          className,
        ])}
        /* we have type button by default as button */
        /* eslint-disable-next-line react/button-has-type */
        type={type}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
