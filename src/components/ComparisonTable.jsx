import React, { useState } from 'react';
import { convertCWAToGPA } from '../utils/conversionAlgorithm';

const ComparisonTable = () => {
    const [testCWA, setTestCWA] = useState(72);

    // Calculate equivalent grades
    const knustGPA = convertCWAToGPA(testCWA)?.gpa || 0;

    // Rough UK Equivalent: 70+ is First-Class. 60-69 is 2:1.
    let ukEq = "Fail";
    if (testCWA >= 70) ukEq = "First Class (1st)";
    else if (testCWA >= 60) ukEq = "Upper Second (2:1)";
    else if (testCWA >= 50) ukEq = "Lower Second (2:2)";

    // Rough German Equivalent (1.0 is best, 4.0 is minimum pass, 5.0 is fail)
    // Simplified formula
    let germanEq = testCWA >= 50 ? (1 + 3 * ((100 - testCWA) / 50)).toFixed(1) : "5.0";

    return (
        <div className="card">
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Live Grading System Comparison Tool</h3>

            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <label><strong>Test a CWA Value:</strong></label>
                <input
                    type="number"
                    value={testCWA}
                    onChange={(e) => setTestCWA(Number(e.target.value))}
                    style={{ width: '100px' }}
                />
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={styles.th}>System / Country</th>
                            <th style={styles.th}>Equivalent Output</th>
                            <th style={styles.th}>Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>KNUST (Ghana)</td>
                            <td style={styles.td}><strong>{testCWA}%</strong></td>
                            <td style={styles.td}>Raw Cumulative Weighted Average</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>USA (4.0 Scale)</td>
                            <td style={styles.td}><strong>{knustGPA.toFixed(2)}</strong></td>
                            <td style={styles.td}>Based on official KNUST transcripts</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>United Kingdom</td>
                            <td style={styles.td}><strong>{ukEq}</strong></td>
                            <td style={styles.td}>British Honours Degree Classification</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Germany (1.0 - 5.0)</td>
                            <td style={styles.td}><strong>{germanEq}</strong></td>
                            <td style={styles.td}>Bavarian formula (1.0 is excellent)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    th: {
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-subtext)',
        padding: '12px',
        borderBottom: '2px solid var(--color-highlight)',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #E5E7EB',
        color: 'var(--color-text)'
    }
};

export default ComparisonTable;
