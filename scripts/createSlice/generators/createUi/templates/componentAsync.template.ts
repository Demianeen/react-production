export const componentAsyncTemplate = (componentName: string) => {
  return `import { lazy } from 'react'

export const ${componentName}Async = lazy(
  () => import('./${componentName}')
)
`
}
