import type {
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react'

import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import type { Props, WithDefaultTag } from 'shared/types/ui'
import { typedForwardRef } from 'shared/lib/react/typedForwardRef/typedForwardRef'
import styles from './Flex.module.scss'

type FlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
type FlexAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'baseline'
type FlexDirection = 'row' | 'column'
type FlexWrap = 'wrap' | 'nowrap'
type FlexGap = 0.25 | 0.5 | 1 | 1.25 | 2

const justifyMap: Record<FlexJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifySpaceBetween,
  around: styles.justifySpaceAround,
}

const alignMap: Record<FlexAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
}

const directionMap: Record<FlexDirection, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
}

const wrapMap: Record<FlexWrap, string> = {
  wrap: styles.wrap,
  nowrap: styles.nowrap,
}

/* eslint-disable @typescript-eslint/naming-convention */
const gapMap: Record<FlexGap, string> = {
  0.25: styles.gap025,
  0.5: styles.gap05,
  1: styles.gap1,
  1.25: styles.gap125,
  2: styles.gap2,
}

/* eslint-enable @typescript-eslint/naming-convention */

export interface FlexOwnProps<TTag extends ElementType> {
  className?: string
  children?: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  wrap?: FlexWrap
  gap?: FlexGap
  height?: string
  maxWidth?: boolean
  maxHeight?: boolean
  as?: TTag
}

export type FlexProps<TTag extends ElementType> = Props<
  TTag,
  keyof FlexOwnProps<TTag>
> &
  FlexOwnProps<TTag>

const DEFAULT_TAG = 'div'

export const Flex = typedForwardRef(
  <TTag extends ElementType = typeof DEFAULT_TAG>(
    {
      className,
      children,
      justify = 'start',
      align = 'start',
      direction = 'row',
      wrap,
      gap,
      height,
      maxWidth = false,
      maxHeight = false,
      as,
      ...props
    }: FlexProps<WithDefaultTag<TTag, typeof DEFAULT_TAG>>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const classes = [
      justifyMap[justify],
      alignMap[align],
      directionMap[direction],
      wrap && wrapMap[wrap],
      gap && gapMap[gap],
      className,
    ]

    const mods: Mods = {
      [styles.maxWidth]: maxWidth,
      [styles.maxHeight]: maxHeight,
    }

    const Tag = as ?? DEFAULT_TAG

    return (
      <Tag
        style={{ height }}
        className={classNames(styles.flex, mods, classes)}
        ref={ref}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
