import React, { useState, useEffect } from 'react';
import { User, Download } from 'lucide-react';
import GPAChart from '../components/GPAChart';
import HistoryTable from '../components/HistoryTable';
import { getAcademicStanding } from '../utils/conversionAlgorithm';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Profile = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('gradesync_history') || '[]');
        setHistory(saved);
    }, []);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear your academic history?")) {
            localStorage.setItem('gradesync_history', '[]');
            setHistory([]);
        }
    };

    const exportReport = () => {
        const input = document.getElementById('profile-report-area');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('GradeSync_Academic_Report.pdf');
        });
    };

    const latest = history.length > 0 ? history[0] : null;
    const currentStanding = latest ? getAcademicStanding(latest.gpa)?.standing : 'Unknown';

    return (
        <div className="main-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Student Academic Profile</h1>
                <button onClick={exportReport} className="btn-primary" disabled={history.length === 0}>
                    <Download size={18} /> Download Report
                </button>
            </div>

            <div id="profile-report-area">
                {latest ? (
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '50%' }}>
                            <User size={48} color="var(--color-primary)" />
                        </div>
                        <div>
                            <h2 style={{ color: 'var(--color-highlight)', margin: 0 }}>Current Status: {currentStanding}</h2>
                            <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>Latest GPA: {latest.gpa.toFixed(2)} (CWA: {latest.cwa})</p>
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <p>No profile data yet. Head over to the Converter to calculate your GPA and save it.</p>
                    </div>
                )}

                <div className="grid-layout-sidebar">
                    <div>
                        <GPAChart history={history} />
                    </div>
                    <div>
                        {/* Sidebar info box */}
                        <div className="card" style={{ height: '100%' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>Profile Tips</h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-subtext)', marginTop: '12px' }}>
                                Your GPA trend is a visual representation of your academic journey.
                                <br /><br />
                                An upward trend in your final two years looks excellent to admission committees, even if your early years were weaker.
                            </p>
                        </div>
                    </div>
                </div>

                <HistoryTable history={history} onClear={clearHistory} />
            </div>
        </div>
    );
};

export default Profile;
