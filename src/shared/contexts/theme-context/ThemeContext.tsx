import { createContext, Dispatch, SetStateAction } from 'react';

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}

/*
typeof SortOrder[typeof keyof SortOrder]

const Sort = {
    asc: 'asc',
    desc: 'desc'
} as const;

type SortOrder = typeof Sort[typeof keyof Sort]
*/

export interface ThemeContextProps {
    theme?: Theme;
    // setTheme?: (theme: Theme) => void
    setTheme?: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
