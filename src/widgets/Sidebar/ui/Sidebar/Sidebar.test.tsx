import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/libs/tests/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('test Sidebar to be correctly rendered', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test Sidebar to be correctly collapsed', () => {
        componentRender(<Sidebar />);
        const button = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
