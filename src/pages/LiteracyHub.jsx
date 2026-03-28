import React from 'react';
import ComparisonTable from '../components/ComparisonTable';
import GradeBot from '../components/GradeBot';

const LiteracyHub = () => {
    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">Learn</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>GPA Literacy Hub</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    Decode your transcript, understand global grading systems, and ask Gradey anything.
                </p>
            </div>

            <h2 className="section-heading">Ask Gradey</h2>
            <GradeBot />

            <h2 className="section-heading" style={{ marginTop: '40px' }}>Global Comparison Tool</h2>
            <ComparisonTable />
        </div>
    );
};

export default LiteracyHub;
