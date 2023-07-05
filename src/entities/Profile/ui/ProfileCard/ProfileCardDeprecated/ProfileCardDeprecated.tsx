import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  Text,
  TextAlign,
  TextTheme,
} from '@/shared/ui/deprecated/Text'
import { Input, InputSkeleton } from '@/shared/ui/deprecated/Input'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import type { Currency } from '@/entities/Currency'
import { SelectCurrency } from '@/entities/Currency'
import type { Country } from '@/entities/Country'
import { SelectCountry } from '@/entities/Country'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { Profile } from '../../../model/types/profile'
import styles from './ProfileCardDeprecated.module.scss'

interface ProfileCardDeprecatedProps {
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

export const ProfileCardDeprecated = ({
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
}: ProfileCardDeprecatedProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack
        className={styles.profileCard}
        maxWidth
        data-testid='ProfileCard.Loading'
      >
        <div className={styles.content}>
          <HStack justify='center' className={styles.avatarWrapper}>
            <Skeleton width='8rem' height='8rem' borderRadius='50%' />
          </HStack>
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
        </div>
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack
        height='15rem'
        justify='center'
        maxWidth
        className={styles.profileCard}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Profile not found')}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <HStack
      className={classNames(styles.profileCard, {}, [className])}
      maxWidth
    >
      <form
        className={styles.content}
        id={formId}
        onSubmit={onFormSubmit}
      >
        <HStack justify='center' className={styles.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </HStack>
        <Input
          value={data?.firstName}
          placeholder={t('John')}
          label={t('First name')}
          onChange={onChangeFirstName}
          readonly={readonly}
          data-testid='ProfileCard.firstName'
        />
        <Input
          value={data?.lastName}
          placeholder={t('Doe')}
          label={t('Last name')}
          onChange={onChangeLastName}
          readonly={readonly}
          data-testid='ProfileCard.lastName'
        />
        <Input
          value={data?.age}
          placeholder='30'
          label={t('Age')}
          onChange={onChangeAge}
          readonly={readonly}
          data-testid='ProfileCard.age'
        />
        <Input
          value={data?.city}
          placeholder={t('London')}
          label={t('City')}
          onChange={onChangeCity}
          readonly={readonly}
          data-testid='ProfileCard.city'
        />
        <Input
          value={data?.username}
          placeholder={t('Your creative username')}
          label={t('Username')}
          onChange={onChangeUsername}
          readonly={readonly}
          data-testid='ProfileCard.username'
        />
        <Input
          value={data?.avatar}
          placeholder={t('Link to new picture')}
          label={t('Avatar')}
          onChange={onChangeAvatar}
          readonly={readonly}
          data-testid='ProfileCard.avatar'
        />
        <SelectCurrency
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
          className={styles.select}
          direction='up-left'
          maxWidth
          data-testid='ProfileCard.currency'
        />
        <SelectCountry
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
          className={styles.select}
          direction='up-left'
          maxWidth
          data-testid='ProfileCard.country'
        />
      </form>
    </HStack>
  )
}
