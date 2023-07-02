import {
  useSaveJsonSettings,
  useUserJsonSettings,
} from '@/entities/User'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { Text } from '@/shared/ui/deprecated/Text'
import { Modal } from '@/shared/ui/deprecated/Modal'
import { Drawer } from '@/shared/ui/deprecated/Drawer'

export const ArticlePageGreeting = typedMemo(() => {
  const { t } = useTranslation('articles')

  const [isOpen, setIsOpen] = useState(false)
  const { isArticlePageWasOpened } = useUserJsonSettings()
  const saveJsonSettings = useSaveJsonSettings()

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true)
      saveJsonSettings({
        isArticlePageWasOpened: true,
      })
    }
  }, [isArticlePageWasOpened, saveJsonSettings])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const text = (
    <Text
      title={t('Welcome to the articles page')}
      text={t('Here you can view articles on different topics')}
    />
  )
  return (
    <>
      <DesktopView>
        <Modal lazy isOpen={isOpen} onClose={onClose}>
          {text}
        </Modal>
      </DesktopView>
      <MobileView>
        <Drawer isOpen={isOpen} onClose={onClose}>
          {text}
        </Drawer>
      </MobileView>
    </>
  )
})
