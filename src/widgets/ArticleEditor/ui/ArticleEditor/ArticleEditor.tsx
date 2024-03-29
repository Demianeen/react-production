import type { LexicalEditor } from 'lexical'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { forwardRef, memo } from 'react'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import ClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { CodeHighlightNode } from '@lexical/code'
import { Editor } from '@/entities/Editor'
import { AutoLinkPlugin } from '@/features/AutoLinkPlugin'
import { CodeActionMenuPlugin } from '@/features/CodeActionMenuPlugin'
import { CodeHighlightPlugin } from '@/features/CodeHighlightPlugin'
import { DraggableBlockPlugin } from '@/features/DraggableBlockPlugin'
import { useTranslation } from 'react-i18next'
import { getArticleStylesClassName } from '../../lib/getArticleStylesClassName/getArticleStylesClassName'
import { articleEditorTheme } from '../../config/theme'
import {
  ToolbarNodes,
  ToolbarPlugin,
} from '../ToolbarPlugin/ToolbarPlugin'
import styles from './ArticleEditor.module.scss'

export const ArticleEditor = memo(
  forwardRef<LexicalEditor>((_, editorRef) => {
    const { t } = useTranslation('article-edit')

    return (
      <Editor
        theme={articleEditorTheme}
        nodes={[
          ...ToolbarNodes,
          AutoLinkNode,
          LinkNode,
          CodeHighlightNode,
        ]}
        contentEditableClassName={getArticleStylesClassName()}
        scrollerClassName={styles.scroller}
        toolbar={<ToolbarPlugin />}
        ref={editorRef}
        minHeight='25rem'
        placeholder={t('Enter text here')}
        plugins={
          <>
            <HistoryPlugin />
            <ClickableLinkPlugin />
            <AutoLinkPlugin />
            <CodeActionMenuPlugin />
            <CodeHighlightPlugin />
            <DraggableBlockPlugin />
          </>
        }
      />
    )
  }),
)

ArticleEditor.displayName = 'ArticleEditorInside'

// export const ArticleEditor = withProvider(
//   ArticleEditorInside,
//   LexicalProvider,
// )
