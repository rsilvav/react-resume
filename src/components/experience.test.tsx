import { render, screen } from '@testing-library/react';
import ExperienceSection from './experience'; // Asegúrate de que esta ruta sea correcta

describe('ExperienceSection', () => {
    const mockExperiences = [
        {
            company: 'Company A',
            jobTitle: 'Software Engineer',
            startDate: 'January 2020',
            endDate: 'December 2021',
            location: 'New York, USA',
            bullets: ['Developed features', 'Fixed bugs'],
        },
        {
            company: 'Company B',
            jobTitle: 'Backend Developer',
            startDate: 'February 2018',
            endDate: 'December 2019',
            location: 'San Francisco, USA',
            bullets: ['Designed APIs', 'Implemented database migrations'],
        },
    ];

    it('renders the heading "Experience"', () => {
        render(<ExperienceSection experiences={mockExperiences} />);
        const heading = screen.getByRole('heading', { name: /experience/i });
        expect(heading).toBeInTheDocument();
    });

    //it('renders the correct number of experiences', () => {
    //    render(<ExperienceSection experiences={mockExperiences} />);
    //    const experienceItems = screen.getAllByRole('listitem', { name: '' });
    //    expect(experienceItems).toHaveLength(2); // Aseguramos que haya 2 elementos en la lista principal
    //});

    it('renders details for each experience', () => {
        render(<ExperienceSection experiences={mockExperiences} />);

        // Comprobamos si los datos de Company A están en el DOM
        expect(screen.getByText('Company A')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('January 2020 — December 2021')).toBeInTheDocument();
        expect(screen.getByText('New York, USA')).toBeInTheDocument();
        expect(screen.getByText('Developed features')).toBeInTheDocument();
        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();

        // Comprobamos si los datos de Company B están en el DOM
        expect(screen.getByText('Company B')).toBeInTheDocument();
        expect(screen.getByText('Backend Developer')).toBeInTheDocument();
        expect(screen.getByText('February 2018 — December 2019')).toBeInTheDocument();
        expect(screen.getByText('San Francisco, USA')).toBeInTheDocument();
        expect(screen.getByText('Designed APIs')).toBeInTheDocument();
        expect(screen.getByText('Implemented database migrations')).toBeInTheDocument();
    });
});
