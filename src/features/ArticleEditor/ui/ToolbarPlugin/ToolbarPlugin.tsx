import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HeadingNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { CodeNode } from '@lexical/code'
import { CodeBlockToolbarPlugin } from './plugins/CodeBlockToolbarPlugin/CodeBlockToolbarPlugin'
import { SelectBlockTypeToolbarPlugin } from './plugins/SelectBlockTypeToolbarPlugin/SelectBlockTypeToolbarPlugin'
import { ImageToolbarPlugin } from './plugins/ImageToolbarPlugin/ImageToolbarPlugin'
import { ImageBlockNode } from '../plugins/ImageBlockPlugin/nodes/ImageBlockNode'

export interface ToolbarPluginProps {
  className?: string
  anchorElem: HTMLElement | null
}

export const ToolbarNodes = [
  HeadingNode,
  ListItemNode,
  ListNode,
  ImageBlockNode,
  CodeNode,
]

export const ToolbarPlugin = typedMemo(
  ({ className, anchorElem }: ToolbarPluginProps) => {
    return (
      <HStack className={className} gap={0.5}>
        <SelectBlockTypeToolbarPlugin />
        {anchorElem !== null && (
          <ImageToolbarPlugin anchorElem={anchorElem} />
        )}
        <CodeBlockToolbarPlugin />
      </HStack>
    )
  }
)
