import { Button } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $isHeadingNode,
  $createHeadingNode,
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical'
import { memo, useCallback } from 'react'

export interface HeadingToolbarPluginProps {
  className?: string
}

type HeadingLevel = 1 | 2

export const HeadingToolbarPlugin = memo(
  ({ className }: HeadingToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const headingList: HeadingLevel[] = [1, 2]

    const onClick = useCallback(
      (level: HeadingLevel) => (_: React.MouseEvent) => {
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

    return (
      <div className={className}>
        {headingList.map((level) => (
          <Button key={level} type='button' onClick={onClick(level)}>
            H{level}
          </Button>
        ))}
      </div>
    )
  }
)

HeadingToolbarPlugin.displayName = 'HeadingToolbarPlugin'
