export const getMockIds = <T extends { id: number }>(array: T[]) =>
  array.map((item) => item.id)
