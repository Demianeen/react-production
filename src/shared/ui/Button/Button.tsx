import type {
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { typedMemo } from 'shared/lib/react/typedMemo/typedMemo'
import type { Props, WithDefaultTag } from 'shared/types/ui'
import { typedForwardRef } from 'shared/lib/react/typedForwardRef/typedForwardRef'
import type { AppLink } from '../AppLink/AppLink'
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

type OnlyButtonProps = {
  type: 'button' | 'submit' | 'reset'
}

type NeverButtonProps = {
  [K in keyof OnlyButtonProps]?: never
}

type AdditionalProps<TTag extends ElementType> =
  TTag extends 'button' ? OnlyButtonProps : NeverButtonProps

type ButtonOwnProps<TTag extends ElementType> = {
  className?: string
  children?: ReactNode
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  // in case we need to disable the button when we pass it as another component's prop (e.g. Dropdown) where we don't have access to the button's disabled prop
  disabledButton?: boolean
  as?: TTag
} & AdditionalProps<TTag>

export type ButtonProps<
  TTag extends ElementType = typeof DEFAULT_TAG
> = Props<
  TTag,
  keyof ButtonOwnProps<TTag>,
  ButtonOwnProps<TTag>
>

const isButton = (
  Component: ElementType
): Component is 'button' => {
  return Component === 'button'
}

const DEFAULT_TAG = 'button'

export const Button = typedMemo(
  typedForwardRef(function Button<
    TTag extends
      | typeof AppLink
      | 'button' = typeof DEFAULT_TAG
  >(
    {
      className,
      children,
      theme = ButtonTheme.OUTLINE,
      square = false,
      size = ButtonSize.M,
      disabled = false,
      disabledButton = false,
      as,
      ...props
    }: ButtonProps<
      WithDefaultTag<TTag, typeof DEFAULT_TAG>
    >,
    ref: ForwardedRef<
      WithDefaultTag<TTag, typeof DEFAULT_TAG>
    >
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

    const Tag = as ?? DEFAULT_TAG

    if (isButton(Tag)) {
      return (
        <button
          className={classes}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          disabled={isDisabled}
          /* eslint-disable-next-line react/button-has-type */
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      // @ts-expect-error FIXME: fix typing
      <Tag
        className={classes}
        ref={ref}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      >
        {children}
      </Tag>
    )
  })
)
