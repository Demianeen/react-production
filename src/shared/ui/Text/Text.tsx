import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Text.module.scss'

export enum TextTheme {
  NORMAL = 'normal',
  ERROR = 'error',
}

interface TextProps {
  className?: string
  text?: React.ReactNode
  title?: string
  theme?: TextTheme
}

export const Text = memo(
  ({
    className,
    title,
    text,
    theme = TextTheme.NORMAL,
  }: TextProps) => {
    return (
      <div
        className={classNames(styles.textContainer, {}, [
          styles[theme],
          className,
        ])}
      >
        {title && <p className={styles.title}>{title}</p>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    )
  }
)

Text.displayName = 'Text'
