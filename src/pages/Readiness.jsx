import React, { useState, useEffect } from 'react';
import ReadinessScore from '../components/ReadinessScore';

// Dataset based exactly on rubric images
const universities = [
    { id: 'mit', name: 'MIT (USA)', location: 'Cambridge, MA', min: 3.5, competitive: 3.7 },
    { id: 'stanford', name: 'Stanford University (USA)', location: 'Stanford, CA', min: 3.5, competitive: 3.7 },
    { id: 'berkeley', name: 'UC Berkeley (USA)', location: 'Berkeley, CA', min: 3.0, competitive: 3.5 },
    { id: 'oxford', name: 'University of Oxford (UK)', location: 'Oxford, UK', min: 3.1, competitive: 3.6 },
    { id: 'imperial', name: 'Imperial College London (UK)', location: 'London, UK', min: 3.3, competitive: 3.7 },
    { id: 'toronto', name: 'University of Toronto (Canada)', location: 'Toronto, ON', min: 3.0, competitive: 3.3 },
    { id: 'ubc', name: 'University of British Columbia (Canada)', location: 'Vancouver, BC', min: 3.0, competitive: 3.3 },
    { id: 'tum', name: 'Technical University of Munich (Germany)', location: 'Munich, Germany', min: 3.0, competitive: 3.3 },
    { id: 'uct', name: 'University of Cape Town (South Africa)', location: 'Cape Town, SA', min: 2.7, competitive: 3.0 }
];

const Readiness = () => {
    const [userGpa, setUserGpa] = useState('');
    const [selectedUniId, setSelectedUniId] = useState('');

    useEffect(() => {
        // Attempt to pull latest GPA
        const history = JSON.parse(localStorage.getItem('gradesync_history') || '[]');
        if (history.length > 0) {
            setUserGpa(history[0].gpa.toFixed(2));
        }
    }, []);

    const selectedUni = universities.find(u => u.id === selectedUniId);

    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">University Readiness Score</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    See how your GPA stacks up against the minimum and competitive requirements of top global universities.
                </p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label>Your Target GPA (4.0 Scale)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={userGpa}
                            onChange={(e) => setUserGpa(e.target.value)}
                            placeholder="e.g. 3.4"
                        />
                    </div>
                    <div>
                        <label>Target University</label>
                        <select value={selectedUniId} onChange={(e) => setSelectedUniId(e.target.value)}>
                            <option value="">-- Select a University --</option>
                            {universities.map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedUni && userGpa && (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <ReadinessScore gpa={parseFloat(userGpa)} university={selectedUni} />
                </div>
            )}

            <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--color-highlight)', marginBottom: '16px' }}>What Admissions Actually Care About</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><strong>Statement of Purpose (SOP):</strong> Your written explanation of why you want to study the program.</li>
                    <li><strong>Letters of Recommendation (LORs):</strong> From lecturers or employers who know your work.</li>
                    <li><strong>Relevant Work Experience:</strong> Internships in your field matter significantly.</li>
                    <li><strong>Standardized Tests:</strong> GRE/GMAT and English proficiency (IELTS/TOEFL) may be required.</li>
                </ul>
            </div>
        </div>
    );
};

export default Readiness;
