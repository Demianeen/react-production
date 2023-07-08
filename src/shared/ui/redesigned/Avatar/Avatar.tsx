import type { CSSProperties, ForwardedRef } from 'react'
import { useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import AvatarIcon from '@/shared/assets/icons/redesigned/avatar.svg'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { routes } from '@/shared/lib/router/routes'
import type { User } from '@/entities/User'
import { AppLink } from '../AppLink'
import { HStack } from '../Stack'
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
   * @description Avatar width and height.
   * @default 2rem
   */
  size?: string
  /**
   * Adds a username to the avatar and makes it a link to the user's profile.
   */
  user?: User
}

export const Avatar = typedForwardRef(
  (
    { className, src, user, size = '2rem' }: AvatarProps,
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

    const avatar = useMemo(
      () => (
        <AppImage
          ref={ref}
          src={src}
          style={style}
          alt='avatar'
          className={classNames(styles.avatar, {}, [className])}
          fallback={fallback}
          errorFallback={errorFallback}
        />
      ),
      [ref, src, style, className, fallback, errorFallback]
    )

    if (user !== undefined) {
      return (
        <HStack
          gap={0.5}
          as={AppLink}
          to={routes.profile({
            id: String(user.id),
          })}
        >
          {avatar}
          <b>{user.username}</b>
        </HStack>
      )
    }

    return avatar
  }
)
