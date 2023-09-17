import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback, useRef } from 'react'
import { $getNearestNodeFromDOMNode, $getNodeByKey } from 'lexical'
import { isSVG } from '@/shared/lib/html/isSvg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { eventFiles } from '@lexical/rich-text'
import { getBlockElement } from '../getBlockElement/getBlockElement'
import { useTargetLine } from '../useTargetLine/useTargetLine'

const DRAG_BLOCK = 'application/x-lexical-drag-block'

// function arg types
export interface DragoverArgs {
  event: DragEvent
  targetBlockElem: HTMLElement | null
  mouseY: number
}

interface HandleStartArgs {
  nodeKey: string
  draggableBlockElem: HTMLElement
}

// return types
interface UseDraggableReturnFunctions {
  handleDragStart: (
    event: React.DragEvent,
    args: HandleStartArgs
  ) => void
  handleDragEnd: () => void
  handleDragover: (event: DragEvent) => boolean
  handleDrop: (event: DragEvent) => boolean
}

type UseDraggableReturnType = [
  JSX.Element,
  UseDraggableReturnFunctions
]

// props
interface UseDraggableProps {
  anchorElem: HTMLElement
  space: number
}

/* eslint-disable no-param-reassign */
/**
 * Updates the drag image when a drag operation is initiated.
 *
 * @param dataTransfer - The DataTransfer object to hold the drag operation's data.
 * @param draggableBlockElem - The HTML element that is being dragged.
 */
const updateDragImage = (
  dataTransfer: DataTransfer,
  draggableBlockElem: HTMLElement
) => {
  const { transform } = draggableBlockElem.style

  // Remove dragImage borders
  draggableBlockElem.style.transform = 'translateZ(0)'
  dataTransfer.setDragImage(draggableBlockElem, 0, 0)

  // Restore the original transform style after setting the drag image
  // This is done asynchronously to ensure that the drag image captures the modified style
  setTimeout(() => {
    draggableBlockElem.style.transform = transform
  })
}
/* eslint-enable no-param-reassign */

export const useDraggable = ({
  anchorElem,
  space,
}: UseDraggableProps): UseDraggableReturnType => {
  const [editor] = useLexicalComposerContext()
  const [
    targetLine,
    { showTargetLine, hideTargetLine, isTargetLineNull },
  ] = useTargetLine(anchorElem, {
    space,
  })
  const isDraggingBlockRef = useRef<boolean>(false)

  const handleDragStart = useCallback(
    (
      event: React.DragEvent,
      { nodeKey, draggableBlockElem }: HandleStartArgs
    ) => {
      if (!event.dataTransfer) {
        return
      }
      updateDragImage(event.dataTransfer, draggableBlockElem)

      isDraggingBlockRef.current = true
      event.dataTransfer.setData(DRAG_BLOCK, nodeKey)
    },
    []
  )

  const handleDragEnd = useCallback((): void => {
    isDraggingBlockRef.current = false
    hideTargetLine()
  }, [hideTargetLine])

  const handleDragover = useCallback(
    (event: DragEvent) => {
      if (!isDraggingBlockRef.current) {
        return false
      }
      const [isFileTransfer] = eventFiles(event)
      if (isFileTransfer) {
        return false
      }
      if (!isHTMLElement(event.target) && !isSVG(event.target)) {
        return false
      }
      const targetBlockElem = getBlockElement(
        anchorElem,
        editor,
        event,
        true
      )

      if (targetBlockElem === null || isTargetLineNull) {
        return false
      }

      showTargetLine({
        targetBlockElem,
        mouseY: event.pageY,
      })
      // Prevent default event to be able to trigger onDrop events
      event.preventDefault()

      return true
    },
    [anchorElem, editor, isTargetLineNull, showTargetLine]
  )

  const handleDrop = useCallback(
    (event: DragEvent) => {
      if (isDraggingBlockRef.current) {
        event.preventDefault()
      }

      const [isFileTransfer] = eventFiles(event)
      if (isFileTransfer) {
        return false
      }

      const dragData = event.dataTransfer?.getData(DRAG_BLOCK) || ''
      const draggedNode = $getNodeByKey(dragData)
      if (!draggedNode) {
        return false
      }

      if (!isHTMLElement(event.target) && !isSVG(event.target)) {
        return false
      }

      const targetBlockElem = getBlockElement(
        anchorElem,
        editor,
        event,
        true
      )

      if (!targetBlockElem) {
        return false
      }

      const targetNode = $getNearestNodeFromDOMNode(targetBlockElem)

      if (!targetNode) {
        return false
      }

      if (targetNode === draggedNode) {
        return false
      }

      const targetBlockElemTop =
        targetBlockElem.getBoundingClientRect().top
      if (event.pageY >= targetBlockElemTop) {
        targetNode.insertAfter(draggedNode)
      } else {
        targetNode.insertBefore(draggedNode)
      }

      return true
    },
    [anchorElem, editor]
  )

  return [
    targetLine,
    {
      handleDragStart,
      handleDragEnd,
      handleDragover,
      handleDrop,
    },
  ]
}
