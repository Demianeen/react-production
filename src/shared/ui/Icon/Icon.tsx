import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Icon.module.scss'

export enum IconType {
  FILL = 'fill',
  STROKE = 'stroke',
}

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  type?: IconType
}

export const Icon = memo(
  ({ className, Svg, type = IconType.FILL }: IconProps) => {
    return (
      <Svg
        className={classNames(styles.icon, {}, [
          className,
          styles[type],
        ])}
      />
    )
  }
)

Icon.displayName = 'Icon'
