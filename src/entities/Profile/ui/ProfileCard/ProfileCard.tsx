import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TextAlign,
  TextTheme,
} from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import type { Profile } from 'features/EditableProfileCard/model/types/profileSchema'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import type { Currency } from 'entities/Currency'
import { SelectCurrency } from 'entities/Currency'
import type { Country } from 'entities/Country'
import { SelectCountry } from 'entities/Country'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
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
}

export const ProfileCard = ({
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
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div
        className={classNames(styles.profileCard, {}, [
          className,
          styles.loading,
        ])}
      >
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={classNames(styles.profileCard, {}, [
          className,
          styles.error,
        ])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Something went wrong')}
          text={t('Try to reload the page')}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  return (
    <div
      className={classNames(styles.profileCard, {}, [
        className,
      ])}
    >
      <div className={styles.content}>
        {data?.avatar && (
          <div className={styles.avatarWrapper}>
            <Avatar src={data?.avatar} />
          </div>
        )}
        <Input
          value={data?.firstName}
          placeholder={t('John')}
          className={styles.input}
          label={t('First name')}
          onChange={onChangeFirstName}
          readonly={readonly}
        />
        <Input
          value={data?.lastName}
          placeholder={t('Doe')}
          className={styles.input}
          label={t('Last name')}
          onChange={onChangeLastName}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder='30'
          className={styles.input}
          label={t('Age')}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('London')}
          className={styles.input}
          label={t('City')}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder='30'
          className={styles.input}
          label={t('Username')}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Link to new picture')}
          className={styles.input}
          label={t('Avatar')}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <SelectCurrency
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <SelectCountry
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  )
}
