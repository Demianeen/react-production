import type { CSSProperties } from 'react'
import React, { useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Avatar.module.scss'

export interface AvatarProps {
  className?: string
  src: string
  size?: string
}

export const Avatar = ({
  className,
  src,
  size,
}: AvatarProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: size ?? '8rem',
      width: size ?? '8rem',
    }),
    [size]
  )

  return (
    <img
      src={src}
      style={style}
      alt='avatar'
      className={classNames(styles.avatar, {}, [className])}
    />
  )
}
