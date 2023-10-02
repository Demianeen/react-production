import { toggleFeature } from '@/shared/lib/features'
import { classNamesNew } from '../../../../shared/lib/classNames/classNamesNew'
import './getArticleStylesClassName.scss'

export const getArticleStylesClassName = () =>
  classNamesNew(
    'withArticleStyles',
    toggleFeature({
      name: 'isAppRedesigned',
      on: () => 'redesigned',
      off: () => 'deprecated',
    }),
  )
