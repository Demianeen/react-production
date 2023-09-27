import type { EditorThemeClasses, LexicalEditor } from 'lexical'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import type { MutableRefObject } from 'react'
import { forwardRef, memo } from 'react'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { useTranslation } from 'react-i18next'
import ClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { ReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { CodeHighlightNode } from '@lexical/code'
import { CodeActionMenuPlugin } from '../plugins/CodeActionMenuPlugin'
import { UpdateSelectionBlockTypePlugin } from '../plugins/UpdateSelectionStatePlugin/UpdateSelectionStatePlugin'
import { DraggableBlockPlugin } from '../plugins/DraggableBlockPlugin/DraggableBlockPlugin'
import { CodeHighlightPlugin } from '../plugins/CodeHighlightPlugin/CodeHighlightPlugin'
import { UpdateMouseBlockTypePlugin } from '../plugins/UpdateMouseStatePlugin/UpdateMouseStatePlugin'
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
  text: {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
  },
  paragraph: 'paragraph',
  link: 'link',
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

export const ArticleEditor = memo(
  forwardRef<LexicalEditor>((_, editorRef) => {
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
        LinkNode,
        CodeHighlightNode,
      ],
    }

    return (
      <LexicalComposer initialConfig={initialConfig}>
        <VStack gap={1} maxWidth>
          <ToolbarPlugin />
          <HStack
            className={classNamesNew(styles.articleEditor)}
            maxWidth
          >
            <RichTextPlugin
              contentEditable={
                <div className={styles.editorScroller}>
                  <div
                    className={styles.editor}
                    id='article-editor-anchor'
                  >
                    <ContentEditable
                      className={classNamesNew(
                        styles.contentEditable,
                        getArticleStylesClassName(),
                      )}
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
            <ClickableLinkPlugin />
            <AutoLinkPlugin />
            <UpdateMouseBlockTypePlugin />
            <UpdateSelectionBlockTypePlugin />
            <CodeActionMenuPlugin />
            <CodeHighlightPlugin />
            <DraggableBlockPlugin />
            <EditorRefPlugin
              editorRef={editorRef as MutableRefObject<LexicalEditor>}
            />
          </HStack>
        </VStack>
      </LexicalComposer>
    )
  }),
)

ArticleEditor.displayName = 'ArticleEditor'
