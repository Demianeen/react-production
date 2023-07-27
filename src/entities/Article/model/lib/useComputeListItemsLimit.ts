import { View } from '@/entities/ListFilters'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { useMedia } from '@/shared/lib/hooks/useMedia/useMedia'
import { useCallback, useEffect } from 'react'

/**
 * Computes width and height of the container and item and returns amount of items to render.
 * @returns amount of items to render
 */
import { useState } from 'react'

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

  if (containerRef == null) {
    return 0
  }

  const elementWidth = containerRef.scrollWidth
  console.log(containerRef.offsetWidth)
  console.log(containerRef.clientWidth)
  const elementHeight = Math.min(
    containerRef.clientHeight,
    window.innerHeight
  )

  console.log('elementWidth', elementWidth)
  console.log('elementHeight', elementHeight)

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

  console.log('widthAmount', widthAmount)
  console.log('heightAmount', heightAmount)

  return widthAmount * heightAmount
}

export const useComputeListItemsLimit = ({
  view,
  containerRef,
  gridItemWidth = 200,
  gridItemHeight = 320,
}: ComputeListItemsLimitArgs) => {
  const [itemsLimit, setItemsLimit] = useState(0)

  const handleCompute = useCallback(() => {
    const limit = computeListItemsLimit({
      view,
      containerRef,
      gridItemWidth,
      gridItemHeight,
    })
    setItemsLimit(limit)
  }, [view, containerRef, gridItemWidth, gridItemHeight])

  useEffect(() => {
    handleCompute()
  }, [handleCompute])

  const debouncedHandleCompute = useDebounce(handleCompute, 1000)

  useMedia(debouncedHandleCompute)

  return itemsLimit
}
