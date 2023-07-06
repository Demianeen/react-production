import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Input, InputSkeleton } from '@/shared/ui/redesigned/Input'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import type { Currency } from '@/entities/Currency'
import { SelectCurrency } from '@/entities/Currency'
import type { Country } from '@/entities/Country'
import { SelectCountry } from '@/entities/Country'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { Card } from '@/shared/ui/redesigned/Card'
import type { Profile } from '../../../model/types/profile'
import styles from './ProfileCardRedesigned.module.scss'

export interface ProfileCardRedesignedProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  readonly?: boolean
  error?: string
  onChangeFirstName?: (value: string) => void
  onChangeLastName?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
  formId?: string
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const ProfileCardRedesigned = ({
  className,
  data,
  isLoading = false,
  readonly = false,
  error,
  onChangeFirstName,
  onChangeLastName,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry,
  formId = 'profile-card',
  onSubmit,
}: ProfileCardRedesignedProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <VStack gap={2} as={Card} className={className} maxWidth>
        <HStack justify='center' maxWidth>
          <Skeleton variant='circular' size='8rem' />
        </HStack>
        <div className={styles.content}>
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </div>
      </VStack>
    )
  }

  if (error) {
    return (
      <HStack as={Card} height='15rem' justify='center' maxWidth>
        <Title level={2}>{t('Profile not found')}</Title>
      </HStack>
    )
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <VStack gap={2} as={Card} className={className} maxWidth>
      <HStack justify='center' maxWidth>
        <Avatar size='8rem' src={data?.avatar} />
      </HStack>
      <form
        className={styles.content}
        id={formId}
        onSubmit={onFormSubmit}
      >
        <Input
          value={data?.firstName}
          placeholder={t('John')}
          label={t('First name')}
          onChange={onChangeFirstName}
          readonly={readonly}
          data-testid='ProfileCard.firstName'
          maxWidth
        />
        <Input
          value={data?.username}
          placeholder={t('Your creative username')}
          label={t('Username')}
          onChange={onChangeUsername}
          readonly={readonly}
          data-testid='ProfileCard.username'
          maxWidth
        />
        <Input
          value={data?.lastName}
          placeholder={t('Doe')}
          label={t('Last name')}
          onChange={onChangeLastName}
          readonly={readonly}
          data-testid='ProfileCard.lastName'
          maxWidth
        />
        <Input
          value={data?.avatar}
          placeholder={t('Link to new picture')}
          label={t('Avatar')}
          onChange={onChangeAvatar}
          readonly={readonly}
          data-testid='ProfileCard.avatar'
          maxWidth
        />
        <Input
          value={data?.age}
          placeholder='30'
          label={t('Age')}
          onChange={onChangeAge}
          readonly={readonly}
          data-testid='ProfileCard.age'
          maxWidth
        />
        <SelectCurrency
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
          className={styles.select}
          direction='up-left'
          data-testid='ProfileCard.currency'
        />
        <Input
          value={data?.city}
          placeholder={t('London')}
          label={t('City')}
          onChange={onChangeCity}
          readonly={readonly}
          data-testid='ProfileCard.city'
          maxWidth
        />
        <SelectCountry
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
          className={styles.select}
          direction='up-left'
          data-testid='ProfileCard.country'
        />
      </form>
    </VStack>
  )
}
