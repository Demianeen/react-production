import type { KeyboardEventHandler } from 'react'
import { memo, useCallback, useState } from 'react'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import {
  $createParagraphNode,
  $createRangeSelection,
  $getNodeByKey,
  $setSelection,
  type LexicalEditor,
} from 'lexical'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { useTranslation } from 'react-i18next'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useFocus } from '@/shared/lib/hooks/useFocus/useFocus'
import { Placeholder } from '../../../../Placeholder/Placeholder'
import styles from './ImageBlockComponent.module.scss'
import { OneLinePlugin } from '../../../OneLinePlugin/OneLinePlugin'
import { AutoFocusPlugin } from '../../../AutoFocusPlugin/AutoFocusPlugin'
import { DeleteArticleEditorPlugin } from '../../../DeleteArticleEditorPlugin/DeleteArticleEditorPlugin'

interface ImageBlockComponentProps {
  className?: string
  src: string
  altText: string
  caption: LexicalEditor
  nodeKey: string
}

export const ImageBlockComponent = memo(
  ({
    className,
    altText,
    src,
    caption,
    nodeKey,
  }: ImageBlockComponentProps) => {
    const { t } = useTranslation()
    const [isFocused, bindFocus] = useFocus()

    const deleteImage = useCallback(() => {
      caption?._parentEditor?.update(() => {
        const imageNode = $getNodeByKey(nodeKey)
        const paragraphNode = $createParagraphNode()
        imageNode?.replace(paragraphNode)
        paragraphNode.select()
      })
    }, [caption?._parentEditor, nodeKey])

    const handleKeydown: KeyboardEventHandler<HTMLImageElement> =
      useCallback(
        (e) => {
          if (e.key === 'Backspace') {
            deleteImage()
          }

          if (e.key === '') {
            deleteImage()
          }

          const isLetter = /^[a-z]$/i.test(e.key)
          const isNumber = /^[0-9]$/i.test(e.key)

          if (!isLetter && !isNumber) {
            return
          }

          const existingSelection =
            caption?.getEditorState()._selection
          const selection = $createRangeSelection()
          if (!existingSelection) {
            caption.update(() => {
              $setSelection(selection)
            })
          } else {
            caption.focus()
          }
        },
        [caption, deleteImage]
      )

    const [isPlaceholderMounted, setIsPlaceholderMounted] =
      useState(false)

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
      <VStack
        className={classNamesNew(styles.imageWrapper, className)}
        as='figure'
        justify='center'
        align='center'
        maxWidth
      >
        <AppImage
          className={classNamesNew(styles.img, {
            [styles.focused]: isFocused,
          })}
          src={src}
          alt={altText}
          data-testid='ImageBlockComponent'
          onLoad={setIsImageLoaded}
          onKeyDown={handleKeydown}
          tabIndex={0}
        />
        {isImageLoaded && (
          // <ToggleFeature
          //   name='isAppRedesigned'
          //   on={
          //     <HStack as='p' maxWidth justify='center'>
          //       {block.title}
          //     </HStack>
          //   }
          //   off={
          //     <Text
          //       text={block.title}
          //       align={TextAlign.CENTER}
          //       data-testid={`${dataTestId}.Title`}
          //     />
          //   }
          // />
          <LexicalNestedComposer initialEditor={caption}>
            <HStack maxWidth justify='center' align='center'>
              <figcaption
                className={classNamesNew(styles.articleEditor, {
                  [styles.withPlaceholder]: isPlaceholderMounted,
                })}
              >
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      className={styles.contentEditable}
                      autoFocus
                      {...bindFocus}
                    />
                  }
                  placeholder={
                    <Placeholder
                      className={styles.placeholder}
                      text={t('Enter a caption')}
                      onPlaceholderChange={setIsPlaceholderMounted}
                    />
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <OneLinePlugin nodeKey={nodeKey} />
                <AutoFocusPlugin />
                <DeleteArticleEditorPlugin onDelete={deleteImage} />
              </figcaption>
            </HStack>
          </LexicalNestedComposer>
        )}
      </VStack>
    )
  }
)

ImageBlockComponent.displayName = 'ImageBlockComponent'
