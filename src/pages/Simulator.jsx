import React from 'react';
import SimulatorTable from '../components/SimulatorTable';

const Simulator = () => {
    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">Course Grade Simulator</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    'What-If' Mode: Experiment with different target grades for your current or upcoming courses to see exactly how they impact your overall CWA.
                </p>
            </div>

            <SimulatorTable />
        </div>
    );
};

export default Simulator;
