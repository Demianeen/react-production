import type { CSSProperties, ForwardedRef } from 'react'
import { useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import AvatarIcon from '@/shared/assets/icons/redesigned/avatar.svg'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { Skeleton } from '../Skeleton'
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
   * @description Avatar width and height in rem.
   * @default 8
   */
  size?: string
}

export const Avatar = typedForwardRef(
  (
    { className, src, size = '2rem' }: AvatarProps,
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    const style = useMemo<CSSProperties>(
      () => ({
        height: size,
        width: size,
      }),
      [size]
    )

    const fallback = useMemo(
      () => <Skeleton size={size} variant='circular' />,
      [size]
    )

    const errorFallback = useMemo(
      () => <Icon Svg={AvatarIcon} height={size} width={size} />,
      [size]
    )

    return (
      <AppImage
        ref={ref}
        src={src}
        style={style}
        alt='avatar'
        className={classNames(styles.avatar, {}, [className])}
        fallback={fallback}
        errorFallback={errorFallback}
      />
    )
  }
)
