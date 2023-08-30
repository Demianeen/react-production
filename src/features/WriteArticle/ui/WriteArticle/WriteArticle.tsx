// import React, { useEffect, useRef } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.core.css'
// import './WriteArticle.scss'
// import { WriteArticleToolbar } from '../WriteArticleToolbar/WriteArticleToolbar'

// interface WriteArticleProps {
//   className?: string
//   boundaryElementId?: string
//   value: string
//   onChange: (value: string) => void
// }

// export const WriteArticle = ({
//   className,
//   boundaryElementId,
//   value,
//   onChange,
// }: WriteArticleProps) => {
//   const quillRef = useRef<ReactQuill>(null)

//   useEffect(() => {
//     if (quillRef.current) {
//       const quill = quillRef.current.getEditor()

//       quill.on('text-change', () => {
//         const text = quill.getText()

//         // check for inline code like `code`
//         const matchInlineCode = text.match(/`([^`]+)`/g)
//         if (matchInlineCode) {
//           matchInlineCode.forEach((match) => {
//             const start = text.indexOf(match)

//             quill.deleteText(start, match.length)
//             quill.insertText(start, match.slice(1, -1), 'code', true)
//           })
//         }
//       })
//     }
//   }, [])

//   return (
//     <div>
//       <WriteArticleToolbar />
//       <ReactQuill
//         ref={quillRef}
//         // @ts-expect-error theme invalid type
//         theme={null}
//         value={value}
//         onChange={onChange}
//         className={className}
//         placeholder='Write your article here...'
//         id='writeArticle'
//         bounds={`#${boundaryElementId}`}
//         modules={{
//           toolbar: {
//             container: '#toolbar',
//           },
//         }}
//       />
//     </div>
//   )
// }

// WriteArticle.displayName = 'WriteArticle'

import type { EditorThemeClasses, LexicalEditor } from 'lexical'

import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HeadingNode } from '@lexical/rich-text'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/deprecated/Text'
import { HeadingPlugin } from '../HeadingPlugin/HeadingPlugin'
import styles from './WriteArticle.module.scss'

const theme: EditorThemeClasses = {}

const onError = (error: Error, _editor: LexicalEditor) => {
  throw error
}

const Placeholder = memo(() => {
  const { t } = useTranslation('article')
  return <Text text={t('Text')} className={styles.placeholder} />
})

Placeholder.displayName = 'Placeholder'

export const WriteArticle = memo(() => {
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode],
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <HeadingPlugin />
      <HStack className={styles.editor} maxWidth>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={classNamesNew(styles.contentEditable)}
            />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </HStack>
    </LexicalComposer>
  )
})

WriteArticle.displayName = 'WriteArticle'
