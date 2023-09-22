import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { memo, useEffect } from 'react'
import { $createCodeNode } from '@lexical/code'
import { $setBlocksType } from '@lexical/selection'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical'
import { useArticleEditorSelectionBlockType } from '../../../model/selectors/articleEditorSelectionSelectors'
import { useArticleEditorActions } from '../../../model/slice/articleEditorSlice'
import { BlockType } from '../../../model/types/articleEditorSchema'

export const INSERT_CODE_BLOCK_COMMAND = createCommand(
  'INSERT_CODE_BLOCK'
)

export const CodeBlockPlugin = memo(() => {
  const [editor] = useLexicalComposerContext()
  const blockType = useArticleEditorSelectionBlockType()

  const { setSelectionBlockType } = useArticleEditorActions()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_CODE_BLOCK_COMMAND,
      () => {
        if (blockType !== BlockType.CODE) {
          editor.update(() => {
            let selection = $getSelection()

            if (!$isRangeSelection(selection)) {
              return
            }

            if (selection.isCollapsed()) {
              $setBlocksType(selection, () => $createCodeNode())
            } else {
              const textContent = selection.getTextContent()
              const codeNode = $createCodeNode()
              selection.insertNodes([codeNode])
              selection = $getSelection()
              if ($isRangeSelection(selection))
                selection.insertRawText(textContent)
            }
            setSelectionBlockType(BlockType.CODE)
          })
        }

        return false
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [blockType, editor, setSelectionBlockType])

  return null
})

CodeBlockPlugin.displayName = 'CodeBlockToolbarPlugin'
