import React from 'react';
import CWAConverter from '../components/CWAConverter';

const Converter = () => {
    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">Core Tool</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>CWA → GPA Converter</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    Real-time conversion from your KNUST CWA to an internationally recognised 4.0 GPA scale. No submit button needed.
                </p>
            </div>

            <CWAConverter />
        </div>
    );
};

export default Converter;
