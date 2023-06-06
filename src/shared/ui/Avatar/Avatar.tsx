import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import UserIcon from '@/shared/assets/icons/user-avatar-32-32.svg'
import { Skeleton } from '../Skeleton'
import type { IconColor } from '../Icon'
import { Icon } from '../Icon'
import { AppImage } from '../AppImage'
import styles from './Avatar.module.scss'

export interface AvatarProps {
  className?: string
  /**
   * @description Avatar image source.
   */
  src?: string
  /**
   * @description Avatar width and height.
   * @default 8rem
   */
  size?: string
  /**
   * @description Avatar fallback color when image is not available.
   */
  fallbackColor?: IconColor
}

export const Avatar = ({
  className,
  src,
  size = '8rem',
  fallbackColor = 'primary',
}: AvatarProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: size,
      width: size,
    }),
    [size]
  )

  const fallback = useMemo(
    () => (
      <Skeleton
        height={size}
        width={size}
        borderRadius='50%'
      />
    ),
    [size]
  )

  const errorFallback = useMemo(
    () => (
      <Icon
        Svg={UserIcon}
        color={fallbackColor}
        height={size}
        width={size}
      />
    ),
    [fallbackColor, size]
  )

  return (
    <AppImage
      src={src}
      style={style}
      alt='avatar'
      className={classNames(styles.avatar, {}, [className])}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  )
}
