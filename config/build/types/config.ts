export type BuildMode = 'development' | 'production'

export interface BuildPath {
  entry: string
  build: string
  html: string
  src: string
  locales: string
  buildLocales: string
}

export interface BuildEnv {
  mode?: BuildMode
  port?: number
  apiUrl?: string
  analyze?: boolean
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPath
  isDev: boolean
  isAnalyze: boolean
  port: number
  apiURL: string
  project: 'storybook' | 'frontend' | 'jest'
}
