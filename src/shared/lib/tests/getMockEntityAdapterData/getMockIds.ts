export const getMockIds = <T extends { id: number }>(array: T[]) => {
  return array.map((item) => item.id)
}
