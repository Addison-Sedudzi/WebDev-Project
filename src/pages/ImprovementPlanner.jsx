import React from 'react';
import PlannerForm from '../components/PlannerForm';

const ImprovementPlanner = () => {
    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">GPA Improvement Planner</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    Find out exactly what average you need per semester to hit your graduation targets. Don't leave your final class to chance.
                </p>
            </div>

            <PlannerForm />
        </div>
    );
};

export default ImprovementPlanner;
