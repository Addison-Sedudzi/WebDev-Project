import React from 'react';
import { ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import Tilt3D from './Tilt3D';

const ScholarshipCard = ({ scholarship, userGpa }) => {
    const isEligible = userGpa >= scholarship.minGpa;
    const isNearMiss = !isEligible && (scholarship.minGpa - userGpa) <= 0.3;

    // If no GPA yet, just show generic card, else show status.
    const status = !userGpa ? 'neutral' : (isEligible ? 'eligible' : (isNearMiss ? 'near_miss' : 'ineligible'));

    if (userGpa && status === 'ineligible') return null; // Hide completely ineligible ones

    return (
        <Tilt3D intensity={5} scale={1.03}>
            <div className="card" style={{ ...styles.card, borderLeft: `4px solid ${styles.statusColors[status]}` }}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{scholarship.name}</h3>
                    {status === 'eligible' && <span style={styles.badge(styles.statusColors.eligible)}><CheckCircle size={14} /> Eligible</span>}
                    {status === 'near_miss' && <span style={styles.badge(styles.statusColors.near_miss)}><AlertTriangle size={14} /> Near Miss</span>}
                </div>

                <p style={styles.description}>{scholarship.description}</p>

                <div style={styles.detailsGrid}>
                    <div>
                        <span className="caption">Min GPA</span>
                        <div style={styles.detailValue}>{scholarship.minGpa.toFixed(1)}+</div>
                    </div>
                    <div>
                        <span className="caption">Destination</span>
                        <div style={styles.detailValue}>{scholarship.destination}</div>
                    </div>
                    <div>
                        <span className="caption">Field of Study</span>
                        <div style={styles.detailValue}>{scholarship.field}</div>
                    </div>
                </div>

                <button
                    className="btn-secondary"
                    style={styles.button}
                    onClick={() => window.open(scholarship.url, '_blank', 'noopener,noreferrer')}
                >
                    View Details <ExternalLink size={16} />
                </button>
            </div>
        </Tilt3D>
    );
};

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    statusColors: {
        neutral: 'var(--color-primary)',
        eligible: 'var(--color-accent)',
        near_miss: 'var(--color-warning)',
        ineligible: 'var(--color-danger)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
        gap: '12px'
    },
    title: {
        color: 'var(--color-primary)',
        fontSize: '20px',
        margin: 0
    },
    badge: (color) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: `${color}20`,
        color: color,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    }),
    description: {
        color: 'var(--color-subtext)',
        fontSize: '14px',
        marginBottom: '20px',
        flex: 1
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: 'var(--color-background)',
        borderRadius: '8px'
    },
    detailValue: {
        fontWeight: 600,
        color: 'var(--color-text)',
        fontSize: '14px'
    },
    button: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '10px'
    }
};

export default ScholarshipCard;
