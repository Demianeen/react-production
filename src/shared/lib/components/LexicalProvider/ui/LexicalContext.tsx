import { createContext } from 'react'
import type { Lexical } from '../types/lexical'

export interface LexicalContextPayload {
  isLoaded: boolean
  readonly Lexical?: Lexical['Main']
  readonly LexicalCode?: Lexical['Code']
  readonly LexicalLink?: Lexical['Link']
  readonly LexicalList?: Lexical['List']
  readonly LexicalMarkdown?: Lexical['Markdown']
  readonly LexicalReact?: Lexical['React']
  readonly LexicalRichText?: Lexical['RichText']
  readonly LexicalSelection?: Lexical['Selection']
  readonly LexicalUtils?: Lexical['Utils']
}

export const LexicalContext = createContext<LexicalContextPayload>({
  isLoaded: false,
})
