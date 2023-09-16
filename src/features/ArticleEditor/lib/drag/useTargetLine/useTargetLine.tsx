import { useCallback, useRef } from 'react'
import { getCollapsedMargins } from '../../../ui/plugins/DraggableBlockPlugin/lib/getCollapsedMargins/getCollapsedMargins'
import styles from './useTargetLine.module.scss'

const TARGET_LINE_HALF_HEIGHT = 2
const TEXT_BOX_HORIZONTAL_PADDING = 28

export interface ShowTargetLineArgs {
  targetBlockElem: HTMLElement
  mouseY: number
}

type TargetLineReturnType = [
  JSX.Element,
  {
    showTargetLine: (args: ShowTargetLineArgs) => void
    hideTargetLine: () => void
    isTargetLineNull: boolean
  }
]

export interface TargetLineOptions {
  space: number
}

export const useTargetLine = (
  anchorElem: HTMLElement,
  { space: SPACE }: TargetLineOptions
): TargetLineReturnType => {
  const targetLineRef = useRef<HTMLDivElement>(null)

  const showTargetLine = useCallback(
    ({ targetBlockElem, mouseY }: ShowTargetLineArgs) => {
      const {
        top: targetBlockElemTop,
        height: targetBlockElemHeight,
      } = targetBlockElem.getBoundingClientRect()
      const { top: anchorTop, width: anchorWidth } =
        anchorElem.getBoundingClientRect()

      const { marginTop, marginBottom } =
        getCollapsedMargins(targetBlockElem)
      let lineTop = targetBlockElemTop
      if (mouseY >= targetBlockElemTop) {
        lineTop += targetBlockElemHeight + marginBottom / 2
      } else {
        lineTop -= marginTop / 2
      }

      const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT
      const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE

      if (targetLineRef?.current === null) return
      targetLineRef.current.style.transform = `translate(${left}px, ${top}px)`
      targetLineRef.current.style.width = `${
        anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2
      }px`
      targetLineRef.current.style.opacity = '.4'
    },
    [SPACE, anchorElem]
  )

  const hideTargetLine = useCallback(() => {
    if (targetLineRef?.current === null) return

    targetLineRef.current.style.opacity = '0'
    targetLineRef.current.style.transform =
      'translate(-10000px, -10000px)'
  }, [])

  return [
    // eslint-disable-next-line react/jsx-key
    <div className={styles.targetLine} ref={targetLineRef} />,
    {
      showTargetLine,
      hideTargetLine,
      isTargetLineNull: targetLineRef.current === null,
    },
  ]
}
