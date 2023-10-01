import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HeadingNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { CodeNode } from '@lexical/code'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { toggleFeature } from '@/shared/lib/features'
import { CodeBlockToolbarPlugin } from '@/features/CodeBlockToolbarPlugin'
import { TextFormatToolbarPlugin } from '@/features/TextFormatToolbarPlugin'
import { LinkToolbarPlugin } from '@/features/LinkToolbarPlugin'
import {
  ImageNode,
  ImageToolbarPlugin,
} from '@/features/ImageToolbarPlugin'
import { SelectBlockTypeToolbarPlugin } from '../SelectBlockTypeToolbarPlugin/SelectBlockTypeToolbarPlugin'
import styles from './ToolbarPlugin.module.scss'

export interface ToolbarPluginProps {
  className?: string
}

export const ToolbarNodes = [
  HeadingNode,
  ListItemNode,
  ListNode,
  ImageNode,
  CodeNode,
]

export const ToolbarPlugin = typedMemo(
  ({ className }: ToolbarPluginProps) => {
    return (
      <HStack
        className={classNamesNew(
          styles.wrapper,
          toggleFeature({
            name: 'isAppRedesigned',
            on: () => styles.wrapperRedesigned,
            off: () => styles.wrapperDeprecated,
          }),
          className,
        )}
        align='center'
        maxHeight
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
