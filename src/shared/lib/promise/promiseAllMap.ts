export const promiseAllMap = async <
  T,
  M extends Record<string, T | PromiseLike<T>>,
>(
  map: M,
): Promise<{ [P in keyof M]: Awaited<M[P]> }> => {
  const resolvedArray = await Promise.all(Object.values(map))
  const resolvedMap: any = {}

  Object.keys(map).forEach((key, index) => {
    resolvedMap[key] = resolvedArray[index]
  })

  return resolvedMap
}
