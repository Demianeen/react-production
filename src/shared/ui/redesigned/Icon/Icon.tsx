import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import type { ForwardedRef } from 'react'
import { Button } from '../Button'
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

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
  onClick?: never
  noWrapWithButton?: never
}

interface ClickableIconProps extends IconBaseProps {
  clickable?: true
  onClick?: () => void
  noWrapWithButton?: boolean
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
        ...props
      }: IconProps,
      ref: ForwardedRef<'button' | SVGSVGElement>
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
              className={classNames(styles.icon, mods, [
                styles.iconButton,
                className,
              ])}
              onClick={onClick}
              {...defaultSvgProps}
            />
          )
        }

        return (
          <Button
            type='button'
            onClick={onClick}
            className={classNames(styles.button, {}, [className])}
            variant='clear'
            style={{
              width,
              height,
            }}
            ref={ref as ForwardedRef<'button'>}
          >
            <Svg
              className={classNames(styles.icon, mods, [])}
              {...defaultSvgProps}
            />
          </Button>
        )
      }

      return (
        <Svg
          className={classNames(styles.icon, mods, [className])}
          ref={ref as ForwardedRef<SVGSVGElement>}
          aria-hidden='true'
          {...defaultSvgProps}
        />
      )
    }
  )
)
