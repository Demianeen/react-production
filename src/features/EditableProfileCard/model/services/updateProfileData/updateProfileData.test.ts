import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { ProfileValidationError } from '@/features/EditableProfileCard/model/const/profileValidationError'
import { mockProfile } from '../../mocks/data'
import { validateProfileForm } from '../validateProfileForm/validateProfileForm'
import { updateProfileData } from './updateProfileData'

jest.mock(
  '../validateProfileForm/validateProfileForm',
  () => ({
    __esModule: true,
    validateProfileForm: jest.fn(() => []),
  })
)
const mockedValidateProfileForm = jest.mocked(
  validateProfileForm
)

describe('updateProfileData', () => {
  test('fulfilled', async () => {
    const returnValue = {
      data: mockProfile,
    }

    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: mockProfile,
      },
    })

    thunk.api.put.mockReturnValue(
      Promise.resolve(returnValue)
    )
    const result = await thunk.call()

    expect(result.payload).toEqual(mockProfile)
    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('fulfilled')
  })

  test('rejected', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {},
    })
    thunk.api.put.mockReturnValue(
      Promise.resolve({
        status: 403,
      })
    )
    const result = await thunk.call()

    expect(mockedValidateProfileForm).toHaveBeenCalled()
    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual([
      ProfileValidationError.UNKNOWN_SERVER_ERROR,
    ])
    expect(thunk.api.put).toHaveBeenCalled()
  })

  test('validation error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: {
          ...mockProfile,
          age: undefined,
        },
      },
    })

    mockedValidateProfileForm.mockReturnValue([
      ProfileValidationError.MISSING_AGE,
    ])

    const result = await thunk.call()

    expect(result.meta.requestStatus).toEqual('rejected')
    expect(result.payload).toEqual([
      ProfileValidationError.MISSING_AGE,
    ])
    expect(thunk.api.put).not.toHaveBeenCalled()
  })
})
