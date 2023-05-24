export const arrayIncludesArray = <T extends string>(
  array: T[],
  arrayToInclude: string[]
): arrayToInclude is T[] => {
  if (arrayToInclude.length === 0) {
    return true
  }

  return arrayToInclude.every((item) =>
    // @ts-expect-error string is not assignable to T
    array.includes(item)
  )
}
