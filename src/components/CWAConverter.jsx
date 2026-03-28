import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import GradeSelector from './GradeSelector';
import ResultDisplay from './ResultDisplay';
import { convertCWAToGPA, getAcademicStanding } from '../utils/conversionAlgorithm';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';

const CWAConverter = () => {
    const [cwa, setCwa] = useState('');
    const [credits, setCredits] = useState('');
    const [system, setSystem] = useState('4.0');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [standing, setStanding] = useState(null);
    const { addEntry } = useHistory();

    const navigate = useNavigate();

    // Real-time validation and calculation
    useEffect(() => {
        if (!cwa) {
            setResult(null);
            setError('');
            return;
        }

        const numCwa = parseFloat(cwa);
        if (isNaN(numCwa) || numCwa < 0 || numCwa > 100) {
            setError('CWA must be a valid number between 0 and 100.');
            setResult(null);
            return;
        }

        setError('');

        // Calculate result
        const conversion = convertCWAToGPA(numCwa);
        if (conversion) {
            setResult(conversion);
            setStanding(getAcademicStanding(conversion.gpa));
        }
    }, [cwa, system]);

    const handleSave = async () => {
        if (result && cwa) {
            await addEntry({
                cwa: parseFloat(cwa),
                credits: parseInt(credits) || 0,
                gpa: result.gpa,
                system: system,
                source: 'converter',
            });
            navigate('/scholarships');
        }
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-heading">CWA Input Module</h2>

            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="cwa-input">Current CWA (0 - 100)</label>
                <div style={{ position: 'relative' }}>
                    <input
                        id="cwa-input"
                        type="number"
                        step="0.01"
                        value={cwa}
                        onChange={(e) => setCwa(e.target.value)}
                        placeholder="e.g. 72.50"
                        aria-label="Cumulative Weighted Average"
                        style={{ borderColor: error ? 'var(--color-danger)' : (result ? 'var(--color-highlight)' : '') }}
                    />
                    <div style={{ position: 'absolute', right: '12px', top: '14px' }}>
                        {error && <XCircle color="var(--color-danger)" size={20} />}
                        {!error && result && <CheckCircle color="var(--color-accent)" size={20} />}
                    </div>
                </div>
                {error && <p style={{ color: 'var(--color-danger)', fontSize: '13px', marginTop: '4px' }}>{error}</p>}
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label htmlFor="credits-input">Total Credit Hours (Optional)</label>
                <input
                    id="credits-input"
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    placeholder="e.g. 120"
                    aria-label="Total Credit Hours"
                />
            </div>

            <GradeSelector system={system} setSystem={setSystem} />

            {result && (
                <ResultDisplay result={result} standing={standing} onSave={handleSave} />
            )}
        </div>
    );
};

export default CWAConverter;
