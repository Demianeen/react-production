import path from 'path'

export const resolveRoot = (...relativePath: string[]) =>
  path.resolve(
    __dirname,
    '..', // utils
    ...relativePath
  )
