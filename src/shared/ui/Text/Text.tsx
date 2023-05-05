import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Text.module.scss'

export enum TextTheme {
  DEFAULT = 'normal',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextSize {
  M = 'medium',
  L = 'large',
}

interface TextProps {
  className?: string
  text?: string
  textTitle?: string
  title?: string
  titleTitle?: string
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
}

export const Text = memo(
  ({
    className,
    title,
    titleTitle,
    text,
    textTitle,
    theme = TextTheme.DEFAULT,
    align = TextAlign.LEFT,
    size = TextSize.M,
  }: TextProps) => {
    return (
      <div
        className={classNames(styles.textContainer, {}, [
          styles[theme],
          styles[align],
          styles[size],
          className,
        ])}
      >
        {title && (
          <>
            {size === TextSize.L ? (
              <h1
                title={titleTitle}
                className={styles.title}
              >
                {title}
              </h1>
            ) : (
              <h2
                title={titleTitle}
                className={styles.title}
              >
                {title}
              </h2>
            )}
          </>
        )}
        {text && (
          <p title={textTitle} className={styles.text}>
            {text}
          </p>
        )}
      </div>
    )
  }
)

Text.displayName = 'Text'
