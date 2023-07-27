import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Spinner } from '@/shared/ui/deprecated/Spinner'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useLoginFormError } from '../../../model/selectors/getLoginFormError/getLoginFormError'
import { useLoginFormIsLoading } from '../../../model/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import { useLoginFormPassword } from '../../../model/selectors/getLoginFormPassword/getLoginFormPassword'
import { useLoginFormUsername } from '../../../model/selectors/getLoginFormUsername/getLoginFormUsername'
import styles from './LoginForm.module.scss'
import { useLoginForm } from '../../../lib/useLoginForm'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginFormDeprecated = memo(
  ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()
    const { onLogin, onChangeUsername, onChangePassword } =
      useLoginForm(onSuccess)

    const username = useLoginFormUsername()
    const password = useLoginFormPassword()
    const error = useLoginFormError()
    const isLoading = useLoginFormIsLoading()

    return (
      <VStack
        as='form'
        onSubmit={onLogin}
        className={classNames(styles.loginForm, {}, [className])}
      >
        <Text title={t('Login form')} />
        {error && (
          <Text
            theme={TextTheme.ERROR}
            text={t('Username or password is incorrect')}
          />
        )}
        <Input
          autoFocus
          type='text'
          placeholder={t('Your username')}
          className={styles.input}
          onChange={onChangeUsername}
          value={username}
          label={t('Enter username')}
          autoComplete='username'
          wrapperClassName={styles.inputWrapper}
          maxWidth
          required
        />
        <Input
          type='password'
          placeholder={t('Your password')}
          className={styles.input}
          onChange={onChangePassword}
          value={password}
          label={t('Enter password')}
          autoComplete='current-password'
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

LoginFormDeprecated.displayName = 'LoginForm'

export default LoginFormDeprecated
