import React from 'react';
import LiteracySection from '../components/LiteracySection';
import ComparisonTable from '../components/ComparisonTable';

const LiteracyHub = () => {
    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">GPA Literacy Hub</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    Understand global academic standards, decode your transcripts, and learn what international universities are actually looking for.
                </p>
            </div>

            <div className="grid-layout-sidebar">
                <div>
                    <h2 className="section-heading">Educational Content</h2>
                    <LiteracySection
                        title="What is a GPA?"
                        content="A Grade Point Average (GPA) is a standard way of measuring academic achievement in the US and many other countries. While KNUST uses a percentage-based CWA (Cumulative Weighted Average), most graduate schools require you to present your scores on a 4.0 scale."
                        type="book"
                    />
                    <LiteracySection
                        title="Why does the conversion matter?"
                        content="A 72 CWA might sound average in Ghana, but it mathematically converts to a 3.0 GPA (the minimum requirement for many top universities like Columbia or Berkeley). If you underestimate your standing, you might miss out on scholarships."
                        type="info"
                    />

                    <h2 className="section-heading" style={{ marginTop: '40px' }}>Global Comparison Tool</h2>
                    <ComparisonTable />
                </div>

                <div>
                    <h2 className="section-heading">FAQs</h2>
                    <LiteracySection
                        title="Can I convert my CWA directly to a 5.0 scale?"
                        content="Yes, some universities use a 5.0 scale, but the 4.0 scale is the definitive international standard. Use 4.0 unless specifically instructed otherwise."
                        type="faq"
                    />
                    <LiteracySection
                        title="What is a 'holistic review'?"
                        content="Most graduate schools don't just look at GPA. They look at your Statement of Purpose (SOP), Letters of Recommendation (LORs), and work experience."
                        type="faq"
                    />

                    <div className="card" style={{ marginTop: '24px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                        <h3 style={{ color: 'var(--color-highlight)' }}>Did You Know?</h3>
                        <p style={{ fontSize: '14px', marginTop: '12px' }}>
                            A student with a 3.2 GPA but strong work experience, a compelling SOP, and excellent recommendations can often outcompete a student with a 3.8 GPA and a weak overall profile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiteracyHub;
