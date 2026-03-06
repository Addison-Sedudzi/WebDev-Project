import React from 'react';

const ProgressBar = ({ currentCwa, targetCwa, requiredCwa }) => {
    // We cap visuals at 100% for the bar
    const currentPercent = Math.min(100, Math.max(0, currentCwa));
    const targetPercent = Math.min(100, Math.max(0, targetCwa));

    return (
        <div style={styles.container}>
            <div style={styles.barContainer}>
                {/* Current CWA Bar */}
                <div
                    style={{
                        ...styles.barFill,
                        width: `${currentPercent}%`,
                        backgroundColor: 'var(--color-highlight)'
                    }}
                    title={`Current CWA: ${currentCwa.toFixed(2)}`}
                >
                    {currentCwa > 10 && <span style={styles.barLabel}>{currentCwa.toFixed(1)}</span>}
                </div>

                {/* Target Marker */}
                <div
                    style={{
                        ...styles.targetMarker,
                        left: `${targetPercent}%`
                    }}
                    title={`Target CWA: ${targetCwa.toFixed(2)}`}
                >
                    <div style={styles.targetLabel}>Target</div>
                </div>
            </div>

            <div style={styles.legend}>
                <div style={styles.legendItem}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-highlight)', borderRadius: '2px' }}></div>
                    <span>Current CWA</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ width: '2px', height: '12px', backgroundColor: 'var(--color-danger)' }}></div>
                    <span>Target</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '24px',
        padding: '24px',
        backgroundColor: 'var(--color-white)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-sm)'
    },
    barContainer: {
        width: '100%',
        height: '32px',
        backgroundColor: '#E5E7EB', // light grey background
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
    },
    barFill: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '8px',
        transition: 'width 0.5s ease-in-out'
    },
    barLabel: {
        color: 'var(--color-primary)',
        fontWeight: 'bold',
        fontSize: '12px'
    },
    targetMarker: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '3px',
        backgroundColor: 'var(--color-danger)',
        zIndex: 10
    },
    targetLabel: {
        position: 'absolute',
        top: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '11px',
        color: 'var(--color-danger)',
        fontWeight: 'bold'
    },
    legend: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        fontSize: '13px',
        color: 'var(--color-subtext)'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    }
};

export default ProgressBar;
