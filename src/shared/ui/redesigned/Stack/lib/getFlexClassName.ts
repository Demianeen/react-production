import {
  classNamesNew,
  type Mods,
} from '@/shared/lib/classNames/classNamesNew'
import styles from '../Flex/Flex.module.scss'

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around'
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type FlexDirection = 'row' | 'column'
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

const gapMap: Record<FlexGap, string> = {
  0.25: styles.gap025,
  0.5: styles.gap05,
  1: styles.gap1,
  1.25: styles.gap125,
  2: styles.gap2,
}

export interface GetFlexClassNameProps {
  /**
   * @description Justify content css property
   */
  justify?: FlexJustify
  /**
   * @description Align items css property
   */
  align?: FlexAlign
  /**
   * @description Flex direction css property
   */
  direction: FlexDirection
  /**
   * @description Flex wrap css property
   */
  wrap?: FlexWrap
  /**
   * @description Gap between flex items
   */
  gap?: FlexGap
  /**
   * @description Flag to set width: 100%
   */
  maxWidth?: boolean
  /**
   * @description Flag to set height: 100%
   */
  maxHeight?: boolean
}
export const getFlexClassName = ({
  justify = 'start',
  align = 'start',
  direction,
  wrap,
  gap,
  maxWidth = false,
  maxHeight = false,
}: GetFlexClassNameProps) => {
  const mods: Mods = {
    [styles.maxWidth]: maxWidth,
    [styles.maxHeight]: maxHeight,
  }

  return classNamesNew(
    styles.flex,
    mods,
    justifyMap[justify],
    alignMap[align],
    directionMap[direction],
    wrap && wrapMap[wrap],
    gap && gapMap[gap],
  )
}
