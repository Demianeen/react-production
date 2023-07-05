import type { ElementType, ForwardedRef, ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNamesNew as classNames } from '@/shared/lib/classNames/classNamesNew'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { Props, WithDefaultTag } from '@/shared/types/ui'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { AppLink } from '../AppLink/AppLink'
import styles from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

export type ButtonSize = 'm' | 'l' | 'xl'

export type ButtonPaddings =
  | 'none'
  | 'vertical'
  | 'horizontal'
  | 'all'

const mapPaddings: Record<ButtonPaddings, string> = {
  none: '',
  vertical: styles.verticalPadding,
  horizontal: styles.horizontalPadding,
  all: classNames(styles.verticalPadding, styles.horizontalPadding),
}

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
   * Button theme. Responsible for button's color and border.
   * @default 'outline'
   */
  variant?: ButtonVariant
  /**
   * Flag to make button squared.
   */
  squared?: boolean
  /**
   * Button size. Responsible for button's text size.
   */
  size?: ButtonSize
  disabled?: boolean
  /**
   * When we need to disable the button, but we pass it to another component's prop (e.g. Dropdown) where button disable props is used as another component prop.
   */
  disabledButton?: boolean
  /**
   * Tag to render button as.
   */
  as?: TTag
  /**
   * Flag to make button's width 100%.
   */
  maxWidth?: boolean
  /**
   * Button paddings.
   * @default 'all', or 'none' for variant 'clear'
   */
  paddings?: ButtonPaddings
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
      paddings = variant === 'clear' ? 'none' : 'all',
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

    const classes = classNames(
      styles.button,
      mods,
      styles[variant],
      styles[size],
      className,
      mapPaddings[paddings]
    )

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
