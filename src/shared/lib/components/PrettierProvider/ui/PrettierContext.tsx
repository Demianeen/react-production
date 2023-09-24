import type { Options } from 'prettier'
import { createContext } from 'react'
import type {
  PrettierLanguage,
  PrettierStandalone,
} from '../types/prettier'

export interface PrettierContextPayload {
  isLoaded: boolean
  readonly Prettier?: PrettierStandalone
  getPrettierOptions?: (lang: PrettierLanguage) => Promise<Options>
}

export const PrettierContext = createContext<PrettierContextPayload>({
  isLoaded: false,
})
