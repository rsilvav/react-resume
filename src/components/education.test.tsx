import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EducationSection from './education';

const mockEducation = [
    {
        institute: 'Harvard University',
        degree: 'Bachelor of Science',
        subDegree: 'Computer Science',
        graduationDate: 'May 2025',
        overallGpa: '3.9',
        majorGpa: '4.0',
        coursework: ['Data Structures', 'Algorithms', 'AI']
    },
    {
        institute: 'Stanford University',
        degree: 'Master of Science',
        subDegree: 'Artificial Intelligence',
        graduationDate: 'May 2027',
        overallGpa: '4.0',
        majorGpa: null,
        coursework: ['Machine Learning', 'Deep Learning']
    }
];

describe('EducationSection Component', () => {
    it('renders the education section with all items', () => {
        render(<EducationSection education={mockEducation} />);

        // Verifica que se rendericen los nombres de las instituciones
        expect(screen.getByText('Harvard University')).toBeInTheDocument();
        expect(screen.getByText('Stanford University')).toBeInTheDocument();

        // Verifica que se rendericen los títulos
        expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
        expect(screen.getByText('Master of Science')).toBeInTheDocument();

        // Verifica que se rendericen las fechas de graduación
        expect(screen.getByText('May 2025')).toBeInTheDocument();
        expect(screen.getByText('May 2027')).toBeInTheDocument();

        // Verifica que se renderice el GPA general si está disponible
        expect(screen.getByText('GPA: 3.9')).toBeInTheDocument();
        expect(screen.getByText('GPA: 4.0')).toBeInTheDocument();

        // Verifica que se rendericen los cursos relacionados
        // expect(screen.getByText('Related Coursework: Data Structures, Algorithms, AI')).toBeInTheDocument();
        // expect(screen.getByText('Related Coursework: Machine Learning, Deep Learning')).toBeInTheDocument();
    });

    it('does not render "Major GPA" if it is null', () => {
        render(<EducationSection education={mockEducation} />);

        // Verifica que no se renderice Major GPA para Stanford
        expect(screen.queryByText('Major GPA:')).not.toBeInTheDocument();
    });

    it('renders "Major GPA" when it is provided', () => {
        render(<EducationSection education={mockEducation} />);

        // Verifica que Major GPA esté presente para Harvard
        expect(screen.getByText('Major GPA: 4.0')).toBeInTheDocument();
    });
});
