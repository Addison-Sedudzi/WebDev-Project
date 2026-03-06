import React from 'react';
import { Download, Save } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResultDisplay = ({ result, standing, onSave }) => {
    const handleExportPDF = () => {
        const input = document.getElementById('conversion-result-card');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('KNUST_GPA_Conversion.pdf');
        });
    };

    if (!result || !standing) return null;

    return (
        <div id="conversion-result-card" className="card" style={styles.container}>
            <h3 style={styles.title}>Conversion Result</h3>

            <div style={styles.resultGrid}>
                <div style={styles.resultBox}>
                    <span className="caption">Target GPA (4.0)</span>
                    <div style={styles.mainValue}>{result.gpa.toFixed(2)}</div>
                </div>
                <div style={styles.resultBox}>
                    <span className="caption">US Letter Grade</span>
                    <div style={styles.gpaValue}>{result.letter}</div>
                </div>
            </div>

            <div style={styles.standingBox}>
                <span className="caption">International Academic Standing</span>
                <div style={styles.standingValue}>{standing.standing}</div>
                <span className="caption" style={{ marginTop: '4px', display: 'block' }}>KNUST Equivalent: {standing.knust}</span>
            </div>

            <div style={styles.actionButtons}>
                <button className="btn-secondary" onClick={onSave} style={{ flex: 1 }}>
                    <Save size={18} /> Save to Profile
                </button>
                <button className="btn-primary" onClick={handleExportPDF} style={{ flex: 1 }}>
                    <Download size={18} /> Export PDF
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'var(--color-background)',
        border: '2px solid var(--color-highlight)',
        marginTop: '24px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '24px',
        color: 'var(--color-primary)'
    },
    resultGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
    },
    resultBox: {
        backgroundColor: 'var(--color-white)',
        padding: '16px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
    },
    mainValue: {
        fontSize: '36px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        lineHeight: 1.2
    },
    gpaValue: {
        fontSize: '36px',
        fontWeight: 700,
        color: 'var(--color-accent)',
        lineHeight: 1.2
    },
    standingBox: {
        backgroundColor: 'var(--color-white)',
        padding: '16px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
    },
    standingValue: {
        fontSize: '20px',
        fontWeight: 600,
        color: 'var(--color-primary)',
        marginTop: '8px'
    },
    actionButtons: {
        display: 'flex',
        gap: '16px',
        '@media (maxWidth: 600px)': {
            flexDirection: 'column'
        }
    }
};

export default ResultDisplay;
