import type { FormEvent } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Spinner } from '@/shared/ui/deprecated/Spinner'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { VStack } from '@/shared/ui/redesigned/Stack'
import {
  loginActions,
  loginReducer,
} from '../../model/slice/loginFormSlice'
import { getLoginFormPassword } from '../../model/selectors/getLoginFormPassword/getLoginFormPassword'
import { getLoginFormError } from '../../model/selectors/getLoginFormError/getLoginFormError'
import { getLoginFormUsername } from '../../model/selectors/getLoginFormUsername/getLoginFormUsername'
import { getLoginFormIsLoading } from '../../model/selectors/getLoginFormIsLoading/getLoginFormIsLoading'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const reducersList: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

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
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
