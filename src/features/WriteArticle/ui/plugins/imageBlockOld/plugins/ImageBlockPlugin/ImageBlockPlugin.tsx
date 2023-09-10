import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import {
  ImageBlockNode,
  $createImageBlockNode,
} from '../../nodes/ImageBlockNode'

export interface ImageBlockPluginProps {
  className?: string
}

export const INSERT_IMAGE_BLOCK_COMMAND = createCommand<string>(
  'INSERT_IMAGE_COMMAND'
)

export const ImageBlockPlugin = typedMemo(() => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageBlockNode])) {
      throw new Error(
        'ImageBlockPlugin: ImageNode not registered on editor'
      )
    }

    editor.registerCommand(
      INSERT_IMAGE_BLOCK_COMMAND,
      (payload) => {
        $insertNodes([
          $createImageBlockNode({
            src: payload,
          }),
        ])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
})
