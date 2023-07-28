import type { FormEvent } from 'react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DesktopView,
  MobileView,
} from '@/shared/lib/components/UserAgent'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Input } from '@/shared/ui/redesigned/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Title } from '@/shared/ui/redesigned/Title'
import { StarRating } from '@/shared/ui/redesigned/StarRating'

export interface RatingCardRedesignedProps {
  className?: string
  title: string
  feedbackTitle: string
  onCancel?: (starCount: number) => void
  onSubmit?: (starCount: number, feedback?: string) => void
  rating?: number
}

export const RatingCardRedesigned = memo(
  ({
    className,
    feedbackTitle,
    title,
    onSubmit,
    onCancel,
    rating = 0,
  }: RatingCardRedesignedProps) => {
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
        onSubmit?.(starCount, feedback === '' ? undefined : feedback)
      },
      [feedback, onSubmit, starCount]
    )

    const handleCancel = useCallback(() => {
      setIsModalOpen(false)
      onCancel?.(starCount)
    }, [onCancel, starCount])

    const content = (
      <>
        <Title>{feedbackTitle}</Title>
        <Input
          label={t('Your feedback')}
          value={feedback}
          onChange={setFeedback}
          maxWidth
          data-testid='RatingCard.FeedbackInput'
        />
      </>
    )

    return (
      <Card className={className} maxWidth data-testid='RatingCard'>
        <VStack align='center' gap={1} maxWidth>
          <Title>
            {starCount !== 0 ? t('Thank you for assessment!') : title}
          </Title>
          <StarRating
            selectedStars={rating}
            onSelect={onSelectStars}
          />
        </VStack>
        <DesktopView>
          <Modal isOpen={isModalOpen} onClose={handleCancel} lazy>
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
                  onClick={handleCancel}
                  data-testid='RatingCard.CancelButton'
                >
                  {t('Close')}
                </Button>
                <Button
                  type='submit'
                  data-testid='RatingCard.SubmitButton'
                >
                  {t('Send')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </DesktopView>
        <MobileView>
          <Drawer isOpen={isModalOpen} onClose={handleCancel}>
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

RatingCardRedesigned.displayName = 'RatingCard'
