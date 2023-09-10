import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HeadingNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { SelectBlockTypeToolbarPlugin } from './plugins/SelectBlockTypeToolbarPlugin/SelectBlockTypeToolbarPlugin'
import { ImageToolbarPlugin } from './plugins/ImageToolbarPlugin/ImageToolbarPlugin'
import { ImageBlockNode } from '../plugins/imageBlock/nodes/ImageBlockNode'

export interface ToolbarPluginProps {
  className?: string
}

export const ToolbarNodes = [
  HeadingNode,
  ListItemNode,
  ListNode,
  ImageBlockNode,
]

export const ToolbarPlugin = typedMemo(
  ({ className }: ToolbarPluginProps) => {
    return (
      <HStack className={className} gap={0.5}>
        <SelectBlockTypeToolbarPlugin />
        <ImageToolbarPlugin />
      </HStack>
    )
  }
)
