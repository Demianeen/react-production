import type { HTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Card.module.scss'

export enum CardTheme {
  DEFAULT = 'default',
  OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
  noBorderRadius?: boolean
}

export const Card = memo(
  ({
    className,
    children,
    theme = CardTheme.DEFAULT,
    noBorderRadius = false,
    ...props
  }: CardProps) => {
    const mods: Mods = {
      [styles.border]: !noBorderRadius,
    }

    return (
      <article
        className={classNames(styles.card, mods, [
          className,
          styles[theme],
        ])}
        {...props}
      >
        {children}
      </article>
    )
  }
)

Card.displayName = 'Card'
