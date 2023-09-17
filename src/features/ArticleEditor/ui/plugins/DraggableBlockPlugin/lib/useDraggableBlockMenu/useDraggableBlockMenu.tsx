/* eslint-disable no-param-reassign */
import { $getNearestNodeFromDOMNode } from 'lexical'
import * as React from 'react'
import type { DragEvent as ReactDragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/shared/ui/deprecated/Icon'
import DraggableIcon from '@/shared/assets/icons/redesigned/textEditor/draggable.svg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { isSVG } from '@/shared/lib/html/isSvg'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useDraggable } from '../../../../../lib/drag/useDraggable/useDraggable'
import { getBlockElement } from '../../../../../lib/drag/getBlockElement/getBlockElement'
import styles from './useDraggableBlockPlugin.module.scss'

const SPACE = 4
const DRAGGABLE_BLOCK_MENU_ID = 'draggable-block-menu'

/** checks if the element closest node is block menu */
const isElementOnDraggableBlockMenu = (
  element: HTMLElement | SVGElement
): boolean => {
  return Boolean(element.closest(`#${DRAGGABLE_BLOCK_MENU_ID}`))
}

const updateMenuPosition = (
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

export const useDraggableBlockMenu = (
  anchorElem: HTMLElement
): JSX.Element => {
  const [editor] = useLexicalComposerContext()

  const scrollerElem = anchorElem.parentElement

  const menuRef = useRef<HTMLDivElement>(null)
  const [draggableBlockElem, setDraggableBlockElem] =
    useState<HTMLElement | null>(null)

  const [targetLine, { handleDragStart, handleDragEnd }] =
    useDraggable({
      anchorElem,
      space: SPACE,
      onDropStart: () => {
        setDraggableBlockElem(null)
      },
    })

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!isHTMLElement(event.target) && !isSVG(event.target)) {
        setDraggableBlockElem(null)
        return
      }

      if (isElementOnDraggableBlockMenu(event.target)) {
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
      updateMenuPosition(
        draggableBlockElem,
        menuRef.current,
        anchorElem
      )
    }
  }, [anchorElem, draggableBlockElem])

  const onDragStart = (
    event: ReactDragEvent<HTMLDivElement>
  ): void => {
    if (!draggableBlockElem) {
      return
    }
    let nodeKey = ''
    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableBlockElem)
      if (node) {
        nodeKey = node.getKey()
      }
    })
    handleDragStart(event, {
      nodeKey,
      draggableBlockElem,
    })
  }

  return createPortal(
    <>
      <div
        className={styles.draggableMenu}
        id={DRAGGABLE_BLOCK_MENU_ID}
        ref={menuRef}
        draggable
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
      >
        {editor.isEditable() && (
          <Icon
            Svg={DraggableIcon}
            height={16}
            width={16}
            color='invertedPrimary'
          />
        )}
      </div>
      {targetLine}
    </>,
    anchorElem
  )
}
