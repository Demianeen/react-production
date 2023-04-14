import type { Story } from '@storybook/react'
import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import { loginFormSliceName } from 'features/AuthByUsername'
import { loginReducer } from 'features/AuthByUsername/modal/slice/loginFormSlice'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice'

const defaultAsyncReducers: ReducersList = {
  [loginFormSliceName]: loginReducer,
  profile: profileReducer,
}

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) =>
  function decorator(StoryComponent: Story) {
    return (
      <StoreProvider
        preloadedState={initialState}
        preloadedAsyncReducers={{
          ...defaultAsyncReducers,
          ...asyncReducers,
        }}
      >
        <StoryComponent />
      </StoreProvider>
    )
  }
