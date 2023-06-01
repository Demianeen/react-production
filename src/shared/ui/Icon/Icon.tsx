import type { SVGProps } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Icon.module.scss'
import type Svg from '*.svg'

export enum IconType {
  // when we need to control the color of the icon
  NONE = 'none',
  FILL = 'fill',
  STROKE = 'stroke',
  BOTH = 'both',
}

export type IconColor =
  | 'primary'
  | 'secondary'
  | 'invertedPrimary'
  | 'invertedSecondary'

export const colorMap: Record<IconColor, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  invertedPrimary: styles.invertedPrimary,
  invertedSecondary: styles.invertedSecondary,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
  /**
   * @description Icon component
   */
  Svg: Svg
  /**
   * @description Icon fill type
   * @default IconType.FILL
   */
  type?: IconType
  /**
   * @description Icon color
   */
  color?: IconColor
}

export const Icon = memo(
  ({
    className,
    Svg,
    type = IconType.FILL,
    color,
    ...props
  }: IconProps) => {
    return (
      <Svg
        className={classNames(styles.icon, {}, [
          className,
          styles[type],
          color && colorMap[color],
        ])}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'
