import { userActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './loginByUsername'

describe('loginByUsername', () => {
  test('fulfilled login', async () => {
    const returnValue = {
      data: { id: 1, username: 'username' },
    }

    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(
      Promise.resolve(returnValue)
    )
    const result = await thunk.call({
      username: 'username',
      password: '123',
    })

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(returnValue.data)
    )
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
    expect(result.payload).toEqual(returnValue.data)
  })

  test('rejected login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call({
      username: 'username',
      password: '123',
    })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual('error')
  })
})
