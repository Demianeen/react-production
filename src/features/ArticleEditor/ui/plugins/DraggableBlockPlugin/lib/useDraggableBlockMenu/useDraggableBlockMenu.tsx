/* eslint-disable no-param-reassign */
import { $getNearestNodeFromDOMNode } from 'lexical'
import * as React from 'react'
import type { DragEvent as ReactDragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/shared/ui/deprecated/Icon'
import DraggableIcon from '@/shared/assets/icons/redesigned/textEditor/draggable.svg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { isSVG } from '@/shared/lib/html/isSvg'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Portal } from '@/shared/ui/redesigned/Portal'
import { getArticleEditorAnchor } from '../../../../../lib/getArticleEditorAnchor/getArticleEditorAnchor'
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

export const useDraggableBlockMenu = (): JSX.Element => {
  const [editor] = useLexicalComposerContext()

  const menuRef = useRef<HTMLDivElement>(null)
  const [draggableBlockElem, setDraggableBlockElem] =
    useState<HTMLElement | null>(null)

  const { targetLine, handleDragStart, handleDragEnd } = useDraggable(
    {
      space: SPACE,
      onDropStart: () => {
        setDraggableBlockElem(null)
      },
    }
  )

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const anchorElem = getArticleEditorAnchor()
    if (!anchorElem) return

    const scrollerElem = anchorElem.parentElement
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

    // eslint-disable-next-line consistent-return
    return () => {
      scrollerElem?.removeEventListener('mousemove', onMouseMove)
      scrollerElem?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [editor])

  useEffect(() => {
    if (!menuRef.current) return

    const anchorElem = getArticleEditorAnchor()
    if (!anchorElem) return

    updateMenuPosition(
      draggableBlockElem,
      menuRef.current,
      anchorElem
    )
  }, [draggableBlockElem])

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

  const anchorElem = getArticleEditorAnchor()

  return (
    <>
      <Portal element={anchorElem ?? undefined}>
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
      </Portal>
      {targetLine}
    </>
  )
}
