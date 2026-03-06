import React, { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';

// Hardcoded realistic dataset for KNUST students
const mockScholarships = [
    {
        id: 1,
        name: 'Mastercard Foundation Scholars Program',
        description: 'Fully-funded scholarships for academically talented but economically disadvantaged youth in Africa.',
        minGpa: 3.0,
        destination: 'Global',
        field: 'All Fields',
        url: 'https://mastercardfdn.org/all/scholars/'
    },
    {
        id: 2,
        name: 'Commonwealth Shared Scholarships',
        description: 'For candidates from developing Commonwealth countries, for full-time Master\'s study on selected courses.',
        minGpa: 3.5,
        destination: 'UK',
        field: 'STEM, Health, Humanities',
        url: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/'
    },
    {
        id: 3,
        name: 'Chevening Scholarships',
        description: 'The UK government\'s global scholarship programme, funded by the FCDO. Requires 2 years work experience.',
        minGpa: 3.0,
        destination: 'UK',
        field: 'All Fields',
        url: 'https://www.chevening.org/scholarships/'
    },
    {
        id: 4,
        name: 'DAAD Scholarships',
        description: 'Offers foreign graduates from development and newly industrialised countries from all disciplines.',
        minGpa: 3.3,
        destination: 'Germany',
        field: 'Development-Related',
        url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/'
    },
    {
        id: 5,
        name: 'Fulbright Foreign Student Program',
        description: 'Enables graduate students, young professionals and artists from abroad to study and conduct research in the US.',
        minGpa: 3.6,
        destination: 'USA',
        field: 'All Fields',
        url: 'https://foreign.fulbrightonline.org/'
    },
    {
        id: 6,
        name: 'Erasmus Mundus Joint Masters',
        description: 'Prestigious, integrated, international study programmes, jointly delivered by an international consortium of higher education institutions.',
        minGpa: 3.5,
        destination: 'Europe',
        field: 'All Fields',
        url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en'
    },
    {
        id: 7,
        name: 'MTN Bright Scholarship',
        description: 'Supports brilliant but needy Ghanaian students at public tertiary institutions. Covers tuition, accommodation, a research device, and reading materials. Priority given to ICT, Engineering, AI & Data Analytics.',
        minGpa: 3.0,
        destination: 'Ghana',
        field: 'ICT, Engineering, AI',
        url: 'https://scholarship.mtn.com.gh'
    }
];

const ScholarshipChecker = () => {
    const [userGpa, setUserGpa] = useState(null);

    useEffect(() => {
        // Attempt to pull latest GPA from local storage profile
        const history = JSON.parse(localStorage.getItem('gradesync_history') || '[]');
        if (history.length > 0) {
            setUserGpa(history[0].gpa);
        }
    }, []);

    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">Scholarship Eligibility Checker</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    {userGpa
                        ? `Based on your latest recorded GPA of ${userGpa.toFixed(2)}, here are the opportunities you should target.`
                        : "Explore global scholarships suited for KNUST graduates. Convert your CWA first to see your personalized eligibility."
                    }
                </p>
            </div>

            <div className="grid-container">
                {mockScholarships.map(scholarship => (
                    <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        userGpa={userGpa}
                    />
                ))}
            </div>

            {userGpa && (
                <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--color-background)', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: 0, color: 'var(--color-subtext)' }}>
                        <strong>Note:</strong> While some scholarships list a minimum GPA, competitive applications require strong Statements of Purpose (SOP) and Letters of Recommendation.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ScholarshipChecker;
