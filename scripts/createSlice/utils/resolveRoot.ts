import path from 'path'

export const resolveRoot = (...relativePath: string[]) => {
  return path.resolve(
    __dirname,
    '..', // scripts
    '..', // createSlice
    '..', // utils
    ...relativePath
  )
}
