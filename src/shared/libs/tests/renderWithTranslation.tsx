import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export default function renderWithTranslation(component: ReactNode) {
    const comp = (
        <I18nextProvider i18n={i18nForTests}>
            {component}
        </I18nextProvider>
    );
    return render(comp);
}
