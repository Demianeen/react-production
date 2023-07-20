import { View } from '@/entities/ListFilters'
import { useMemo } from 'react'

export interface UseComputeListItemsLimitItemArgs {
  /**
   * Item width used in computations
   * @default 200
   */
  itemWidth?: number
  /**
   * Item height used in computations
   * @default 320
   */
  itemHeight?: number
}

export interface UseComputeListItemsLimitArgs
  extends UseComputeListItemsLimitItemArgs {
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
}

/**
 * Computes width and height of the container and item and returns amount of items to render.
 * @returns amount of items to render
 */
export const useComputeListItemsLimit = ({
  view,
  widthContainerRef,
  heightContainerRef,
  itemWidth = 200,
  itemHeight = 320,
}: UseComputeListItemsLimitArgs) => {
  return useMemo(() => {
    if (view === View.LIST) {
      return 1
    }

    if (widthContainerRef === null) {
      return 0
    }

    const elementWidth = widthContainerRef.scrollWidth

    let elementHeight
    if (heightContainerRef != null) {
      const heightComputedStyle = getComputedStyle(heightContainerRef)
      elementHeight = heightContainerRef?.clientHeight // height with padding
      elementHeight -=
        parseFloat(heightComputedStyle.paddingTop) +
        parseFloat(heightComputedStyle.paddingBottom)
    } else {
      elementHeight = window.innerHeight - 32
    }

    const widthAmount = Math.floor(elementWidth / itemWidth)
    const heightAmount = Math.floor(elementHeight / itemHeight) || 1

    return widthAmount * heightAmount
  }, [
    view,
    widthContainerRef,
    heightContainerRef,
    itemWidth,
    itemHeight,
  ])
}
