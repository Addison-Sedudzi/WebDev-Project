import React, { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import { useHistory } from '../hooks/useHistory';

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
    const { history } = useHistory();

    useEffect(() => {
        if (history.length > 0) {
            setUserGpa(history[0].gpa);
        }
    }, [history]);

    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">Funding</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>Scholarship Finder</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    {userGpa
                        ? `Showing opportunities matched to your GPA of ${userGpa.toFixed(2)}.`
                        : 'Convert your CWA first — we\'ll match you to scholarships you can actually win.'}
                </p>
                {userGpa && (
                    <div style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '10px', backgroundColor: 'rgba(165,214,167,0.2)', border: '1px solid #A5D6A7' }}>
                        <span style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600 }}>Your GPA: {userGpa.toFixed(2)}</span>
                    </div>
                )}
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
