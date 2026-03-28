import React from 'react';
import SimulatorTable from '../components/SimulatorTable';

const Simulator = () => {
    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">What-If</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>Grade Simulator</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    Enter your courses and target grades to instantly see how they affect your CWA — before results come out.
                </p>
            </div>

            <SimulatorTable />
        </div>
    );
};

export default Simulator;
