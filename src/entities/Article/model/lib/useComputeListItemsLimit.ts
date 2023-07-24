import { View } from '@/entities/ListFilters'
import { useMemo } from 'react'

export interface ComputeListItemsLimitItemArgs {
  /**
   * Item width used in computations
   * @default 200
   */
  gridItemWidth?: number
  /**
   * Item height used in computations
   * @default 320
   */
  gridItemHeight?: number
}

export interface ComputeListItemsLimitArgs
  extends ComputeListItemsLimitItemArgs {
  view: View
  /**
   * This ref is used to calculate the width and height for amount of skeletons to render.
   */
  containerRef: HTMLDivElement | null
}

/**
 * Computes width and height of the container and item and returns amount of items to render.
 * @returns amount of items to render
 */
export const computeListItemsLimit = ({
  view,
  containerRef,
  gridItemWidth = 200,
  gridItemHeight = 320,
}: ComputeListItemsLimitArgs) => {
  if (view === View.LIST) {
    return 1
  }

  if (containerRef === null) {
    return 0
  }

  const elementWidth = containerRef.scrollWidth
  const elementHeight = Math.min(
    containerRef.clientHeight,
    window.innerHeight
  )

  // 48 is a grid gap
  const widthGridGap = 48
  const heightGridGap = 48

  const widthAmount = Math.floor(
    // we add grid gap to the width to make sure we have enough space for the last item
    (elementWidth + widthGridGap) / (gridItemWidth + widthGridGap)
  )
  const heightAmount =
    Math.floor(
      // we add grid gap to the height to make sure we have enough space for the last item
      (elementHeight + heightGridGap) /
        (gridItemHeight + heightGridGap)
    ) || 1

  return widthAmount * heightAmount
}

/**
 * Computes width and height of the container and item and returns amount of items to render.
 * @returns amount of items to render
 */
export const useComputeListItemsLimit = ({
  view,
  containerRef,
  gridItemWidth = 200,
  gridItemHeight = 320,
}: ComputeListItemsLimitArgs) => {
  return useMemo(
    () =>
      computeListItemsLimit({
        view,
        containerRef,
        gridItemWidth,
        gridItemHeight,
      }),
    [view, containerRef, gridItemWidth, gridItemHeight]
  )
}
