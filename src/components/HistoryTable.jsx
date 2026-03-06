import React from 'react';
import { Trash } from 'lucide-react';

const HistoryTable = ({ history, onClear }) => {
    if (!history || history.length === 0) {
        return null; // Don't show table if empty
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Saved Conversions</h3>
                <button className="btn-secondary" onClick={onClear} style={{ padding: '6px 12px', fontSize: '13px' }}>
                    <Trash size={14} /> Clear History
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>CWA</th>
                            <th style={styles.th}>Credits</th>
                            <th style={styles.th}>Converted GPA</th>
                            <th style={styles.th}>Scale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(item => (
                            <tr key={item.id} style={styles.tr}>
                                <td style={styles.td}>{item.date}</td>
                                <td style={styles.td}>{item.cwa.toFixed(2)}</td>
                                <td style={styles.td}>{item.credits || '-'}</td>
                                <td style={styles.td}><strong style={{ color: 'var(--color-accent)' }}>{item.gpa.toFixed(2)}</strong></td>
                                <td style={styles.td}>{item.system}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
    },
    th: {
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-subtext)',
        padding: '12px',
        borderBottom: '2px solid var(--color-highlight)',
        fontWeight: 600,
        fontSize: '14px'
    },
    tr: {
        borderBottom: '1px solid #E5E7EB'
    },
    td: {
        padding: '12px',
        fontSize: '14px',
        color: 'var(--color-text)'
    }
};

export default HistoryTable;
