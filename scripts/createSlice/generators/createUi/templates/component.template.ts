import { capitalize } from 'utils/capitalize'
import type { Layer } from '../../../types/createSlice'

export const componentTemplate = (
  layer: Layer,
  sliceName: string,
  isDefaultExport: boolean
) => {
  const capitalizedSliceName = capitalize(sliceName)

  const componentDeclaration = `${
    !isDefaultExport ? 'export ' : ''
  }const`

  return `import { classNamesNew } from "@/shared/lib/classNames/classNamesNew"
import styles from "./${capitalizedSliceName}.module.scss"

interface ${capitalizedSliceName}Props {
  className?: string;
}

${componentDeclaration} ${capitalizedSliceName} = memo(({ className }: ${capitalizedSliceName}Props) => {
  return (
    <div className={classNamesNew(styles.${sliceName}, className)}>
       
    </div>
  )
})

${capitalizedSliceName}.displayName = "${capitalizedSliceName}"

${isDefaultExport ? `export default ${capitalizedSliceName}` : ''}
`
}
