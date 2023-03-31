import React, { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
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
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  theme = '',
  square = false,
  size = ButtonSize.M,
  ...props
}) => {
  const mods = {
    [styles.square]: square,
  }
  return (
    <button
      type='button'
      className={classNames(styles.button, mods, [
        styles[theme],
        styles[size],
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  )
}
