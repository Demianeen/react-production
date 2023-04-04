import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import { loginByUsername } from '../../modal/services/loginByUsername/loginByUsername'
import { getLoginFormState } from '../../modal/selectors/getLoginState/getLoginFormState'
import { loginActions } from '../../modal/slice/loginSlice'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(
  ({ className }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { username, password, error, isLoading } =
      useSelector(getLoginFormState)

    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(loginActions.setUsername(value))
      },
      [dispatch]
    )

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value))
      },
      [dispatch]
    )

    const onLogin = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(loginByUsername({ username, password }))
      },
      [dispatch, password, username]
    )

    return (
      <form
        onSubmit={onLogin}
        className={classNames(styles.loginForm, {}, [
          className,
        ])}
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
          placeholder={t('Enter username')}
          className={styles.input}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type='password'
          placeholder={t('Enter password')}
          className={styles.input}
          onChange={onChangePassword}
          value={password}
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
      </form>
    )
  }
)

LoginForm.displayName = 'LoginForm'
