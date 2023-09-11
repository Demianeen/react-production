import { VStack } from '@/shared/ui/redesigned/Stack'
import { memo } from 'react'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { toggleFeature } from '@/shared/lib/features'
import { ArticleEditor } from '@/features/ArticleEditor'
import {
  useCreateArticleFormImage,
  useCreateArticleFormSubTitle,
  useCreateArticleFormTitle,
} from '../../model/selectors/createArticleSelectors'
import {
  createArticleReducer,
  useCreateArticleActions,
} from '../../model/slice/createArticleSlice'

interface CreateArticleProps {
  className?: string
}

const reducers: AsyncReducersList = {
  createArticle: createArticleReducer,
}

export const CreateArticle = memo(
  ({ className }: CreateArticleProps) => {
    useDynamicModuleLoader(reducers)

    // const content = useCreateArticleFormContent()
    const title = useCreateArticleFormTitle()
    const subtitle = useCreateArticleFormSubTitle()
    const img = useCreateArticleFormImage()

    const { updateTitle, updateSubtitle, updateImg } =
      useCreateArticleActions()

    const InputComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Input,
      off: () => InputDeprecated,
    })

    // const WithLabelComponent = toggleFeature({
    //   name: 'isAppRedesigned',
    //   on: () => WithLabel,
    //   off: () => WithLabelDeprecated,
    // })

    return (
      <VStack className={className} maxWidth gap={1}>
        <InputComponent
          value={title}
          onChange={updateTitle}
          placeholder='Javascript news 2023'
          label='Title'
          maxWidth
        />
        <InputComponent
          value={subtitle}
          onChange={updateSubtitle}
          placeholder='JavaScript updates and how to run JS code in a browser'
          label='Subtitle'
          maxWidth
        />
        <InputComponent
          value={img}
          onChange={updateImg}
          placeholder='Link to image'
          label='Image'
          maxWidth
        />
        {/* <WithLabelComponent label='Content' maxWidth>
          <WriteArticle
            boundaryElementId={boundaryElementId}
            value={content}
            onChange={updateContent}
          />
        </WithLabelComponent> */}
        <ArticleEditor />
      </VStack>
    )
  }
)

CreateArticle.displayName = 'CreateArticle'
