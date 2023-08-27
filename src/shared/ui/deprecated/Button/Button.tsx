import type { ElementType, ForwardedRef, ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type {
  Props,
  WithDefaultTag,
} from '@/shared/types/asComponent'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
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

type AdditionalProps<TTag extends ElementType> = TTag extends 'button'
  ? OnlyButtonProps
  : NeverButtonProps

type ButtonOwnProps<TTag extends ElementType> = {
  className?: string
  children?: ReactNode
  /**
   * @description Button theme. Responsible for button's color and border.
   * @default ButtonTheme.OUTLINE
   */
  theme?: ButtonTheme
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
   * @description Flag to disable button when we need to disable the button when we pass it as another component's prop (e.g. Dropdown) where button disable props is used as another component prop.
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

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const Button = typedMemo(
  typedForwardRef(
    <TTag extends typeof AppLink | 'button' = typeof DEFAULT_TAG>(
      {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        squared = false,
        size = ButtonSize.M,
        disabled = false,
        disabledButton = false,
        as,
        maxWidth = false,
        ...props
      }: ButtonProps<WithDefaultTag<TTag, typeof DEFAULT_TAG>>,
      ref: ForwardedRef<WithDefaultTag<TTag, typeof DEFAULT_TAG>>
    ) => {
      const isDisabled = disabled ?? disabledButton

      const mods: Mods = {
        [styles.squared]: squared,
        [styles.disabled]: isDisabled,
        [styles.maxWidth]: maxWidth,
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
    }
  )
)
