import { View } from '@/entities/ListFilters'
import { useMemo } from 'react'
import styles from '../../ui/ArticleList/ArticleList.module.scss'

export interface UseComputeListItemsLimitArgs {
  view: View
  /**
   * This ref is used to calculate the width for amount of skeletons to render.
   */
  widthContainerRef: HTMLDivElement | null
  /**
   * This ref is used to calculate the height for amount of skeletons to render.
   * @default window
   */
  heightContainerRef?: HTMLDivElement | null
  /**
   * Computes from item className by default. If provided, will be used instead.
   */
  itemWidth?: number
}

/**
 * Computes width and height of the container and item and returns amount of items to render.
 * @returns amount of items to render
 */
export const useComputeListItemsLimit = ({
  view,
  widthContainerRef,
  heightContainerRef,
  itemWidth,
}: UseComputeListItemsLimitArgs) => {
  return useMemo(() => {
    if (view === View.LIST) {
      return 1
    }

    if (widthContainerRef === null) {
      return 0
    }

    const elementWidth = widthContainerRef.scrollWidth

    const listElement = widthContainerRef.querySelector(
      `.${styles.item}`
    )
    const listElementWidth =
      itemWidth ?? listElement?.clientWidth ?? 200
    const listElementHeight = listElement?.clientHeight ?? 320

    let elementHeight
    if (heightContainerRef != null) {
      const heightComputedStyle = getComputedStyle(heightContainerRef)
      elementHeight = heightContainerRef?.clientHeight // height with padding
      elementHeight -=
        parseFloat(heightComputedStyle.paddingTop) +
        parseFloat(heightComputedStyle.paddingBottom)
    } else {
      elementHeight = window.innerHeight
    }

    const widthAmount = Math.floor(elementWidth / listElementWidth)
    const heightAmount =
      Math.floor((elementHeight - 32) / listElementHeight) || 1

    return widthAmount * heightAmount
  }, [view, widthContainerRef, itemWidth, heightContainerRef])
}
