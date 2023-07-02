import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { TestProps } from '@/shared/types/tests'
import styles from './Text.module.scss'

export enum TextTheme {
  NORMAL = 'normal',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextSize {
  S = 'small',
  M = 'medium',
  L = 'large',
}

interface TextProps extends TestProps {
  className?: string
  /**
   * @description The text to display
   */
  text?: string
  /**
   * @description The title attribute for the text
   */
  textTitle?: string
  /**
   * @description The tag to use for the text
   */
  TextTag?: 'p' | 'span'
  /**
   * @description The title of the text
   */
  title?: string
  /**
   * @description The title attribute for the title
   */
  titleTitle?: string
  /**
   * @description The tag to use for the title
   */
  TitleTag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /**
   * @description The theme of the text. Changes the color
   * @default TextTheme.NORMAL
   */
  theme?: TextTheme
  /**
   * @description The text alignment
   */
  align?: TextAlign
  /**
   * @description The size of the text
   * @default TextSize.M
   */
  size?: TextSize
}

type HeaderTag = 'h1' | 'h2' | 'h3'
const mapSizeToDefaultHeaderTag: Record<TextSize, HeaderTag> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const Text = memo(
  ({
    className,
    title,
    titleTitle,
    TitleTag,
    text,
    textTitle,
    TextTag = 'p',
    theme = TextTheme.NORMAL,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Text',
  }: TextProps) => {
    const HeaderTag = TitleTag ?? mapSizeToDefaultHeaderTag[size]

    return (
      <div
        className={classNames(styles.textContainer, {}, [
          styles[theme],
          styles[align],
          styles[size],
          className,
        ])}
      >
        {title != null && (
          <HeaderTag
            title={titleTitle}
            className={styles.title}
            data-testid={`${dataTestId}.Title`}
          >
            {title}
          </HeaderTag>
        )}
        {text != null && (
          <TextTag
            title={textTitle}
            className={styles.text}
            data-testid={`${dataTestId}.Paragraph`}
          >
            {text}
          </TextTag>
        )}
      </div>
    )
  }
)

Text.displayName = 'Text'
