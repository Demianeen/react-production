import { classNamesNew as classNames } from './classNamesNew'

describe('classnames', () => {
  test('with only first argument', () => {
    expect(classNames('someClass')).toBe('someClass')
  })

  test('with additional classes', () => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', 'class1', 'class2')).toBe(expected)
  })

  test('with additional class undefined', () => {
    const expected = 'someClass class1'
    expect(classNames('someClass', 'class1', undefined)).toBe(
      expected
    )
  })

  test('with mods', () => {
    const expected = 'someClass hovered scrollable class1 class2'
    expect(
      classNames(
        'someClass',
        { hovered: true, scrollable: true },
        'class1',
        'class2'
      )
    ).toBe(expected)
  })

  test('with mods false', () => {
    const expected = 'someClass hovered class1 class2'
    expect(
      classNames(
        'someClass',
        { hovered: true, scrollable: false },
        'class1',
        'class2'
      )
    ).toBe(expected)
  })

  test('with mod undefined', () => {
    const expected = 'someClass hovered class1 class2'
    expect(
      classNames(
        'someClass',
        { hovered: true, scrollable: undefined },
        'class1',
        'class2'
      )
    ).toBe(expected)
  })
})
