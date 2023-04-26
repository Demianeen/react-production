export type BuildMode = 'development' | 'production';

export interface BuildPaths {
    entry: string
    build: string;
    html: string;
    src: string;
    locales:string;
    buildLocales: string;
}

export interface BuildEnv {
    port?: number,
    mode?: BuildMode,
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
