import type { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'

const getCreateArticleState = (state: StateSchema) =>
  state.createArticle

export const [useCreateArticleForm, getCreateArticleForm] =
  buildSelector(getCreateArticleState, (state) => state?.form)

export const [useCreateArticleFormTitle, getCreateArticleFormTitle] =
  buildSelector(getCreateArticleForm, (state) => state?.title ?? '')

export const [
  useCreateArticleFormSubTitle,
  getCreateArticleFormSubTitle,
] = buildSelector(
  getCreateArticleForm,
  (state) => state?.subtitle ?? ''
)

export const [useCreateArticleFormImage, getCreateArticleFormImage] =
  buildSelector(getCreateArticleForm, (state) => state?.img ?? '')

export const [useCreateArticleFormTypes, getCreateArticleFormTypes] =
  buildSelector(getCreateArticleForm, (state) => state?.types ?? [])
