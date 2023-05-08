import { initQueryParams } from './initQueryParams'
import { getQueryParams } from '../getQueryParams/getQueryParams'

jest.mock(
  'shared/lib/url/getQueryParams/getQueryParams',
  () => ({
    __esModule: true,
    getQueryParams: jest.fn(),
  })
)
const mockedGetQueryParams = jest.mocked(getQueryParams)

describe('initQueryParams', () => {
  test('all params with value', () => {
    const func = jest.fn()
    const func2 = jest.fn()

    const searchParams = new URLSearchParams()
    searchParams.set('param', 'value')
    searchParams.set('param2', 'value2')

    mockedGetQueryParams.mockReturnValue(searchParams)
    initQueryParams({ param: func, param2: func2 })

    expect(func).toHaveBeenCalledWith('value')
    expect(func2).toHaveBeenCalledWith('value2')
  })

  test('some params without value', () => {
    const func = jest.fn()
    const func2 = jest.fn()

    const searchParams = new URLSearchParams()
    searchParams.set('param', 'value')

    mockedGetQueryParams.mockReturnValue(searchParams)
    initQueryParams({ param: func, param2: func2 })

    expect(func).toHaveBeenCalledWith('value')
    expect(func2).not.toHaveBeenCalled()
  })
})
