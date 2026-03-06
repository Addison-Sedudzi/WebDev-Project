import React from 'react';
import CWAConverter from '../components/CWAConverter';

const Converter = () => {
    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">CWA to GPA Converter</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    Accurately convert your KNUST Cumulative Weighted Average to an internationally recognised GPA scale. Real-time conversion, no 'submit' button required.
                </p>
            </div>

            <CWAConverter />
        </div>
    );
};

export default Converter;
