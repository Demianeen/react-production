import { Editor } from '@/entities/Editor'
import {
  articleEditorTheme,
  getArticleStylesClassName,
} from '@/widgets/ArticleEditor/testing'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import type { StoryFn } from '@storybook/react'
import type { LexicalEditor } from 'lexical'
import type { ReactNode } from 'react'

const onError = (error: Error, _articleEditor: LexicalEditor) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

export interface LexicalDecoratorProps {
  /**
   * Displays the interactive editor that can be used to test the plugin.
   */
  withEditor?: boolean
  nodes?: InitialConfigType['nodes']
  plugins?: ReactNode
}

export const LexicalDecorator =
  ({ withEditor = false, nodes, plugins }: LexicalDecoratorProps) =>
  (StoryComponent: StoryFn) => {
    const initialConfig: InitialConfigType = {
      namespace: 'editor',
      theme: articleEditorTheme,
      onError,
      nodes,
    }

    if (withEditor) {
      return (
        <Editor
          placeholder='Changes would appear here'
          theme={articleEditorTheme}
          nodes={nodes}
          toolbar={<StoryComponent />}
          plugins={
            <>
              <AutoFocusPlugin />
              {plugins}
            </>
          }
          contentEditableClassName={getArticleStylesClassName()}
        />
      )
    }

    return (
      <LexicalComposer initialConfig={initialConfig}>
        <StoryComponent />
      </LexicalComposer>
    )
  }
