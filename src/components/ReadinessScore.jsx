import React from 'react';
import { Target } from 'lucide-react';

const ReadinessScore = ({ gpa, university }) => {
    if (!university || !gpa) return null;

    // Calculate score out of 100 based on comparison to Min vs Competitive GPA
    let score = 0;
    if (gpa < university.min) {
        score = (gpa / university.min) * 50; // Below minimum, max 50
    } else if (gpa >= university.competitive) {
        score = 90 + ((gpa - university.competitive) / (4.0 - university.competitive)) * 10;
    } else {
        // Between min and competitive
        score = 50 + ((gpa - university.min) / (university.competitive - university.min)) * 40;
    }

    // Cap at 100
    score = Math.min(100, score);

    // Choose color based on score
    let color = 'var(--color-primary)';
    let advice = '';

    if (score >= 90) {
        color = 'var(--color-accent)';
        advice = 'Your GPA is highly competitive! Focus aggressively on your Statement of Purpose and securing strong recommendations.';
    } else if (score >= 50) {
        color = 'var(--color-warning)';
        advice = 'You meet the minimum requirements, but there is strong competition. Offset your GPA with exceptional research or work experience.';
    } else {
        color = 'var(--color-danger)';
        advice = 'Your GPA is currently below the historical minimums for this university. You may need conditional pathways, outstanding GRE scores, or to targeting more flexible schools.';
    }

    // Generate the circular stroke visualization
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>University Readiness Score</h3>

            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 24px' }}>
                <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="75" cy="75" r={radius}
                        fill="none" stroke="#E5E7EB" strokeWidth="12"
                    />
                    <circle
                        cx="75" cy="75" r={radius}
                        fill="none" stroke={color} strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                    />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: color, lineHeight: 1 }}>{Math.round(score)}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-subtext)' }}>out of 100</span>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-background)', padding: '16px', borderRadius: '8px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <Target size={18} color="var(--color-primary)" />
                    <strong>{university.name} Requirements:</strong>
                </div>
                <p style={{ fontSize: '14px', margin: '4px 0' }}>Minimum: <strong>{university.min.toFixed(2)}</strong></p>
                <p style={{ fontSize: '14px', margin: '4px 0' }}>Competitive: <strong>{university.competitive.toFixed(2)}</strong></p>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '12px 0' }} />
                <p style={{ fontSize: '14px', color: 'var(--color-text)', margin: 0 }}>
                    {advice}
                </p>
            </div>
        </div>
    );
};

export default ReadinessScore;
