import { capitalize } from '../../../../../utils/capitalize'

export const componentTemplate = (sliceName: string) => {
  const capitalizedSliceName = capitalize(sliceName)

  return `import { classNames } from "shared/lib/classNames/classNames"
import styles from "./${capitalizedSliceName}.module.scss"

interface ${capitalizedSliceName}Props {
  className?: string;
}

export const ${capitalizedSliceName} = ({ className }: ${capitalizedSliceName}Props) => {
  return (
    <div className={classNames(styles.${sliceName}, {}, [className])}>
       
    </div>
  )
}
`
}
