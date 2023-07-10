import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { FormEvent } from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  loginActions,
  loginReducer,
} from '../model/slice/loginFormSlice'
import { loginByUsername } from '../model/services/loginByUsername/loginByUsername'
import { getLoginFormUsername } from '../model/selectors/getLoginFormUsername/getLoginFormUsername'
import { getLoginFormPassword } from '../model/selectors/getLoginFormPassword/getLoginFormPassword'

const reducersList: ReducersList = {
  loginForm: loginReducer,
}

export type OnSuccess = () => void

export const useLoginForm = (onSuccess: OnSuccess) => {
  useDynamicModuleLoader(reducersList)
  const dispatch = useAppDispatch()

  const username = useSelector(getLoginFormUsername) ?? ''
  const password = useSelector(getLoginFormPassword) ?? ''

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

  return {
    onChangeUsername,
    onChangePassword,
    onLogin,
  }
}
