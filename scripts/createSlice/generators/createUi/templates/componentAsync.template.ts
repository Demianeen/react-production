export const componentAsyncTemplate = (
  componentName: string
) => `import { lazy } from 'react'

export const ${componentName}Async = lazy(
  () => import('./${componentName}')
)
`
