import type { User } from 'entities/User'
import { userActions, UserRole } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './loginByUsername'

// TODO: refactor tests with msw
describe('loginByUsername', () => {
  test('fulfilled login', async () => {
    const data: User = {
      id: 1,
      username: 'username',
      roles: [UserRole.USER],
    }

    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(
      Promise.resolve({ data })
    )
    const result = await thunk.call({
      username: 'username',
      password: '123',
    })

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(data)
    )
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
    expect(result.payload).toEqual(data)
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
