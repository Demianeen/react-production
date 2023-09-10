import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HeadingNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { ImageToolbarPlugin } from './plugins/ImageToolbarPlugin/ImageToolbarPlugin'
import { ListToolbarPlugin } from './plugins/ListToolbarPlugin/ListToolbarPlugin'
import { HeadingToolbarPlugin } from './plugins/HeadingToolbarPlugin/HeadingToolbarPlugin'
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
        <HeadingToolbarPlugin />
        <ListToolbarPlugin />
        <ImageToolbarPlugin />
      </HStack>
    )
  }
)
