export const getMockArray = <T extends { id: number }>(
  entity: T,
  length: number,
  page = 1
) =>
  new Array(length).fill(null).map((_, index) => ({
    ...entity,
    id: (page - 1) * length + index,
  }))
