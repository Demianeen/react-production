import type { StoryFn } from '@storybook/react'
import { USER_ID_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { useInitAuthData } from '@/entities/User'

/**
 * initialize or remove user data in redux store
 * @param userId number or null to remove user data
 * @returns
 */
export const InitUserDecorator = (userId: number | null = 1) =>
  function Decorator(StoryComponent: StoryFn) {
    const initAuthData = useInitAuthData()

    localStorage.setItem(USER_ID_LOCALSTORAGE_KEY, String(userId))

    initAuthData()

    return <StoryComponent />
  }
