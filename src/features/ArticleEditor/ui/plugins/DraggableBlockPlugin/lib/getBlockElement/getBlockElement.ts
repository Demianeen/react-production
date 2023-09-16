import type { LexicalEditor } from 'lexical'
import { $getRoot } from 'lexical'
import { getCollapsedMargins } from '../getCollapsedMargins/getCollapsedMargins'
import { Point } from '../../../../../lib/shapes/point'
import { Rect } from '../../../../../lib/shapes/rect'

enum Direction {
  UPWARD = -1,
  INDETERMINATE = 0,
  DOWNWARD = 1,
}

let prevIndex = Infinity

const getTopLevelNodeKeys = (editor: LexicalEditor): string[] =>
  editor.getEditorState().read(() => $getRoot().getChildrenKeys())

const getCurrentIndex = (keysLength: number): number => {
  if (keysLength === 0) {
    return Infinity
  }
  if (prevIndex >= 0 && prevIndex < keysLength) {
    return prevIndex
  }

  return Math.floor(keysLength / 2)
}

export const getBlockElement = (
  anchorElem: HTMLElement,
  editor: LexicalEditor,
  event: MouseEvent,
  useEdgeAsDefault = false
): HTMLElement | null => {
  const anchorElementRect = anchorElem.getBoundingClientRect()
  const topLevelNodeKeys = getTopLevelNodeKeys(editor)

  let blockElem: HTMLElement | null = null

  editor.getEditorState().read(() => {
    if (useEdgeAsDefault) {
      const firstNode = editor.getElementByKey(topLevelNodeKeys[0])
      const lastNode = editor.getElementByKey(
        topLevelNodeKeys[topLevelNodeKeys.length - 1]
      )
      const firstNodeRect = firstNode?.getBoundingClientRect()
      const lastNodeRect = lastNode?.getBoundingClientRect()

      if (firstNodeRect && event.y < firstNodeRect.top) {
        blockElem = firstNode
        return
      }
      if (lastNodeRect && event.y > lastNodeRect.bottom) {
        blockElem = lastNode
        return
      }
    }

    let index = getCurrentIndex(topLevelNodeKeys.length)
    let direction = Direction.INDETERMINATE

    while (index >= 0 && index < topLevelNodeKeys.length) {
      const key = topLevelNodeKeys[index]
      const elem = editor.getElementByKey(key)
      if (elem === null) {
        break
      }
      const point = new Point(event.x, event.y)
      const domRect = Rect.fromDOM(elem)
      const { marginTop, marginBottom } = getCollapsedMargins(elem)

      const rect = domRect.generateNewRect({
        bottom: domRect.bottom + marginBottom,
        left: anchorElementRect.left,
        right: anchorElementRect.right,
        top: domRect.top - marginTop,
      })

      const {
        result,
        reason: { isOnTopSide, isOnBottomSide },
      } = rect.contains(point)

      if (result) {
        blockElem = elem
        prevIndex = index
        break
      }

      if (direction === Direction.INDETERMINATE) {
        if (isOnTopSide) {
          direction = Direction.UPWARD
        } else if (isOnBottomSide) {
          direction = Direction.DOWNWARD
        } else {
          // stop search block element
          direction = Infinity
        }
      }

      index += direction
    }
  })

  return blockElem
}
