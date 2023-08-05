export const getMockEntities = <T extends { id: number }>(
  array: T[]
): Record<number, T> => {
  const entities: Record<number, T> = {}
  array.forEach((item) => {
    entities[item.id] = item
  })
  return entities
}
