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
import { memo, useState } from 'react'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TRANSFORMERS } from '@lexical/markdown'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { useTranslation } from 'react-i18next'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { ReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { CodeHighlightNode } from '@lexical/code'
import { DraggableBlockPlugin } from '../plugins/DraggableBlockPlugin/DraggableBlockPlugin'
import { CodeHighlightPlugin } from '../plugins/CodeHighlightPlugin/CodeHighlightPlugin'
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
  code: 'code',
  codeHighlight: {
    atrule: 'tokenAttr',
    attr: 'tokenAttr',
    boolean: 'tokenProperty',
    builtin: 'tokenSelector',
    cdata: 'tokenComment',
    char: 'tokenSelector',
    class: 'tokenFunction',
    'class-name': 'tokenFunction',
    comment: 'tokenComment',
    constant: 'tokenProperty',
    deleted: 'tokenProperty',
    doctype: 'tokenComment',
    entity: 'tokenOperator',
    function: 'tokenFunction',
    important: 'tokenVariable',
    inserted: 'tokenSelector',
    keyword: 'tokenAttr',
    namespace: 'tokenVariable',
    number: 'tokenProperty',
    operator: 'tokenOperator',
    prolog: 'tokenComment',
    property: 'tokenProperty',
    punctuation: 'tokenPunctuation',
    regex: 'tokenVariable',
    selector: 'tokenSelector',
    string: 'tokenSelector',
    symbol: 'tokenProperty',
    tag: 'tokenProperty',
    url: 'tokenOperator',
    variable: 'tokenVariable',
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
      HeadingNode,
      LinkNode,
      QuoteNode,
      CodeHighlightNode,
    ],
  }

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin anchorElem={floatingAnchorElem} />
      <HStack
        className={classNamesNew(
          styles.articleEditor,
          getArticleStylesClassName()
        )}
        maxWidth
      >
        <RichTextPlugin
          contentEditable={
            <div className={styles.editorScroller}>
              <div
                className={styles.editor}
                ref={setFloatingAnchorElem}
              >
                <ContentEditable
                  className={classNamesNew(styles.contentEditable)}
                />
              </div>
            </div>
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
        <CodeHighlightPlugin />
        {floatingAnchorElem !== null && (
          <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        )}
      </HStack>
    </LexicalComposer>
  )
})

ArticleEditor.displayName = 'ArticleEditor'
