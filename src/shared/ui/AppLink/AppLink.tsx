import React, { memo } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink = memo(
  ({
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...props
  }: AppLinkProps) => {
    return (
      <Link
        className={classNames(styles.navbar, {}, [
          className,
          styles[theme],
        ])}
        {...props}
      >
        {children}
      </Link>
    )
  }
)

AppLink.displayName = 'AppLink'
