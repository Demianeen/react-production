import { useContext } from 'react'
import { LexicalContext } from '../ui/LexicalContext'
import type { LexicalContextPayload } from '../ui/LexicalContext'

export const useLexicalLibs = () => {
  return useContext(LexicalContext) as Required<LexicalContextPayload>
}
