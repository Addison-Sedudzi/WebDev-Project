import React from 'react';
import PlannerForm from '../components/PlannerForm';

const ImprovementPlanner = () => {
    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">Planner</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>Improvement Planner</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    Find the exact average you need each semester to hit your graduation target. No guesswork.
                </p>
            </div>

            <PlannerForm />
        </div>
    );
};

export default ImprovementPlanner;
