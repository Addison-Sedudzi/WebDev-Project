import React from 'react';

const GradeSelector = ({ system, setSystem }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Target Grading System</label>
            <select
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                aria-label="Select Target Grading System"
            >
                <option value="4.0">International 4.0 Scale (Standard)</option>
                <option value="5.0">International 5.0 Scale</option>
                <option value="custom">Custom Scale</option>
            </select>
        </div>
    );
};

export default GradeSelector;
