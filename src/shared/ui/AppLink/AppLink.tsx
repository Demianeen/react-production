import type { ForwardRefExoticComponent, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { typedMemo } from 'shared/lib/react/typedMemo/typedMemo'
import styles from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  RED = 'red',
}

export interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink = typedMemo<
  ForwardRefExoticComponent<
    AppLinkProps & { ref?: Ref<HTMLAnchorElement> }
  >
>(
  forwardRef<HTMLAnchorElement, AppLinkProps>(
    function AppLink(
      {
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...props
      },
      ref
    ) {
      return (
        <Link
          className={classNames(styles.appLink, {}, [
            className,
            styles[theme],
          ])}
          {...props}
          ref={ref}
        >
          {children}
        </Link>
      )
    }
  )
)

AppLink.displayName = 'AppLink'
