import { type EditorThemeClasses, type LexicalEditor } from 'lexical'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { memo } from 'react'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TRANSFORMERS } from '@lexical/markdown'
import { CodeNode } from '@lexical/code'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { useTranslation } from 'react-i18next'
import { EnterPlugin } from '../plugins/EnterPlugin/EnterPlugin'
import { Placeholder } from '../Placeholder/Placeholder'
import { AutoLinkPlugin } from '../plugins/AutoLinkPlugin/AutoLinkPlugin'
import styles from './WriteArticle.module.scss'
import {
  ToolbarNodes,
  ToolbarPlugin,
} from '../ToolbarPlugin/ToolbarPlugin'
import { BannerNode } from '../plugins/BannerPlugin/BannerNode'

const theme: EditorThemeClasses = {
  imageBlock: styles.imageBlock,
}

const onError = (error: Error, _editor: LexicalEditor) => {
  throw error
}

export const WriteArticle = memo(() => {
  const { t } = useTranslation()
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
      ...ToolbarNodes,
      AutoLinkNode,
      HorizontalRuleNode,
      CodeNode,
      HeadingNode,
      LinkNode,
      QuoteNode,
      BannerNode,
    ],
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <HStack className={styles.editor} maxWidth>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={classNamesNew(styles.contentEditable)}
            />
          }
          placeholder={
            <Placeholder
              className={styles.placeholder}
              text={t('Enter text here')}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <EnterPlugin />
        <HistoryPlugin />
        <AutoLinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </HStack>
    </LexicalComposer>
  )
})

WriteArticle.displayName = 'WriteArticle'
