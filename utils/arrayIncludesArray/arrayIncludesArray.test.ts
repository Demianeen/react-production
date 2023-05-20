import { arrayIncludesArray } from './arrayIncludesArray'

describe('arrayIncludesArray', () => {
  it('should return the true', () => {
    expect(
      arrayIncludesArray(['a', 'b', 'c'], ['a', 'b'])
    ).toEqual(true)
  })

  it('should return the false', () => {
    expect(
      arrayIncludesArray(['a', 'b', 'c'], ['d', 'e'])
    ).toEqual(false)
  })

  it('should work with empty arrays', () => {
    expect(arrayIncludesArray([], [])).toEqual(true)
  })
})
