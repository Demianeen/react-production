import { memo, useCallback, useState } from 'react'
import { Card } from '@/shared/ui/Card/Card'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text/Text'
import {
  Button,
  ButtonTheme,
} from '@/shared/ui/Button/Button'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

interface RatingCardProps {
  className?: string
  title: string
  feedbackTitle: string
  onCancel?: (starCount: number) => void
  onSubmit?: (starCount: number, feedback?: string) => void
  noBorderRadius?: boolean
}

export const RatingCard = memo(
  ({
    className,
    feedbackTitle,
    title,
    onSubmit,
    onCancel,
    noBorderRadius,
  }: RatingCardProps) => {
    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starCount, setStarCount] = useState(0)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
      (newStarCount: number) => {
        if (feedbackTitle !== undefined) {
          setIsModalOpen(true)
        } else {
          setStarCount(newStarCount)
          onSubmit?.(newStarCount)
        }
      },
      [feedbackTitle, onSubmit]
    )

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsModalOpen(false)
        onSubmit?.(starCount, feedback)
      },
      [feedback, onSubmit, starCount]
    )

    const handleCancel = useCallback(() => {
      setIsModalOpen(false)
      onCancel?.(starCount)
    }, [onCancel, starCount])

    const content = (
      <>
        <Text title={feedbackTitle} />
        <Input
          label={t('Your feedback')}
          value={feedback}
          onChange={setFeedback}
          maxWidth
        />
      </>
    )

    return (
      <Card
        className={className}
        noBorderRadius={noBorderRadius}
      >
        <VStack align='center' gap={1} maxWidth>
          <Text title={title} />
          <StarRating onSelect={onSelectStars} />
        </VStack>
        <DesktopView>
          <Modal
            isOpen={isModalOpen}
            onClose={handleCancel}
            lazy
          >
            <VStack
              maxWidth
              gap={2}
              as='form'
              onSubmit={handleSubmit}
            >
              {content}
              <HStack justify='end' gap={1} maxWidth>
                <Button
                  type='button'
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={handleCancel}
                >
                  {t('Close')}
                </Button>
                <Button type='submit'>{t('Send')}</Button>
              </HStack>
            </VStack>
          </Modal>
        </DesktopView>
        <MobileView>
          <Drawer
            isOpen={isModalOpen}
            onClose={handleCancel}
          >
            <VStack
              maxWidth
              gap={1.25}
              as='form'
              onSubmit={handleSubmit}
            >
              {content}
              <Button type='submit' maxWidth>
                {t('Send')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </Card>
    )
  }
)

RatingCard.displayName = 'RatingCard'
