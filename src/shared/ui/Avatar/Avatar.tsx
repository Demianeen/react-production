import type { Mods } from 'shared/libs'
import { classNames } from 'shared/libs'
import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

export const Avatar = ({
  className,
  src,
  size,
  alt,
}: AvatarProps) => {
  const mods: Mods = {}

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  )

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  )
}
