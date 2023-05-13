import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { VStack } from 'shared/ui/Stack'
import { getLoginFormPassword } from '../../modal/selectors/getLoginFormPassword/getLoginFormPassword'
import { getLoginFormError } from '../../modal/selectors/getLoginFormError/getLoginFormError'
import { getLoginFormUsername } from '../../modal/selectors/getLoginFormUsername/getLoginFormUsername'
import { getLoginFormIsLoading } from '../../modal/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import styles from './LoginForm.module.scss'
import {
  loginActions,
  loginReducer,
} from '../../modal/slice/loginFormSlice'
import { loginByUsername } from '../../modal/services/loginByUsername/loginByUsername'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const reducersList: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = memo(
  ({ className, onSuccess }: LoginFormProps) => {
    useDynamicModuleLoader(reducersList)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const username = useSelector(getLoginFormUsername) ?? ''
    const password = useSelector(getLoginFormPassword) ?? ''
    const error = useSelector(getLoginFormError)
    const isLoading = useSelector(getLoginFormIsLoading)

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
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const result = await dispatch(
          loginByUsername({ username, password })
        )
        if (result.meta.requestStatus === 'fulfilled') {
          onSuccess()
        }
      },
      [dispatch, onSuccess, password, username]
    )

    return (
      <VStack
        as='form'
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
          placeholder={t('Your username')}
          className={styles.input}
          onChange={onChangeUsername}
          value={username}
          label={t('Enter username')}
          autoComplete='username'
          wrapperClassName={styles.inputWrapper}
          maxWidth
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

LoginForm.displayName = 'LoginForm'

export default LoginForm
