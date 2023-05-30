import type { FormEvent } from 'react'
import { memo, useCallback, useState } from 'react'
import { Card } from '@/shared/ui/Card'
import { StarRating } from '@/shared/ui/StarRating'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { Drawer } from '@/shared/ui/Drawer'

interface RatingCardProps {
  className?: string
  title: string
  feedbackTitle: string
  onCancel?: (starCount: number) => void
  onSubmit?: (starCount: number, feedback?: string) => void
  squared?: boolean
  rating?: number
  maxWidth?: boolean
}

export const RatingCard = memo(
  ({
    className,
    feedbackTitle,
    title,
    onSubmit,
    onCancel,
    squared,
    rating = 0,
    maxWidth = false,
  }: RatingCardProps) => {
    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starCount, setStarCount] = useState(rating)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
      (newStarCount: number) => {
        setStarCount(newStarCount)
        if (feedbackTitle !== undefined) {
          setIsModalOpen(true)
        } else {
          onSubmit?.(newStarCount)
        }
      },
      [feedbackTitle, onSubmit]
    )

    const handleSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsModalOpen(false)
        onSubmit?.(
          starCount,
          feedback === '' ? undefined : feedback
        )
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
        squared={squared}
        maxWidth={maxWidth}
      >
        <VStack align='center' gap={1} maxWidth>
          <Text
            title={
              starCount !== 0
                ? t('Thank you for assessment!')
                : title
            }
          />
          <StarRating
            selectedStars={rating}
            onSelect={onSelectStars}
          />
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