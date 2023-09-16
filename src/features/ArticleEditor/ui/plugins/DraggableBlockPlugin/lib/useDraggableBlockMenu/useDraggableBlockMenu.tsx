/* eslint-disable no-param-reassign */
import { eventFiles } from '@lexical/rich-text'
import { mergeRegister } from '@lexical/utils'
import type { LexicalEditor } from 'lexical'
import {
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
} from 'lexical'
import * as React from 'react'
import type { DragEvent as ReactDragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/shared/ui/deprecated/Icon'
import DraggableIcon from '@/shared/assets/icons/redesigned/textEditor/draggable.svg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { isSVG } from '@/shared/lib/html/isSvg'
import { getCollapsedMargins } from '../getCollapsedMargins/getCollapsedMargins'
import { getBlockElement } from '../getBlockElement/getBlockElement'
import styles from './useDraggableBlockPlugin.module.scss'

const SPACE = 4
const TARGET_LINE_HALF_HEIGHT = 2
const DRAGGABLE_BLOCK_MENU_ID = 'draggable-block-menu'
const DRAG_BLOCK = 'application/x-lexical-drag-block'
const TEXT_BOX_HORIZONTAL_PADDING = 28

const isOnMenu = (element: HTMLElement | SVGElement): boolean => {
  return Boolean(element.closest(`#${DRAGGABLE_BLOCK_MENU_ID}`))
}

const setMenuPosition = (
  targetElem: HTMLElement | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement
) => {
  if (!targetElem) {
    floatingElem.style.opacity = '0'
    floatingElem.style.transform = 'translate(-10000px, -10000px)'
    return
  }

  const targetRect = targetElem.getBoundingClientRect()
  const targetStyle = window.getComputedStyle(targetElem)
  const floatingElemRect = floatingElem.getBoundingClientRect()
  const anchorElementRect = anchorElem.getBoundingClientRect()

  const top =
    targetRect.top +
    (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) /
      2 -
    anchorElementRect.top

  const left = SPACE

  floatingElem.style.opacity = '1'
  floatingElem.style.transform = `translate(${left}px, ${top}px)`
}

const setDragImage = (
  dataTransfer: DataTransfer,
  draggableBlockElem: HTMLElement
) => {
  const { transform } = draggableBlockElem.style

  // Remove dragImage borders
  draggableBlockElem.style.transform = 'translateZ(0)'
  dataTransfer.setDragImage(draggableBlockElem, 0, 0)

  setTimeout(() => {
    draggableBlockElem.style.transform = transform
  })
}

const setTargetLine = (
  targetLineElem: HTMLElement,
  targetBlockElem: HTMLElement,
  mouseY: number,
  anchorElem: HTMLElement
) => {
  const { top: targetBlockElemTop, height: targetBlockElemHeight } =
    targetBlockElem.getBoundingClientRect()
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

  targetLineElem.style.transform = `translate(${left}px, ${top}px)`
  targetLineElem.style.width = `${
    anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2
  }px`
  targetLineElem.style.opacity = '.4'
}

const hideTargetLine = (targetLineElem: HTMLElement | null) => {
  if (targetLineElem) {
    targetLineElem.style.opacity = '0'
    targetLineElem.style.transform = 'translate(-10000px, -10000px)'
  }
}

export const useDraggableBlockMenu = (
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isEditable: boolean
): JSX.Element => {
  const scrollerElem = anchorElem.parentElement

  const menuRef = useRef<HTMLDivElement>(null)
  const targetLineRef = useRef<HTMLDivElement>(null)
  const isDraggingBlockRef = useRef<boolean>(false)
  const [draggableBlockElem, setDraggableBlockElem] =
    useState<HTMLElement | null>(null)

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { target } = event
      if (!isHTMLElement(target) && !isSVG(target)) {
        setDraggableBlockElem(null)
        return
      }

      if (isOnMenu(target)) {
        return
      }

      const newDraggableBlockElem = getBlockElement(
        anchorElem,
        editor,
        event
      )

      setDraggableBlockElem(newDraggableBlockElem)
    }

    const onMouseLeave = () => {
      setDraggableBlockElem(null)
    }

    scrollerElem?.addEventListener('mousemove', onMouseMove)
    scrollerElem?.addEventListener('mouseleave', onMouseLeave)

    return () => {
      scrollerElem?.removeEventListener('mousemove', onMouseMove)
      scrollerElem?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [scrollerElem, anchorElem, editor])

  useEffect(() => {
    if (menuRef.current) {
      setMenuPosition(draggableBlockElem, menuRef.current, anchorElem)
    }
  }, [anchorElem, draggableBlockElem])

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          if (!isDraggingBlockRef.current) {
            return false
          }
          const [isFileTransfer] = eventFiles(event)
          if (isFileTransfer) {
            return false
          }
          const { pageY, target } = event
          if (!isHTMLElement(target)) {
            return false
          }
          const targetBlockElem = getBlockElement(
            anchorElem,
            editor,
            event,
            true
          )
          const targetLineElem = targetLineRef.current
          if (targetBlockElem === null || targetLineElem === null) {
            return false
          }
          setTargetLine(
            targetLineElem,
            targetBlockElem,
            pageY,
            anchorElem
          )
          // Prevent default event to be able to trigger onDrop events
          event.preventDefault()
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          if (!isDraggingBlockRef.current) {
            return false
          }
          const [isFileTransfer] = eventFiles(event)
          if (isFileTransfer) {
            return false
          }
          const { target, dataTransfer, pageY } = event
          const dragData = dataTransfer?.getData(DRAG_BLOCK) || ''
          const draggedNode = $getNodeByKey(dragData)
          if (!draggedNode) {
            return false
          }
          if (!isHTMLElement(target)) {
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
          const targetNode =
            $getNearestNodeFromDOMNode(targetBlockElem)
          if (!targetNode) {
            return false
          }
          if (targetNode === draggedNode) {
            return true
          }
          const targetBlockElemTop =
            targetBlockElem.getBoundingClientRect().top
          if (pageY >= targetBlockElemTop) {
            targetNode.insertAfter(draggedNode)
          } else {
            targetNode.insertBefore(draggedNode)
          }

          setDraggableBlockElem(null)

          return true
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [anchorElem, editor])

  const onDragStart = (
    event: ReactDragEvent<HTMLDivElement>
  ): void => {
    const { dataTransfer } = event
    if (!dataTransfer || !draggableBlockElem) {
      return
    }
    setDragImage(dataTransfer, draggableBlockElem)
    let nodeKey = ''
    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableBlockElem)
      if (node) {
        nodeKey = node.getKey()
      }
    })
    isDraggingBlockRef.current = true
    dataTransfer.setData(DRAG_BLOCK, nodeKey)
  }

  const onDragEnd = (): void => {
    isDraggingBlockRef.current = false
    hideTargetLine(targetLineRef.current)
  }

  return createPortal(
    <>
      <div
        className={styles.draggableMenu}
        id={DRAGGABLE_BLOCK_MENU_ID}
        ref={menuRef}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {isEditable && (
          <Icon
            Svg={DraggableIcon}
            height={16}
            width={16}
            color='invertedPrimary'
          />
        )}
      </div>
      <div className={styles.targetLine} ref={targetLineRef} />
    </>,
    anchorElem
  )
}
