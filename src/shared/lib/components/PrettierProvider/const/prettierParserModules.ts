export const PRETTIER_PARSER_MODULES = {
  css: () => import('prettier/plugins/postcss'),
  html: () => import('prettier/plugins/html'),
  js: () => import('prettier/plugins/babel'),
  typescript: () => import('prettier/plugins/babel'),
  markdown: () => import('prettier/plugins/markdown'),
} as const
