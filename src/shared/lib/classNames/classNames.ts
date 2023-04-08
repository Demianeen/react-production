export type Mods = Record<string, boolean | undefined>

export function classNames(
  className: string,
  mods: Mods = {},
  additional: (string | undefined)[] = []
): string {
  return [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(' ')
}
