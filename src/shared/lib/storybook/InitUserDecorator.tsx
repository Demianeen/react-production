import type { StoryFn } from '@storybook/react'
import { AUTH_DATA_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { mockUser } from '@/entities/User/model/mocks/data'
import { userActions } from '@/entities/User'
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch'

export const InitUserDecorator = (userId = 1) =>
  function Decorator(StoryComponent: StoryFn) {
    const dispatch = useAppDispatch()

    localStorage.setItem(
      AUTH_DATA_LOCALSTORAGE_KEY,
      JSON.stringify({ ...mockUser, id: userId })
    )
    dispatch(userActions.setAuthDataFromLocalStorage())
    localStorage.removeItem(AUTH_DATA_LOCALSTORAGE_KEY)

    return <StoryComponent />
  }
