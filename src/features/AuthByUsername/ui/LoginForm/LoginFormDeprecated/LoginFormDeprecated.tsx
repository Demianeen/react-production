import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Spinner } from '@/shared/ui/deprecated/Spinner'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useLoginForm } from '../../../lib/useLoginForm'
import { getLoginFormError } from '../../../model/selectors/getLoginFormError/getLoginFormError'
import { getLoginFormIsLoading } from '../../../model/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import { getLoginFormPassword } from '../../../model/selectors/getLoginFormPassword/getLoginFormPassword'
import { getLoginFormUsername } from '../../../model/selectors/getLoginFormUsername/getLoginFormUsername'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginFormDeprecated = memo(
  ({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()
    const { onLogin, onChangeUsername, onChangePassword } =
      useLoginForm(onSuccess)

    const username = useSelector(getLoginFormUsername)
    const password = useSelector(getLoginFormPassword)
    const error = useSelector(getLoginFormError)
    const isLoading = useSelector(getLoginFormIsLoading)

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
