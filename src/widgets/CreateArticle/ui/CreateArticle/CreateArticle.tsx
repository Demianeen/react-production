import { VStack } from '@/shared/ui/redesigned/Stack'
import type { FormEventHandler } from 'react'
import { memo, useCallback, useRef } from 'react'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { ArticleEditor } from '@/features/ArticleEditor'
import { WithLabel as WithLabelDeprecated } from '@/shared/ui/deprecated/WithLabel'
import { WithLabel } from '@/shared/ui/redesigned/WithLabel'
import type { LexicalEditor } from 'lexical'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { useTranslation } from 'react-i18next'
import { $generateHtmlFromNodes } from '@lexical/html'
import { Select } from '@/shared/ui/deprecated/Popups'
import { ArticleType, ArticleThumbnail } from '@/entities/Article'
import type { SelectOption } from '@/shared/ui/redesigned/Popups'
import { isUrl } from '@/shared/lib/url/findUrl/isUrl'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { useUserId } from '@/entities/User'
import { useCreateArticleMutation } from '../../model/api/createArticleApi'
import {
  useCreateArticleFormImage,
  useCreateArticleFormSubTitle,
  useCreateArticleFormTitle,
  useCreateArticleFormTypes,
} from '../../model/selectors/createArticleSelectors'
import {
  createArticleReducer,
  useCreateArticleActions,
} from '../../model/slice/createArticleSlice'
import styles from './CreateArticle.module.scss'

interface CreateArticleProps {
  className?: string
}

const reducers: AsyncReducersList = {
  createArticle: createArticleReducer,
}

export const articleTypeToSelect: SelectOption<ArticleType>[] =
  Object.values(ArticleType)
    .filter((type) => type !== ArticleType.ALL)
    .map((type) => ({
      label: type,
      value: type,
    }))

export const CreateArticle = memo(
  ({ className }: CreateArticleProps) => {
    useDynamicModuleLoader(reducers)

    const { t } = useTranslation('createArticle')
    const editorRef = useRef<LexicalEditor>(null)

    const [createArticle] = useCreateArticleMutation()

    const title = useCreateArticleFormTitle()
    const subtitle = useCreateArticleFormSubTitle()
    const img = useCreateArticleFormImage()
    const types = useCreateArticleFormTypes()

    const userId = useUserId()

    const { updateTitle, updateSubtitle, updateImg, updateTypes } =
      useCreateArticleActions()

    const InputComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Input,
      off: () => InputDeprecated,
    })

    const WithLabelComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => WithLabel,
      off: () => WithLabelDeprecated,
    })

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
      (e) => {
        e.preventDefault()

        if (!editorRef.current || !userId) {
          return
        }

        const editor = editorRef.current
        editor.getEditorState().read(() => {
          const htmlString = $generateHtmlFromNodes(editor)
          createArticle({
            title,
            subtitle,
            img,
            contentHtmlString: htmlString,
            types,
            userId,
          })
        })
      },
      [createArticle, img, subtitle, title, types, userId]
    )

    const buttonProps = {
      type: 'submit' as const,
      children: t('Publish'),
    }

    return (
      <VStack
        as='form'
        className={className}
        maxWidth
        gap={1}
        onSubmit={onSubmit}
      >
        <InputComponent
          value={title}
          onChange={updateTitle}
          placeholder='Javascript news 2023'
          label='Title'
          maxWidth
          required
        />
        <InputComponent
          value={subtitle}
          onChange={updateSubtitle}
          placeholder='JavaScript updates and how to run JS code in a browser'
          label='Subtitle'
          maxWidth
          required
        />
        <InputComponent
          value={img}
          onChange={updateImg}
          placeholder='Link to image'
          label='Image'
          type='url'
          maxWidth
          required
        />
        {img && isUrl(img) && (
          <>
            <ArticleThumbnail src={img} alt='preview thumbnail' />
            <AppImage
              src={img}
              alt='preview grid thumbnail'
              className={styles.imgPreviewGrid}
            />
          </>
        )}
        <Select
          options={articleTypeToSelect}
          onChange={updateTypes}
          label='Types'
          direction='down-right'
          value={types}
          multiple
          required
        />
        <WithLabelComponent label='Content' maxWidth>
          <ArticleEditor ref={editorRef} />
        </WithLabelComponent>
        {ToggleFeature({
          name: 'isAppRedesigned',
          on: <Button {...buttonProps}>{t('Insert')}</Button>,
          off: <ButtonDeprecated {...buttonProps} />,
        })}
      </VStack>
    )
  }
)

CreateArticle.displayName = 'CreateArticle'
