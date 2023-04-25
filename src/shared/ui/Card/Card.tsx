import type { HTMLAttributes, ReactNode } from 'react'
import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const Card = memo(
  ({ className, children, ...props }: CardProps) => {
    return (
      <article
        className={classNames(styles.card, {}, [className])}
        {...props}
      >
        {children}
      </article>
    )
  }
)

Card.displayName = 'Card'
