import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

import { useTranslation } from 'react-i18next'
import { Spinner } from '@/shared/ui/redesigned/Spinner'
import { Title } from '@/shared/ui/redesigned/Title'
import { useRegistrationForm } from '../../../lib/useRegistrationForm'
import { type OnSuccess } from '../../../lib/useLoginForm'
import styles from './RegistrationForm.module.scss'
import {
  useRegistrationFormUsername,
  useRegistrationFormPassword,
  useRegistrationFormConfirmPassword,
  useRegistrationFormIsLoading,
} from '../../../model/selectors/registrationSelectors'
import { useRegistrationFormActions } from '../../../model/slice/registrationFormSlice'

export interface RegistrationFormRedesignedProps {
  className?: string
  onSuccess: OnSuccess
}

const RegistrationFormRedesigned = memo(
  ({ className, onSuccess }: RegistrationFormRedesignedProps) => {
    const { t } = useTranslation()
    const { onRegister, validationErrors } =
      useRegistrationForm(onSuccess)

    const username = useRegistrationFormUsername()
    const password = useRegistrationFormPassword()
    const confirmPassword = useRegistrationFormConfirmPassword()
    const isLoading = useRegistrationFormIsLoading()

    const { setUsername, setPassword, setConfirmPassword } =
      useRegistrationFormActions()

    return (
      <VStack
        as='form'
        onSubmit={onRegister}
        className={classNames(styles.loginForm, {}, [className])}
      >
        <HStack gap={0.5}>
          <Title>{t('Registration form')}</Title>
          {isLoading && <Spinner />}
        </HStack>
        {validationErrors}
        <Input
          autoFocus
          type='text'
          placeholder={t('Your username')}
          className={styles.input}
          onChange={setUsername}
          value={username}
          label={t('Enter username')}
          autoComplete='username'
          wrapperClassName={styles.inputWrapper}
          maxWidth
          required
        />
        <Input
          type='password'
          placeholder={t('New password')}
          className={styles.input}
          onChange={setPassword}
          value={password}
          label={t('Password')}
          autoComplete='new-password'
          wrapperClassName={styles.inputWrapper}
          maxWidth
          required
        />
        <Input
          type='password'
          placeholder={t('New password again')}
          className={styles.input}
          onChange={setConfirmPassword}
          value={confirmPassword}
          label={t('Confirm password')}
          autoComplete='new-password'
          wrapperClassName={styles.inputWrapper}
          maxWidth
          required
        />
        <Button
          className={styles.loginBtn}
          type='submit'
          disabled={isLoading}
        >
          {t('Login')}
        </Button>
      </VStack>
    )
  }
)

RegistrationFormRedesigned.displayName = 'LoginForm'

export default RegistrationFormRedesigned
