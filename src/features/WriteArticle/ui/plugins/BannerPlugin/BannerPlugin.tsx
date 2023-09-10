import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import { $createBannerNode, BannerNode } from './BannerNode'

export interface BannerPluginProps {
  className?: string
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner')

export const BannerPlugin = typedMemo(() => {
  const [editor] = useLexicalComposerContext()

  if (!editor.hasNodes([BannerNode])) {
    throw new Error(
      'BannerPlugin: BannerNode not registered on editor'
    )
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createBannerNode())
      }
      return true
    },
    COMMAND_PRIORITY_LOW
  )

  return null
})
