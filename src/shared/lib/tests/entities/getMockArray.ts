export const getMockArray = <T extends { id: number }>(
  entity: T,
  length: number,
  startIndex = 0
) =>
  new Array(length).fill(null).map((_, index) => ({
    ...entity,
    id: index + startIndex,
  }))
