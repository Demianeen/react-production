import type { ElementType, ForwardedRef, ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { Props, WithDefaultTag } from '@/shared/types/ui'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { AppLink } from '../AppLink/AppLink'
import styles from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline'

export type ButtonSize = 'm' | 'l' | 'xl'

type OnlyButtonProps = {
  type: 'button' | 'submit' | 'reset'
}

type NeverButtonProps = {
  [K in keyof OnlyButtonProps]?: never
}

type AdditionalProps<TTag extends ElementType> = TTag extends 'button'
  ? OnlyButtonProps
  : NeverButtonProps

type ButtonOwnProps<TTag extends ElementType> = {
  className?: string
  children?: ReactNode
  /**
   * @description Button theme. Responsible for button's color and border.
   * @default 'outline'
   */
  variant?: ButtonVariant
  /**
   * @description Flag to make button squared.
   */
  squared?: boolean
  /**
   * @description Button size. Responsible for button's text size.
   */
  size?: ButtonSize
  disabled?: boolean
  /**
   * @description When we need to disable the button, but we pass it to another component's prop (e.g. Dropdown) where button disable props is used as another component prop.
   */
  disabledButton?: boolean
  /**
   * @description Tag to render button as.
   */
  as?: TTag
  /**
   * @description Flag to make button's width 100%.
   */
  maxWidth?: boolean
} & AdditionalProps<TTag>

export type ButtonProps<
  TTag extends ElementType = typeof DEFAULT_TAG
> = Props<TTag, keyof ButtonOwnProps<TTag>, ButtonOwnProps<TTag>>

const isButton = (Component: ElementType): Component is 'button' => {
  return Component === 'button'
}

const DEFAULT_TAG = 'button'

export const Button = typedMemo(
  typedForwardRef(function Button<
    TTag extends typeof AppLink | 'button' = typeof DEFAULT_TAG
  >(
    {
      className,
      children,
      variant = 'outline',
      squared = false,
      size = 'm',
      disabled = false,
      disabledButton = false,
      as,
      maxWidth = false,
      ...props
    }: ButtonProps<WithDefaultTag<TTag, typeof DEFAULT_TAG>>,
    ref: ForwardedRef<WithDefaultTag<TTag, typeof DEFAULT_TAG>>
  ) {
    const isDisabled = disabled ?? disabledButton

    const mods: Mods = {
      [styles.squared]: squared,
      [styles.disabled]: isDisabled,
      [styles.maxWidth]: maxWidth,
    }

    const classes = classNames(styles.button, mods, [
      styles[variant],
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
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      // @ts-expect-error FIXME: fix button typing
      <Tag className={classes} ref={ref} {...props}>
        {children}
      </Tag>
    )
  })
)
