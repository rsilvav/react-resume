import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header'; // Asegúrate de que esta ruta sea correcta

describe('Header Component', () => {
    const mockResumeInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        links: [
            { name: 'GitHub', url: 'https://github.com/johndoe' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
            { name: 'Download', url: '#' }, // Enlace de descarga
        ],
    };

    it('renders the name', () => {
        render(<Header resumeInfo={mockResumeInfo} />);
        const nameElement = screen.getByRole('heading', { name: /john doe/i });
        expect(nameElement).toBeInTheDocument();
    });

    it('renders the email as a mailto link', () => {
        render(<Header resumeInfo={mockResumeInfo} />);
        const emailLink = screen.getByRole('link', { name: /john.doe@example.com/i });
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
    });

    it('renders the correct links', () => {
        render(<Header resumeInfo={mockResumeInfo} />);

        // Verifica que los enlaces de GitHub y LinkedIn están presentes
        const githubLink = screen.getByRole('link', { name: /github/i });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');

        const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
        expect(linkedInLink).toBeInTheDocument();
        expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    });

    it('handles the download link click correctly', () => {
        render(<Header resumeInfo={mockResumeInfo} />);

        const downloadLink = screen.getByRole('link', { name: /download/i });
        expect(downloadLink).toBeInTheDocument();
        expect(downloadLink).toHaveAttribute('href', '#');

        // Mock `window.print`
        const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});

        // Simula el clic en el enlace de descarga
        fireEvent.click(downloadLink);

        expect(printSpy).toHaveBeenCalledTimes(1);

        // Limpia el mock
        printSpy.mockRestore();
    });
});
