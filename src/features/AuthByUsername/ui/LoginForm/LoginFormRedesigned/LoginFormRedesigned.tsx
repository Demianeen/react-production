import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Spinner } from '@/shared/ui/redesigned/Spinner'
import { Title } from '@/shared/ui/redesigned/Title'
import { Typography } from '@/shared/ui/redesigned/Typography'
import { getLoginFormError } from '../../../model/selectors/getLoginFormError/getLoginFormError'
import { getLoginFormIsLoading } from '../../../model/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import { getLoginFormPassword } from '../../../model/selectors/getLoginFormPassword/getLoginFormPassword'
import { getLoginFormUsername } from '../../../model/selectors/getLoginFormUsername/getLoginFormUsername'
import {
  useLoginForm,
  type OnSuccess,
} from '../../../lib/useLoginForm'
import styles from './LoginForm.module.scss'

export interface LoginFormRedesignedProps {
  className?: string
  onSuccess: OnSuccess
}

const LoginFormRedesigned = memo(
  ({ className, onSuccess }: LoginFormRedesignedProps) => {
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
        <HStack gap={0.5}>
          <Title>{t('Login form')}</Title>
          {isLoading && <Spinner />}
        </HStack>

        {error && (
          <Typography variant='error'>
            {t('Username or password is incorrect')}
          </Typography>
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

LoginFormRedesigned.displayName = 'LoginForm'

export default LoginFormRedesigned
