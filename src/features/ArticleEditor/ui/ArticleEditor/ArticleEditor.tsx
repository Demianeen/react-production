import type { EditorThemeClasses, LexicalEditor } from 'lexical'
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
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { ReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { UpdateEditorBlockTypePlugin } from '../plugins/UpdateEditorBlockType/UpdateEditorBlockType'
import { Placeholder } from '../Placeholder/Placeholder'
import { AutoLinkPlugin } from '../plugins/AutoLinkPlugin/AutoLinkPlugin'
import styles from './ArticleEditor.module.scss'
import {
  ToolbarNodes,
  ToolbarPlugin,
} from '../ToolbarPlugin/ToolbarPlugin'
import { getArticleStylesClassName } from '../../lib/getArticleStylesClassName/getArticleStylesClassName'
import { articleEditorReducer } from '../../model/slice/articleEditorSlice'

const theme: EditorThemeClasses = {
  imageBlock: styles.imageBlock,
  list: {
    ul: 'ul',
    ol: 'ol',
    listitem: 'li',
  },
}

const onError = (error: Error, _articleEditor: LexicalEditor) => {
  throw error
}

const reducers: ReducersList = {
  articleEditor: articleEditorReducer,
}

export const ArticleEditor = memo(() => {
  useDynamicModuleLoader(reducers, {
    removeOnUnmount: true,
  })

  const { t } = useTranslation()
  const initialConfig: InitialConfigType = {
    namespace: 'MyArticleEditor',
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
    ],
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <HStack
        className={classNamesNew(
          styles.articleEditor,
          getArticleStylesClassName()
        )}
        maxWidth
      >
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
        <HistoryPlugin />
        <AutoLinkPlugin />
        <UpdateEditorBlockTypePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </HStack>
    </LexicalComposer>
  )
})

ArticleEditor.displayName = 'ArticleEditor'
