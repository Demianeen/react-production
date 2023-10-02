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

const onError = (error: Error, _articleEditor: LexicalEditor) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

export const LexicalDecorator =
  (nodes: InitialConfigType['nodes'], withEditor = false) =>
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
          plugins={<AutoFocusPlugin />}
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
