import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import styles from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  /**
   * @description Flag to make card width 100%.
   */
  maxWidth?: boolean
  /**
   * @default 1.5
   */
  padding?: 0 | 0.5 | 1 | 1.5
  background?: 'light' | 'dark'
}

const mapPadding = {
  0: styles.padding0,
  0.5: styles.padding0_5,
  1: styles.padding1,
  1.5: styles.padding1_5,
}

export const Card = typedMemo(
  typedForwardRef(
    (
      {
        className,
        children,
        maxWidth = false,
        padding = 1.5,
        background = 'dark',
        ...props
      }: CardProps,
      ref: ForwardedRef<HTMLDivElement>,
    ) => {
      const mods: Mods = {
        [styles.maxWidth]: maxWidth,
      }

      return (
        <article
          className={classNames(styles.card, mods, [
            className,
            mapPadding[padding],
            styles[background],
          ])}
          {...props}
          ref={ref}
        >
          {children}
        </article>
      )
    },
  ),
)
