import type { Mods } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { ForwardedRef } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import type { Position } from '@/shared/types/position'
import { TooltipButton } from '../TooltipButton'
import type { ButtonProps } from '../Button'
import styles from './Icon.module.scss'

type SVGProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SVGProps {
  className?: string
  /**
   * @description Icon component
   */
  Svg: Svg
  disabled?: boolean
}

type NonClickableIconProps = IconBaseProps &
  AllPropsNever<ButtonIconProps> & {
    clickable?: false
  }

interface ButtonIconProps {
  onClick?: () => void
  noWrapWithButton?: false
  iconClassName?: string
  buttonProps?: Partial<Omit<ButtonProps<'button'>, 'children'>>
  // tooltip
  tooltipPosition?: Position
  tooltipText: string
  disableTooltip?: boolean
  text?: string
  color?: 'default' | 'error'
}

interface NoWrappedButtonProps {
  onClick?: () => void
  noWrapWithButton: true
  buttonProps?: never
  tooltipPosition?: never
  tooltipText?: never
  disableTooltip?: never
  iconClassName?: never
  text?: never
}

type ClickableIconProps = IconBaseProps &
  (ButtonIconProps | NoWrappedButtonProps) & {
    clickable?: true
  }

export type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = typedMemo(
  typedForwardRef(
    (
      {
        className,
        Svg,
        width = '2rem',
        height = '2rem',
        clickable = false,
        onClick,
        disabled = false,
        noWrapWithButton = false,
        iconClassName,
        buttonProps,
        tooltipText,
        tooltipPosition,
        disableTooltip,
        color = 'default',
        ...props
      }: IconProps,
      ref: ForwardedRef<'button' | SVGSVGElement>,
    ) => {
      const mods: Mods = {
        [styles.disabled]: disabled,
      }

      const defaultSvgProps = {
        width,
        height,
        ...props,
      }

      if (onClick || clickable) {
        if (noWrapWithButton) {
          return (
            <Svg
              className={classNamesNew(
                styles.icon,
                mods,
                styles.iconButton,
                className,
                styles[color],
              )}
              onClick={onClick}
              {...defaultSvgProps}
            />
          )
        }

        return (
          <TooltipButton
            tooltipText={tooltipText as string}
            tooltipPosition={tooltipPosition}
            disableTooltip={disableTooltip}
            type='button'
            onClick={onClick}
            className={classNamesNew(styles.button, className)}
            variant='clear'
            style={{
              width,
              height,
            }}
            ref={ref as ForwardedRef<'button'>}
            {...buttonProps}
          >
            <Svg
              className={classNamesNew(
                styles.icon,
                iconClassName,
                mods,
                styles[color],
              )}
              {...defaultSvgProps}
            />
          </TooltipButton>
        )
      }

      return (
        <Svg
          className={classNamesNew(
            styles.icon,
            mods,
            className,
            styles[color],
          )}
          ref={ref as ForwardedRef<SVGSVGElement>}
          aria-hidden='true'
          {...defaultSvgProps}
        />
      )
    },
  ),
)
