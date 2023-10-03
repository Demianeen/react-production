import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Input } from '@/shared/ui/redesigned/Input'
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Button } from '@/shared/ui/redesigned/Button'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { useTranslation } from 'react-i18next'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { FormEventHandler } from 'react'
import { useCallback, useState } from 'react'
import styles from './ImagePrompt.module.scss'

export interface ImagePromptValues {
  src: string
  altText: string
}

export interface ImagePromptProps {
  className?: string
  onSubmit: ({ src, altText }: ImagePromptValues) => void
  onClose: () => void
}

export const ImagePrompt = ({
  className,
  onSubmit,
  onClose,
}: ImagePromptProps) => {
  const { t } = useTranslation('editor')
  const [src, setSrc] = useState('')
  const [altText, setAltText] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      onSubmit({
        src,
        altText,
      })
    },
    [altText, onSubmit, src],
  )

  const ModalComponent = toggleFeature({
    name: 'isAppRedesigned',
    on: () => Modal,
    off: () => ModalDeprecated,
  })

  const InputComponent = toggleFeature({
    name: 'isAppRedesigned',
    on: () => Input,
    off: () => InputDeprecated,
  })

  const buttonProps = {
    type: 'submit' as const,
    children: t('Insert'),
    className: styles.button,
  }

  return (
    <ModalComponent onClose={onClose} isOpen className={className}>
      <VStack as='form' gap={1} onSubmit={handleSubmit}>
        <InputComponent
          type='url'
          label={t('Image url')}
          required
          maxWidth
          value={src}
          onChange={setSrc}
          autoFocus
        />
        <InputComponent
          label={t('Alt text')}
          maxWidth
          value={altText}
          onChange={setAltText}
        />
        {ToggleFeature({
          name: 'isAppRedesigned',
          on: <Button {...buttonProps} />,
          off: <ButtonDeprecated {...buttonProps} />,
        })}
      </VStack>
    </ModalComponent>
  )
}
