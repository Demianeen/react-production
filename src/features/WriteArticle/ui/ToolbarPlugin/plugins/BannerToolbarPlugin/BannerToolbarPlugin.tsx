import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Button } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import {
  BannerPlugin,
  INSERT_BANNER_COMMAND,
} from '../../../plugins/BannerPlugin/BannerPlugin'

export interface BannerToolbarPluginProps {
  className?: string
}

export const BannerToolbarPlugin = typedMemo(
  ({ className }: BannerToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const onClick = useCallback(
      (_: React.MouseEvent) => {
        editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined)
      },
      [editor]
    )

    return (
      <div className={className}>
        <Button type='button' onClick={onClick}>
          {/* Banner */}
        </Button>
        <BannerPlugin />
      </div>
    )
  }
)
