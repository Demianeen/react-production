import type { Ref } from 'react'
import type { LinkProps } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import styles from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'cancel'

export interface AppLinkProps extends LinkProps {
  className?: string
  /**
   * ClassName for active link
   */
  activeClassName?: string
  /**
   * Responsible for AppLink's color and hover behaviour.
   * @default 'primary'
   */
  variant?: AppLinkVariant
}

export const AppLink = typedMemo(
  typedForwardRef(
    (
      {
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...props
      }: AppLinkProps,
      ref: Ref<HTMLAnchorElement>
    ) => (
      <NavLink
        className={({ isActive }) =>
          classNames(
            styles.appLink,
            {
              [activeClassName]: isActive,
            },
            [className, styles[variant]]
          )
        }
        {...props}
        ref={ref}
      >
        {children}
      </NavLink>
    )
  )
)
