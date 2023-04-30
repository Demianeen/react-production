import type { HTMLAttributes, ReactNode } from 'react'
import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Card.module.scss'

export enum CardTheme {
  DEFAULT = 'default',
  OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}

export const Card = memo(
  ({
    className,
    children,
    theme = CardTheme.DEFAULT,
    ...props
  }: CardProps) => {
    return (
      <article
        className={classNames(styles.card, {}, [
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
