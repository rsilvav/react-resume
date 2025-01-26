import { render, screen } from '@testing-library/react';
import SkillsSection from './skills'; // Asegúrate de que esta ruta sea correcta

describe('SkillsSection Component', () => {
    const mockSkills = [
        {
            name: 'Programming Languages',
            items: ['JavaScript', 'Python', 'C++'],
        },
        {
            name: 'Frameworks',
            items: [
                {
                    name: 'Frontend',
                    items: ['React', 'Angular', 'Vue'],
                },
                {
                    name: 'Backend',
                    items: ['Node.js', 'Django', 'Flask'],
                },
            ],
        },
    ];

    it('renders the heading "Skills"', () => {
        render(<SkillsSection skills={mockSkills} />);
        const heading = screen.getByRole('heading', { name: /skills/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders top-level skill categories', () => {
        render(<SkillsSection skills={mockSkills} />);

        // Verifica que las categorías principales están presentes
        const programmingLanguages = screen.getByRole('heading', { name: /programming languages/i });
        expect(programmingLanguages).toBeInTheDocument();

        const frameworks = screen.getByRole('heading', { name: /frameworks/i });
        expect(frameworks).toBeInTheDocument();
    });

    it('renders subskills for categories without nesting', () => {
        render(<SkillsSection skills={mockSkills} />);

        // Verifica las habilidades dentro de "Programming Languages"
        expect(screen.getByText(/javascript, python, c\+\+/i)).toBeInTheDocument();
    });

    it('renders subskills with nesting correctly', () => {
        render(<SkillsSection skills={mockSkills} />);

        // Verifica habilidades dentro de "Frameworks"
        expect(screen.getByText(/frontend \(react, angular, vue\)/i)).toBeInTheDocument();
        expect(screen.getByText(/backend \(node\.js, django, flask\)/i)).toBeInTheDocument();
    });
});
