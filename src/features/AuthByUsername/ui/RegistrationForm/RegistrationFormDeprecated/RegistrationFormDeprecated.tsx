import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text } from '@/shared/ui/deprecated/Text'
import { Spinner } from '@/shared/ui/deprecated/Spinner'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useRegistrationForm } from '../../../lib/useRegistrationForm'
import {
  useRegistrationFormUsername,
  useRegistrationFormPassword,
  useRegistrationFormConfirmPassword,
  useRegistrationFormIsLoading,
} from '../../../model/selectors/registrationSelectors'
import { useRegistrationFormActions } from '../../../model/slice/registrationFormSlice'
import styles from './RegistrationForm.module.scss'

interface RegistrationFormProps {
  className?: string
  onSuccess: () => void
}

const RegistrationFormDeprecated = memo(
  ({ className, onSuccess }: RegistrationFormProps) => {
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
        <Text title={t('Registration form')} />
        {validationErrors}
        <Input
          autoFocus
          type='text'
          placeholder={t('New username')}
          className={styles.input}
          onChange={setUsername}
          value={username}
          label={t('Username')}
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
        {isLoading && <Spinner />}
        <Button
          theme={ButtonTheme.OUTLINE}
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

RegistrationFormDeprecated.displayName = 'LoginForm'

export default RegistrationFormDeprecated
