import { isUrl } from '@/shared/lib/url/findUrl/isUrl'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'

export const LinkPlugin = (): JSX.Element => {
  return <LexicalLinkPlugin validateUrl={isUrl} />
}
