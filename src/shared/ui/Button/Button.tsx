import type {
  ButtonHTMLAttributes,
  ForwardedRef,
} from 'react'
import React, { forwardRef } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { typedMemo } from 'shared/lib/typedMemo/typedMemo'
import styles from './Button.module.scss'
import type { AppLinkProps } from '../AppLink/AppLink'
import { AppLink } from '../AppLink/AppLink'

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

interface ButtonOwnProps {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  // in case we need to disable the button when we pass it as another component's prop (e.g. Dropdown) where we don't have access to the button's disabled prop
  disabledButton?: boolean
}

interface ButtonOwnPropsButton extends ButtonOwnProps {
  type: 'button' | 'submit' | 'reset'
  // button is default tag
  as?: never
}

type OmittedButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonOwnPropsButton
>

type ButtonPropsButton = ButtonOwnPropsButton &
  OmittedButtonProps

interface ButtonOwnPropsAppLink extends ButtonOwnProps {
  type?: never
  as: typeof AppLink
}

type OmittedAppLinkProps = Omit<
  AppLinkProps,
  keyof ButtonOwnPropsAppLink
>
type ButtonPropsAppLink = ButtonOwnPropsAppLink &
  OmittedAppLinkProps

export type ButtonProps =
  | ButtonPropsButton
  | ButtonPropsAppLink

const isAppLink = (
  Component: typeof AppLink | undefined,
  _props: OmittedAppLinkProps | OmittedButtonProps
): _props is OmittedAppLinkProps => {
  return Component === AppLink
}

// TODO: remake with generic type
export const Button = typedMemo(
  forwardRef(function Button(
    {
      className,
      children,
      theme = ButtonTheme.OUTLINE,
      square = false,
      size = ButtonSize.M,
      disabled = false,
      disabledButton = false,
      type,
      as,
      ...props
    }: ButtonProps,
    ref:
      | ForwardedRef<HTMLButtonElement>
      | ForwardedRef<HTMLAnchorElement>
  ) {
    const isDisabled = disabled ?? disabledButton
    const mods: Mods = {
      [styles.square]: square,
      [styles.disabled]: isDisabled,
    }
    const classes = classNames(styles.button, mods, [
      styles[theme],
      styles[size],
      className,
    ])

    if (isAppLink(as, props)) {
      return (
        <AppLink
          className={classes}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...props}
        >
          {children}
        </AppLink>
      )
    }

    return (
      <button
        className={classes}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        disabled={isDisabled}
        /* eslint-disable-next-line react/button-has-type */
        type={type}
        {...(props as OmittedButtonProps)}
      >
        {children}
      </button>
    )
  })
)
