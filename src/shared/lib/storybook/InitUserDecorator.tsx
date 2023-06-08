import type { StoryFn } from '@storybook/react'
import { AUTH_DATA_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { userActions } from '@/entities/User'
import { mockUser } from '@/entities/User/testing'
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch'

/**
 * initialize or remove user data in redux store
 * @param userId number or null to remove user data
 * @returns
 */
export const InitUserDecorator = (
  userId: number | null = 1
) =>
  function Decorator(StoryComponent: StoryFn) {
    const dispatch = useAppDispatch()

    if (userId !== null) {
      localStorage.setItem(
        AUTH_DATA_LOCALSTORAGE_KEY,
        JSON.stringify({ ...mockUser, id: userId })
      )
    }
    dispatch(userActions.setAuthDataFromLocalStorage())
    localStorage.removeItem(AUTH_DATA_LOCALSTORAGE_KEY)

    return <StoryComponent />
  }
