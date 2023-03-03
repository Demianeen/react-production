import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  AppLink,
  AppLinkTheme,
} from 'shared/ui/AppLink/AppLink'
import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div
      className={classNames(styles.navbar, {}, [className])}
    >
      <div className={styles.links}>
        <AppLink
          theme={AppLinkTheme.INVERTED}
          to='/'
          className={styles.homeAppLink}
        >
          Home
        </AppLink>
        <AppLink theme={AppLinkTheme.INVERTED} to='/about'>
          About
        </AppLink>
      </div>
    </div>
  )
}
