import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const PlannerForm = () => {
    const [currentCwa, setCurrentCwa] = useState('');
    const [completedSemesters, setCompletedSemesters] = useState('');
    const [totalSemesters, setTotalSemesters] = useState('8');
    const [targetCwa, setTargetCwa] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const calculateRequired = (e) => {
        e.preventDefault();
        setError(null);

        const curr = parseFloat(currentCwa);
        const comp = parseInt(completedSemesters);
        const total = parseInt(totalSemesters);
        const target = parseFloat(targetCwa);

        if (isNaN(curr) || isNaN(comp) || isNaN(total) || isNaN(target)) return;
        if (comp >= total) {
            setResult(null);
            setError({
                title: 'No Remaining Semesters',
                message: `You've completed ${comp} out of ${total} semesters. There are no remaining semesters to plan for. Please select a longer program duration or reduce semesters completed.`,
                currentCwa: curr,
                targetCwa: target,
            });
            return;
        }

        // Mathematical breakdown of CWA
        // Total accumulated score = currentCwa * completedSemesters
        // Total target score = targetCwa * totalSemesters
        // Required score from remaining = Total target - Total accumulated
        // Required average per remaining semester = Required score / remaining semesters

        const remainingSemesters = total - comp;
        const accumulatedScore = curr * comp;
        const totalTargetScore = target * total;

        const requiredScore = totalTargetScore - accumulatedScore;
        const requiredAveragePerSem = requiredScore / remainingSemesters;

        setResult({
            currentCwa: curr,
            targetCwa: target,
            requiredCwa: requiredAveragePerSem,
            remainingSemesters: remainingSemesters
        });
    };

    const getStatusInfo = () => {
        if (!result) return null;
        const req = result.requiredCwa;
        if (req > 100) {
            return {
                label: 'Not Achievable',
                color: 'var(--color-danger)',
                bgColor: 'rgba(220, 38, 38, 0.08)',
                borderColor: 'var(--color-danger)',
                icon: '⚠️',
                message: `You would need ${req.toFixed(2)}% per semester, which exceeds the maximum of 100%. Consider adjusting your target.`
            };
        } else if (req > 85) {
            return {
                label: 'Very Challenging',
                color: 'var(--color-warning)',
                bgColor: 'rgba(245, 158, 11, 0.08)',
                borderColor: 'var(--color-warning)',
                icon: '🔥',
                message: `You need an excellent average of ${req.toFixed(2)}% every remaining semester. This is ambitious but possible with strong dedication.`
            };
        } else if (req > result.currentCwa) {
            return {
                label: 'Achievable',
                color: 'var(--color-accent)',
                bgColor: 'rgba(46, 125, 50, 0.08)',
                borderColor: 'var(--color-accent)',
                icon: '✅',
                message: `You need an average of ${req.toFixed(2)}% per remaining semester. This is within reach — keep pushing!`
            };
        } else {
            return {
                label: 'On Track',
                color: 'var(--color-primary)',
                bgColor: 'rgba(27, 94, 32, 0.08)',
                borderColor: 'var(--color-primary)',
                icon: '🎯',
                message: `Great news! Maintaining your current performance will get you to your target.`
            };
        }
    };

    const status = getStatusInfo();

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card">
                <h2 className="section-heading">Plan Your Academic Comeback</h2>

                <form onSubmit={calculateRequired} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label>Current CWA (0-100)</label>
                            <input
                                type="number" step="0.01" min="0" max="100" required
                                value={currentCwa} onChange={(e) => setCurrentCwa(e.target.value)}
                                placeholder="e.g. 62.5"
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Target CWA (0-100)</label>
                            <input
                                type="number" step="0.01" min="0" max="100" required
                                value={targetCwa} onChange={(e) => setTargetCwa(e.target.value)}
                                placeholder="e.g. 70.0"
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label>Semesters Completed</label>
                            <input
                                type="number" min="1" max="11" required
                                value={completedSemesters} onChange={(e) => setCompletedSemesters(e.target.value)}
                                placeholder="e.g. 3"
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Total Program Semesters</label>
                            <select value={totalSemesters} onChange={(e) => setTotalSemesters(e.target.value)}>
                                <option value="4">2 Years (4 Semesters)</option>
                                <option value="6">3 Years (6 Semesters)</option>
                                <option value="8">4 Years (8 Semesters - Standard)</option>
                                <option value="10">5 Years (10 Semesters - Architecture/Pharm)</option>
                                <option value="12">6 Years (12 Semesters - Med)</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                        Calculate Required Average
                    </button>
                </form>
            </div>

            {error && (
                <div style={styles.resultSection}>
                    <div style={styles.resultHeader}>
                        <h2 className="section-heading" style={{ marginBottom: '4px', color: 'var(--color-danger)' }}>
                            ⚠️ {error.title}
                        </h2>
                    </div>
                    <div style={{
                        ...styles.statsRow,
                        justifyContent: 'center',
                    }}>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Current CWA</span>
                            <span style={{ ...styles.statValue, color: 'var(--color-subtext)' }}>
                                {error.currentCwa.toFixed(2)}%
                            </span>
                        </div>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Target CWA</span>
                            <span style={{ ...styles.statValue, color: 'var(--color-primary)' }}>
                                {error.targetCwa.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div style={{
                        ...styles.feedbackBox,
                        borderLeftColor: 'var(--color-danger)',
                        backgroundColor: 'rgba(220, 38, 38, 0.08)',
                    }}>
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--color-text)', lineHeight: 1.6 }}>
                            <strong>Notice: </strong>{error.message}
                        </p>
                    </div>
                </div>
            )}

            {result && status && (
                <div style={styles.resultSection}>
                    {/* Headline result */}
                    <div style={styles.resultHeader}>
                        <h2 className="section-heading" style={{ marginBottom: '4px' }}>Your Result</h2>
                        <p style={{ color: 'var(--color-subtext)', fontSize: '14px', margin: 0 }}>
                            Based on {result.remainingSemesters} remaining semester{result.remainingSemesters !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Three stat cards */}
                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Current CWA</span>
                            <span style={{ ...styles.statValue, color: 'var(--color-subtext)' }}>
                                {result.currentCwa.toFixed(2)}%
                            </span>
                        </div>
                        <div style={{
                            ...styles.statCard,
                            ...styles.statCardHighlight,
                            borderColor: status.borderColor,
                        }}>
                            <span style={styles.statLabel}>Required CWA / Semester</span>
                            <span style={{ ...styles.statValue, color: status.color, fontSize: '32px' }}>
                                {result.requiredCwa > 100 ? '100+' : result.requiredCwa.toFixed(2)}%
                            </span>
                            <span style={{
                                ...styles.statusBadge,
                                backgroundColor: status.bgColor,
                                color: status.color,
                            }}>
                                {status.icon} {status.label}
                            </span>
                        </div>
                        <div style={styles.statCard}>
                            <span style={styles.statLabel}>Target CWA</span>
                            <span style={{ ...styles.statValue, color: 'var(--color-primary)' }}>
                                {result.targetCwa.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    {/* Feedback message */}
                    <div style={{
                        ...styles.feedbackBox,
                        borderLeftColor: status.borderColor,
                        backgroundColor: status.bgColor,
                    }}>
                        <p style={{ margin: 0, fontSize: '15px', color: 'var(--color-text)', lineHeight: 1.6 }}>
                            <strong>Analysis: </strong>{status.message}
                        </p>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar
                        currentCwa={result.currentCwa}
                        targetCwa={result.targetCwa}
                        requiredCwa={result.requiredCwa}
                    />
                </div>
            )}
        </div>
    );
};

const styles = {
    row: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
    },
    inputGroup: {
        flex: '1 1 250px'
    },
    resultSection: {
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    resultHeader: {
        textAlign: 'center',
    },
    statsRow: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    statCard: {
        flex: '1 1 170px',
        maxWidth: '220px',
        backgroundColor: 'var(--color-white)',
        borderRadius: '12px',
        padding: '20px 16px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    statCardHighlight: {
        border: '2px solid',
        boxShadow: 'var(--shadow-md)',
        padding: '24px 16px',
    },
    statLabel: {
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--color-subtext)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    statValue: {
        fontSize: '26px',
        fontWeight: 700,
    },
    statusBadge: {
        fontSize: '13px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '20px',
        marginTop: '4px',
    },
    feedbackBox: {
        borderLeft: '4px solid',
        padding: '16px 20px',
        borderRadius: '6px',
    },
};

export default PlannerForm;
