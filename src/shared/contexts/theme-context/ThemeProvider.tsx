import React, {
    FC, useEffect, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

// const isTheme = (value: any): value is Theme => typeof value === 'string' &&
// (Theme.DARK === value || Theme.LIGHT === value)

// const getDefaultTheme = (): Theme => {
//     const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
//     return isTheme(defaultTheme) ? defaultTheme : Theme.LIGHT;
// }

type ThemeType = Theme | null;
// another way of type checking with type guards⬆️
function getTheme(theme: ThemeType): Theme | null {
    if (!theme) return null;

    return (Object.values(theme)
        .some((item) => theme === item) ? (theme as Theme) : null);
}

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}

const defaultTheme: Theme = getTheme(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        document.body.className = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
