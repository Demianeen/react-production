import i18n from '@/shared/config/i18n/i18n'
import { Spinner } from '@/shared/ui/Spinner'
import type { StoryContext, StoryFn } from '@storybook/react'
import { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

export const I18NextDecorator = (
  StoryComponent: StoryFn,
  { globals: { locale } }: StoryContext
) => {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<Spinner />}>
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    </Suspense>
  )
}
