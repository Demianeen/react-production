import { VStack } from '@/shared/ui/redesigned/Stack'
import type { FormEventHandler } from 'react'
import { memo, useCallback, useEffect, useRef } from 'react'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { ArticleEditor } from '@/widgets/ArticleEditor'
import { WithLabel as WithLabelDeprecated } from '@/shared/ui/deprecated/WithLabel'
import { WithLabel } from '@/shared/ui/redesigned/WithLabel'
import {
  $createParagraphNode,
  $getRoot,
  $insertNodes,
  $isTextNode,
  type LexicalEditor,
} from 'lexical'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { useTranslation } from 'react-i18next'
import {
  $generateHtmlFromNodes,
  $generateNodesFromDOM,
} from '@lexical/html'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { Article } from '@/entities/Article'
import { ArticleType, ArticleThumbnail } from '@/entities/Article'
import {
  Select,
  type SelectOption,
} from '@/shared/ui/redesigned/Popups'
import { isUrl } from '@/shared/lib/url/findUrl/isUrl'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { useUserId } from '@/entities/User'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/lib/router/routes'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { getSanitizedDomFromString } from '@/shared/lib/html/sanitize'
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

interface CreateArticleProps {
  className?: string
  editArticle?: Article
}

export const CreateArticle = memo(
  ({ className, editArticle }: CreateArticleProps) => {
    useDynamicModuleLoader(reducers)

    const navigate = useNavigate()

    const { t } = useTranslation('article-edit')
    const editorRef = useRef<LexicalEditor>(null)

    const isEdit = editArticle !== undefined

    const [createArticle, { isError, isSuccess, data }] =
      useCreateArticleMutation()

    const title = useCreateArticleFormTitle()
    const subtitle = useCreateArticleFormSubTitle()
    const img = useCreateArticleFormImage()
    const types = useCreateArticleFormTypes()

    const userId = useUserId()

    const { updateTitle, updateSubtitle, updateImg, updateTypes } =
      useCreateArticleActions()

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
            isEdit,
            articleId: editArticle?.id,
          })
        })
      },
      [
        createArticle,
        editArticle?.id,
        img,
        isEdit,
        subtitle,
        title,
        types,
        userId,
      ],
    )

    useEffect(() => {
      if (isSuccess && data?.id) {
        navigate(
          routes.articleDetails({
            id: String(data.id),
          }),
        )
      }
    }, [data?.id, isSuccess, navigate])

    useEffect(() => {
      if (editArticle) {
        updateTitle(editArticle.title)
        updateSubtitle(editArticle.subtitle ?? '')
        updateImg(editArticle.img)
        updateTypes(editArticle.types)

        getSanitizedDomFromString(editArticle.contentHtmlString).then(
          (dom) => {
            editorRef.current?.update(() => {
              if (editorRef.current === null) return

              const nodes = $generateNodesFromDOM(
                editorRef.current,
                dom,
              )

              $getRoot().select()

              const noTextNodes = nodes.map((node) => {
                if ($isTextNode(node)) {
                  if (__IS_DEV__) {
                    // eslint-disable-next-line no-console
                    console.warn(
                      'Text node found. All nodes: ',
                      nodes,
                    )
                  }
                  const paragraphNode = $createParagraphNode()
                  paragraphNode.append(node)
                  return paragraphNode
                }

                return node
              })

              $insertNodes(noTextNodes)
            })
          },
        )
      }
    }, [
      editArticle,
      updateImg,
      updateSubtitle,
      updateTitle,
      updateTypes,
    ])

    const InputComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Input,
      off: () => InputDeprecated,
    })

    const SelectComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Select,
      off: () => SelectDeprecated,
    })

    const WithLabelComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => WithLabel,
      off: () => WithLabelDeprecated,
    })

    const SkeletonComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Skeleton,
      off: () => SkeletonDeprecated,
    })

    const buttonProps = {
      type: 'submit' as const,
      children: isEdit ? t('Edit') : t('Publish'),
    }

    return (
      <VStack
        as='form'
        className={className}
        maxWidth
        gap={1}
        onSubmit={onSubmit}
      >
        {isError && (
          <ToggleFeature
            name='isAppRedesigned'
            on={<p>{t('Error happened while creating article')}</p>}
            off={
              <Text
                text={t('Error happened while creating article')}
                theme={TextTheme.ERROR}
              />
            }
          />
        )}
        <InputComponent
          value={title}
          onChange={updateTitle}
          placeholder={t('Javascript news 2023')}
          label={t('Title')}
          maxWidth
          required
        />
        <InputComponent
          value={subtitle}
          onChange={updateSubtitle}
          placeholder={t(
            'JavaScript updates and how to run JS code in a browser',
          )}
          label={t('Subtitle')}
          maxWidth
        />
        <InputComponent
          value={img}
          onChange={updateImg}
          placeholder={t('Link to image')}
          label={t('Thumbnail')}
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
              fallback={
                <SkeletonComponent width='15rem' height='15rem' />
              }
            />
          </>
        )}
        <SelectComponent
          options={articleTypeToSelect}
          onChange={updateTypes}
          label={t('Types')}
          direction='down-right'
          value={types}
          multiple
          required
          listProps={{
            className: styles.selectTypes,
          }}
        />

        <WithLabelComponent
          required={false}
          label={t('Content')}
          maxWidth
        >
          <ArticleEditor ref={editorRef} />
        </WithLabelComponent>
        {ToggleFeature({
          name: 'isAppRedesigned',
          on: <Button {...buttonProps} />,
          off: <ButtonDeprecated {...buttonProps} />,
        })}
      </VStack>
    )
  },
)

CreateArticle.displayName = 'CreateArticle'
