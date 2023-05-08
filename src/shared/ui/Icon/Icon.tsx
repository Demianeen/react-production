import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Icon.module.scss'

export enum IconType {
  FILL = 'fill',
  STROKE = 'stroke',
}

export type IconColor = 'primary' | 'secondary'
export const colorMap: Record<IconColor, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
}

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  type?: IconType
  color?: IconColor
}

export const Icon = memo(
  ({
    className,
    Svg,
    type = IconType.FILL,
    color,
  }: IconProps) => {
    return (
      <Svg
        className={classNames(styles.icon, {}, [
          className,
          styles[type],
          color && colorMap[color],
        ])}
      />
    )
  }
)

Icon.displayName = 'Icon'
