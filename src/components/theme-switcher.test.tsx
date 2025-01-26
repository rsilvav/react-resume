import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './theme-switcher'; // Asegúrate de que la ruta sea correcta

// Mock del objeto Theme
const Theme = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
};

describe('ThemeSwitcher Component', () => {
    let mockSetThemeFn: jest.Mock;

    beforeEach(() => {
        mockSetThemeFn = jest.fn(); // Crea un mock para la función setThemeFn
    });

    it('does not render if "enabled" is false', () => {
        render(
            <ThemeSwitcher
                enabled={false}
                currentTheme={Theme.LIGHT}
                setThemeFn={mockSetThemeFn}
            />
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders correctly if "enabled" is true', () => {
        render(
            <ThemeSwitcher
                enabled={true}
                currentTheme={Theme.LIGHT}
                setThemeFn={mockSetThemeFn}
            />
        );

        const button = screen.getByRole('button', { name: /dark mode/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Dark Mode');
    });

    it('displays "Dark Mode" when the current theme is LIGHT', () => {
        render(
            <ThemeSwitcher
                enabled={true}
                currentTheme={Theme.LIGHT}
                setThemeFn={mockSetThemeFn}
            />
        );

        expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
    });

    it('displays "Light Mode" when the current theme is DARK', () => {
        render(
            <ThemeSwitcher
                enabled={true}
                currentTheme={Theme.DARK}
                setThemeFn={mockSetThemeFn}
            />
        );

        expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
    });

    it('calls setThemeFn with the correct value when clicked', () => {
        render(
            <ThemeSwitcher
                enabled={true}
                currentTheme={Theme.LIGHT}
                setThemeFn={mockSetThemeFn}
            />
        );

        const button = screen.getByRole('button', { name: /dark mode/i });
        fireEvent.click(button);

        // Verifica que setThemeFn se haya llamado con el tema correcto
        expect(mockSetThemeFn).toHaveBeenCalledWith('dark');
    });

    it('handles "Enter" key to toggle theme', () => {
        render(
            <ThemeSwitcher
                enabled={true}
                currentTheme={Theme.DARK}
                setThemeFn={mockSetThemeFn}
            />
        );

        const button = screen.getByRole('button', { name: /light mode/i });
        fireEvent.keyDown(button, { key: 'Enter' });

        // Verifica que setThemeFn se haya llamado con el tema correcto
        expect(mockSetThemeFn).toHaveBeenCalledWith('light');
    });
});
