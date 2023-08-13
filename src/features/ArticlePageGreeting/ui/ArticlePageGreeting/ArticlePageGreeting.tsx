import {
  useIsUserLogged,
  useSaveJsonSettings,
  useUserJsonSettings,
} from '@/entities/User'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  MobileView,
  DesktopView,
} from '@/shared/lib/components/UserAgent'
import { Text } from '@/shared/ui/deprecated/Text'
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'
import { Modal } from '@/shared/ui/redesigned/Modal'

export const ArticlePageGreeting = typedMemo(() => {
  const { t } = useTranslation('articles')

  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageWasOpened } = useUserJsonSettings()
  const saveJsonSettings = useSaveJsonSettings()
  const isUserLogged = useIsUserLogged()

  useEffect(() => {
    if (!isArticlesPageWasOpened && isUserLogged) {
      setIsOpen(true)
      saveJsonSettings({
        isArticlesPageWasOpened: true,
      })
    }
  }, [isArticlesPageWasOpened, isUserLogged, saveJsonSettings])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const text = useMemo(
    () => (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <>
            <Title>{t('Welcome to the articles page')}</Title>
            {t('Here you can view articles on different topics')}
          </>
        }
        off={
          <Text
            title={t('Welcome to the articles page')}
            text={t('Here you can view articles on different topics')}
          />
        }
      />
    ),
    [t]
  )
  return (
    <>
      <DesktopView>
        <Modal lazy isOpen={isOpen} onClose={onClose}>
          {text}
        </Modal>
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Modal lazy isOpen={isOpen} onClose={onClose}>
              {text}
            </Modal>
          }
          off={
            <ModalDeprecated lazy isOpen={isOpen} onClose={onClose}>
              {text}
            </ModalDeprecated>
          }
        />
      </DesktopView>
      <MobileView>
        <Drawer isOpen={isOpen} onClose={onClose}>
          {text}
        </Drawer>
      </MobileView>
    </>
  )
})
