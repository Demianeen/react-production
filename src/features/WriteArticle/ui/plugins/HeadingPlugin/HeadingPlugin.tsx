import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $isHeadingNode,
  $createHeadingNode,
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  createCommand,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { memo, useCallback, useEffect } from 'react'

export interface HeadingPluginProps {
  className?: string
}

type HeadingLevel = 1 | 2

export const INSERT_HEADING1_COMMAND =
  createCommand<void>('INSERT_HEADING1')
export const INSERT_HEADING2_COMMAND =
  createCommand<void>('INSERT_HEADING2')

export const HeadingPlugin = memo(() => {
  const [editor] = useLexicalComposerContext()

  const insertHeading = useCallback(
    (level: HeadingLevel) => {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes()

          const isHeadingNode = nodes.some((node) =>
            $isHeadingNode(node)
          )

          if (isHeadingNode) {
            $setBlocksType(selection, () => $createParagraphNode())
            return
          }

          $setBlocksType(selection, () =>
            $createHeadingNode(`h${level}`)
          )
        }
      })
    },
    [editor]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_HEADING1_COMMAND,
        () => {
          insertHeading(1)
          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        INSERT_HEADING2_COMMAND,
        () => {
          insertHeading(2)
          return true
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor, insertHeading])

  return null
})

HeadingPlugin.displayName = 'HeadingPlugin'
