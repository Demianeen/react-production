// we can save multiple scroll positions for the same route, like articles/{number}
export type ScrollPosition = Record<string, number>

export interface PageSchema {
  scrollPosition: ScrollPosition
}
