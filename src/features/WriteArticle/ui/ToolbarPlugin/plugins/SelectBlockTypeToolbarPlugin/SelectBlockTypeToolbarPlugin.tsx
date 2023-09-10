import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Select } from '@/shared/ui/deprecated/Popups'
import type { SelectOption } from '@/shared/ui/redesigned/Popups'
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from '@lexical/list'
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_PARAGRAPH_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import {
  $findMatchingParent,
  $getNearestNodeOfType,
} from '@lexical/utils'
import { $isHeadingNode } from '@lexical/rich-text'
import {
  HeadingPlugin,
  INSERT_HEADING1_COMMAND,
  INSERT_HEADING2_COMMAND,
} from '../../../plugins/HeadingPlugin/HeadingPlugin'

export interface SelectBlockTypeToolbarPluginProps {
  className?: string
}

const mapValueToCommandMap = {
  paragraph: INSERT_PARAGRAPH_COMMAND,
  h1: INSERT_HEADING1_COMMAND,
  h2: INSERT_HEADING2_COMMAND,
  ul: INSERT_UNORDERED_LIST_COMMAND,
  ol: INSERT_ORDERED_LIST_COMMAND,
}

type BlockType = keyof typeof mapValueToCommandMap

const selectOptions: SelectOption<BlockType>[] = [
  {
    label: 'Normal',
    value: 'paragraph',
  },
  {
    label: 'Heading 1',
    value: 'h1',
  },
  {
    label: 'Heading 2',
    value: 'h2',
  },
  {
    label: 'Unordered List',
    value: 'ul',
  },
  {
    label: 'Ordered List',
    value: 'ol',
  },
]

export const SelectBlockTypeToolbarPlugin = typedMemo(
  ({ className }: SelectBlockTypeToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()
    const [activeEditor, setActiveEditor] = useState(editor)

    const [blockType, setBlockType] = useState<BlockType>('paragraph')

    const updateBlockType = useCallback(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode()
        let element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent()
                return parent !== null && $isRootOrShadowRoot(parent)
              })

        if (element === null) {
          element = anchorNode.getTopLevelElementOrThrow()
        }

        const elementKey = element.getKey()
        const elementDOM = activeEditor.getElementByKey(elementKey)

        if (elementDOM !== null) {
          if ($isListNode(element)) {
            const parentList =
              $getNearestNodeOfType<ListNode>(anchorNode, ListNode) ??
              element
            const type = parentList.getTag()
            setBlockType(type)
          } else {
            const type = $isHeadingNode(element)
              ? element.getTag()
              : element.getType()
            if (type in mapValueToCommandMap) {
              setBlockType(type as BlockType)
            }
            // if ($isCodeNode(element)) {
            //   const language =
            //     element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            //   setCodeLanguage(
            //     language
            //       ? CODE_LANGUAGE_MAP[language] || language
            //       : ''
            //   )
            //   return
            // }
          }
        }
      }
    }, [activeEditor])

    useEffect(() => {
      return editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateBlockType()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    }, [editor, updateBlockType])

    const onChangeBlockType = useCallback(
      (newBlockType: BlockType) => {
        editor.dispatchCommand(
          mapValueToCommandMap[newBlockType],
          undefined
        )
        setBlockType(newBlockType)
      },
      [editor]
    )

    return (
      <>
        <Select
          className={className}
          options={selectOptions}
          onChange={onChangeBlockType}
          direction='down-right'
          value={blockType}
        />
        <HeadingPlugin />
        <ListPlugin />
      </>
    )
  }
)
