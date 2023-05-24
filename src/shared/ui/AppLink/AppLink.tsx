import type { Ref } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { typedMemo } from 'shared/lib/react/typedMemo/typedMemo'
import { typedForwardRef } from 'shared/lib/react/typedForwardRef/typedForwardRef'
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

export const AppLink = typedMemo(
  typedForwardRef(function AppLink(
    {
      className,
      children,
      theme = AppLinkTheme.PRIMARY,
      ...props
    }: AppLinkProps,
    ref: Ref<HTMLAnchorElement>
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
  })
)
