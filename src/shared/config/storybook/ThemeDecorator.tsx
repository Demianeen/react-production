import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from '../../contexts/theme-context';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    document.body.className = theme;
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
