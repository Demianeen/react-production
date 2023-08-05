import type { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import type { AxiosStatic } from 'axios'
import axios from 'axios'
import type { StateSchema } from '@/app/providers/StoreProvider'

type ActionCreator<Return, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

/**
 * This class is used to test async thunks.
 * It mocks dispatch, getState and thunk extra arguments.
 * 
 * Usage:
 * ```ts
  // defines mocked state for the test
  const state = {
    articleDetails: {
      data: {
        id: 1,
      },
    },
    user: {
      authData: {
        id: 1,
      },
    },
  }

  // creates a new instance of TestAsyncThunk. First argument is the thunk to test, second is the mocked state
  const thunk = new TestAsyncThunk(sendArticleComment, state)
 
  // defines the expected result
  const newComment = {
    body: 'new comment body',
    id: 4,
  }

  // mocks axios.post
  thunk.api.post.mockReturnValue(
    Promise.resolve({
      data: newComment,
    })
  )

  // calls the mocked thunk
  const result = await thunk.call('new comment body')

  // asserts the result
  expect(result.payload).toEqual(newComment)
  expect(thunk.api.post).toHaveBeenCalled()
  expect(result.meta.requestStatus).toEqual('fulfilled')
  * ```
 */
export class TestAsyncThunk<Return, Arg, RejectValue> {
  dispatch: jest.MockedFunction<Dispatch>

  getState: () => StateSchema

  actionCreator: ActionCreator<Return, Arg, RejectValue>

  api: jest.MockedFunctionDeep<AxiosStatic>

  constructor(
    actionCreator: ActionCreator<Return, Arg, RejectValue>,
    state?: DeepPartial<StateSchema>
  ) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn(() => state as StateSchema)
    this.api = mockedAxios
  }

  async call(arg: Arg) {
    // we create an action that we normally put into dispatch
    const action = this.actionCreator(arg)

    // normally this is passed by redux-thunk middleware
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
    })

    return result
  }
}
