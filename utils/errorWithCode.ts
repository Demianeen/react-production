export interface ErrorWithCode extends Error {
  code: string
}

export const isErrorWithCode = (
  error: Error
): error is ErrorWithCode => 'code' in error
