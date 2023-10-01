import type { KeyboardEventHandler } from 'react'
import { memo, useCallback, useRef, useState } from 'react'
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
import './ImageComponent.module.scss'
import {
  useDraggable,
  OneLinePlugin,
  DeleteEditorPlugin,
  Placeholder,
} from '@/entities/Editor'

interface ImageComponentProps {
  src: string
  altText: string
  caption: LexicalEditor
  nodeKey: string
}

export const imageWrapperClassnames = 'imageWrapper'
export const imageClassnames = 'img'
export const captionWrapperClassnames = 'captionWrapper'
export const captionClassnames = 'articleEditor'

export const ImageComponent = memo(
  ({ altText, src, caption, nodeKey }: ImageComponentProps) => {
    const { t } = useTranslation()
    const [isFocused, bindFocus] = useFocus()
    const { targetLine, handleDragStart, handleDragEnd } =
      useDraggable()
    const imageRef = useRef<HTMLImageElement>(null)

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
        [caption, deleteImage],
      )

    const [isPlaceholderMounted, setIsPlaceholderMounted] =
      useState(false)

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const onDragStart = useCallback(
      (event: React.DragEvent) => {
        if (imageRef.current === null) {
          return
        }
        handleDragStart(event, {
          nodeKey,
          draggableBlockElem: imageRef.current,
        })
      },
      [handleDragStart, nodeKey],
    )

    return (
      <figure className={imageWrapperClassnames}>
        {targetLine}
        <AppImage
          className={classNamesNew(imageClassnames, {
            focused: isFocused,
          })}
          src={src}
          alt={altText}
          data-testid='ImageComponent'
          onLoad={setIsImageLoaded}
          onKeyDown={handleKeydown}
          onDragStart={onDragStart}
          onDragEnd={handleDragEnd}
          tabIndex={0}
          ref={imageRef}
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
            <div className={captionWrapperClassnames}>
              <figcaption
                className={classNamesNew(captionClassnames, {
                  withPlaceholder: isPlaceholderMounted,
                })}
              >
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      className='contentEditable'
                      autoFocus
                      {...bindFocus}
                    />
                  }
                  placeholder={
                    <Placeholder
                      className='placeholder'
                      text={t('Enter a caption')}
                      onPlaceholderChange={setIsPlaceholderMounted}
                    />
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <OneLinePlugin nodeKey={nodeKey} />
                <DeleteEditorPlugin onDelete={deleteImage} />
              </figcaption>
            </div>
          </LexicalNestedComposer>
        )}
      </figure>
    )
  },
)

ImageComponent.displayName = 'ImageComponent'
