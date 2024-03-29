/* eslint-disable no-param-reassign */
import {
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $isElementNode,
} from 'lexical'
import * as React from 'react'
import type { DragEvent as ReactDragEvent } from 'react'
import { useEffect, useRef } from 'react'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'
import DraggableIcon from '@/shared/assets/icons/redesigned/textEditor/draggable.svg'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Portal } from '@/shared/ui/redesigned/Portal'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'
import {
  getEditorAnchor,
  useDraggable,
  useEditorMouseTopLevelNodeKey,
} from '@/entities/Editor'
import styles from './DraggableBlockPlugin.module.scss'

const SPACE = 4

const updateMenuPosition = (
  targetElem: HTMLElement | null,
  floatingElem: HTMLElement,
) => {
  const anchorElem = getEditorAnchor()
  if (!anchorElem) return

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

export const DraggableBlockPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext()

  const menuRef = useRef<HTMLDivElement>(null)

  const { targetLine, handleDragStart, handleDragEnd } =
    useDraggable()

  const topLevelNodeKey = useEditorMouseTopLevelNodeKey()
  let draggableBlockElem: HTMLElement | null = null
  if (topLevelNodeKey) {
    draggableBlockElem = editor.getElementByKey(topLevelNodeKey)
  }

  useEffect(() => {
    if (!menuRef.current) return

    updateMenuPosition(draggableBlockElem, menuRef.current)
  }, [draggableBlockElem, editor])

  const onDragStart = (
    event: ReactDragEvent<HTMLDivElement>,
  ): void => {
    if (draggableBlockElem === null) {
      return
    }
    let nodeKey = ''
    editor.update(() => {
      if (draggableBlockElem === null) {
        return
      }
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

  const onDragEnd = (): void => {
    handleDragEnd()
    if (!menuRef.current) return

    updateMenuPosition(draggableBlockElem, menuRef.current)
  }

  const onClick = (): void => {
    editor.update(() => {
      if (!topLevelNodeKey) return
      const node = $getNodeByKey(topLevelNodeKey)
      if ($isElementNode(node)) {
        node.select(0)
      }
    })
  }

  const anchorElem = getEditorAnchor()

  return (
    <>
      <Portal element={anchorElem ?? undefined}>
        <div
          className={classNamesNew(
            styles.draggableMenu,
            getHStackClassName({
              align: 'center',
              justify: 'center',
            }),
            toggleFeature({
              name: 'isAppRedesigned',
              on: () => styles.redesigned,
              off: () => styles.deprecated,
            }),
          )}
          ref={menuRef}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onClick={onClick}
        >
          {editor.isEditable() && (
            <ToggleFeature
              name='isAppRedesigned'
              on={<Icon Svg={DraggableIcon} height={16} width={16} />}
              off={
                <IconDeprecated
                  Svg={DraggableIcon}
                  height={16}
                  width={16}
                  color='invertedPrimary'
                />
              }
            />
          )}
        </div>
      </Portal>
      {targetLine}
    </>
  )
}
