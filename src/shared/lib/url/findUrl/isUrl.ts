import { URL_MATCHER } from './findUrl'

export const isUrl = (string: string) => URL_MATCHER.test(string)
