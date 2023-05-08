import {
  addQueryParams,
  getNewQueryParamsString,
} from './addQueryParams'

describe('addQueryParams', () => {
  test('with one param', () => {
    const newParams = getNewQueryParamsString({
      key: 'value',
    })
    expect(newParams).toBe('?key=value')
  })

  test('with multiple params', () => {
    const newParams = getNewQueryParamsString({
      key: 'value',
      key2: 'value2',
    })
    expect(newParams).toBe('?key=value&key2=value2')
  })

  test('with undefined param', () => {
    const newParams = getNewQueryParamsString({
      key: 'value',
      key2: undefined,
    })
    expect(newParams).toBe('?key=value')
  })

  test('call history.pushState', () => {
    const pushStateSpy = jest.spyOn(
      window.history,
      'pushState'
    )
    addQueryParams({ key: 'value' })
    expect(pushStateSpy).toHaveBeenCalledWith(
      null,
      '',
      '?key=value'
    )
  })
})
