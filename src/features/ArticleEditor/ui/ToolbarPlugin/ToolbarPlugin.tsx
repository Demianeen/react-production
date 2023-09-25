import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HeadingNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { CodeNode } from '@lexical/code'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { LinkToolbarPlugin } from './plugins/LinkToolbarPlugin'
import { TextFormatToolbarPlugin } from './plugins/TextFormatToolbarPlugin/ui/TextFormatPlugin'
import { CodeBlockToolbarPlugin } from './plugins/CodeBlockToolbarPlugin/CodeBlockToolbarPlugin'
import { SelectBlockTypeToolbarPlugin } from '../plugins/SelectBlockTypeToolbarPlugin/SelectBlockTypeToolbarPlugin'
import { ImageToolbarPlugin } from './plugins/ImageToolbarPlugin'
import { ImageBlockNode } from '../plugins/ImageBlockPlugin/nodes/ImageBlockNode'
import styles from './ToolbarPlugin.module.scss'

export interface ToolbarPluginProps {
  className?: string
}

export const ToolbarNodes = [
  HeadingNode,
  ListItemNode,
  ListNode,
  ImageBlockNode,
  CodeNode,
]

export const ToolbarPlugin = typedMemo(
  ({ className }: ToolbarPluginProps) => {
    return (
      <HStack
        className={classNamesNew(styles.wrapper, className)}
        gap={1}
      >
        <SelectBlockTypeToolbarPlugin />
        <HStack gap={0.5}>
          <ImageToolbarPlugin />
          <CodeBlockToolbarPlugin />
        </HStack>
        <TextFormatToolbarPlugin />
        <LinkToolbarPlugin />
      </HStack>
    )
  },
)
