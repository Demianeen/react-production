export type Mods = Record<string, boolean | undefined>

export const classNamesNew = (
  ...classes: (string | undefined | Mods)[]
) =>
  classes
    .map((item) => {
      if (item === undefined) {
        return ''
      }

      if (typeof item === 'string') {
        return item
      }
      return Object.entries(item)
        .filter(([_, value]) => Boolean(value))
        .map(([cls]) => cls)
        .join(' ')
    })
    .filter(Boolean)
    .join(' ')
