import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { ReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import type { EditorThemeClasses, LexicalEditor } from 'lexical'
import type { ForwardedRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Card } from '@/shared/ui/redesigned/Card'
import { toggleFeature } from '@/shared/lib/features'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import { UpdateMouseBlockTypePlugin } from '../plugins/UpdateMouseStatePlugin/UpdateMouseStatePlugin'
import { Placeholder } from '../Placeholder/Placeholder'
import { editorReducer } from '../../model/slice/editorSlice'
import styles from './Editor.module.scss'
import { UpdateSelectionBlockTypePlugin } from '../plugins/UpdateSelectionStatePlugin/UpdateSelectionStatePlugin'

interface EditorProps {
  className?: string
  contentEditableClassName?: string
  theme: EditorThemeClasses
  nodes: InitialConfigType['nodes']
  toolbar?: ReactNode
  plugins?: ReactNode
  /**
   * @default 'editor'
   */
  namespace?: string
  minHeight?: string
  placeholder: string
}

const reducers: ReducersList = {
  editor: editorReducer,
}

const onError = (error: Error, _articleEditor: LexicalEditor) => {
  throw error
}

const setEditorRef =
  (editorRef: ForwardedRef<LexicalEditor>) =>
  (editor: LexicalEditor) => {
    if (editorRef) {
      if (typeof editorRef === 'function') {
        editorRef(editor)
      } else {
        // eslint-disable-next-line no-param-reassign
        editorRef.current = editor
      }
    }
  }

export const Editor = forwardRef<LexicalEditor, EditorProps>(
  (
    {
      className,
      contentEditableClassName,
      theme,
      nodes,
      toolbar,
      plugins,
      namespace = 'editor',
      minHeight,
      placeholder,
    },
    editorRef,
  ) => {
    useDynamicModuleLoader(reducers)

    const initialConfig: InitialConfigType = {
      namespace,
      theme,
      onError,
      nodes,
    }

    const CardComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Card,
      off: () => CardDeprecated,
    })

    return (
      <LexicalComposer initialConfig={initialConfig}>
        <VStack gap={1} maxWidth className={className}>
          {toolbar}
          <HStack
            className={classNamesNew(styles.articleEditor)}
            maxWidth
          >
            <RichTextPlugin
              contentEditable={
                <div
                  className={styles.editorScroller}
                  style={{
                    minHeight,
                  }}
                >
                  <CardComponent
                    className={styles.editor}
                    id='editor-anchor'
                    background='light'
                  >
                    <ContentEditable
                      className={classNamesNew(
                        styles.contentEditable,
                        contentEditableClassName,
                      )}
                    />
                  </CardComponent>
                </div>
              }
              placeholder={
                <Placeholder
                  className={styles.placeholder}
                  text={placeholder}
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <EditorRefPlugin editorRef={setEditorRef(editorRef)} />
            <UpdateMouseBlockTypePlugin />
            <UpdateSelectionBlockTypePlugin />
            {plugins}
          </HStack>
        </VStack>
      </LexicalComposer>
    )
  },
)

Editor.displayName = 'Editor'
