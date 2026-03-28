import React, { useState } from 'react';
import { User, Download, LogOut, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useHistory } from '../hooks/useHistory';
import GPAChart from '../components/GPAChart';
import HistoryTable from '../components/HistoryTable';
import { getAcademicStanding } from '../utils/conversionAlgorithm';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Profile = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { logout, deleteAccount, currentUser } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { history, clearHistory } = useHistory();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        showToast('You have been logged out.', 'info');
        navigate('/login');
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        const result = await deleteAccount();
        if (result.success) {
            showToast('Account deleted successfully.', 'info');
            navigate('/login');
        } else {
            showToast(result.message || 'Failed to delete account.', 'error');
            setIsDeleting(false);
            setConfirmDelete(false);
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
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', borderLeft: '4px solid var(--color-primary)' }}>
                        <div style={{ backgroundColor: 'var(--color-highlight)', padding: '16px', borderRadius: '50%', flexShrink: 0 }}>
                            <User size={48} color="var(--color-primary)" />
                        </div>
                        <div>
                            <h2 style={{ color: 'var(--color-primary)', margin: 0 }}>Current Status: {currentStanding}</h2>
                            <p style={{ margin: '4px 0 0 0', color: 'var(--color-subtext)' }}>Latest GPA: {latest.gpa.toFixed(2)} (CWA: {latest.cwa})</p>
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

            {/* Account Actions */}
            <div style={accountStyles.section}>
                {/* Logout Card */}
                <div className="card" style={accountStyles.card}>
                    <div style={accountStyles.cardContent}>
                        <div>
                            <h3 style={accountStyles.cardTitle}>Sign Out</h3>
                            <p style={accountStyles.cardDesc}>
                                Signed in as <strong>{currentUser?.email}</strong>. Logging out will end your current session.
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            style={accountStyles.logoutBtn}
                        >
                            <LogOut size={16} />
                            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                        </button>
                    </div>
                </div>

                {/* Delete Account Card */}
                <div className="card" style={accountStyles.card}>
                    <div style={accountStyles.cardContent}>
                        <div>
                            <h3 style={accountStyles.deleteTitle}>Delete Account</h3>
                            <p style={accountStyles.cardDesc}>
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                        </div>
                        {!confirmDelete ? (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                style={accountStyles.deleteBtn}
                            >
                                <Trash2 size={16} />
                                Delete Account
                            </button>
                        ) : (
                            <div style={accountStyles.confirmBox}>
                                <div style={accountStyles.confirmWarning}>
                                    <AlertTriangle size={16} color="#DC2626" />
                                    <span>Are you sure? This is permanent.</span>
                                </div>
                                <div style={accountStyles.confirmActions}>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        style={accountStyles.cancelBtn}
                                        disabled={isDeleting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        style={accountStyles.confirmDeleteBtn}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const accountStyles = {
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '32px',
    },
    card: {
        padding: '24px',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
    },
    cardTitle: {
        color: 'var(--color-primary)',
        margin: '0 0 6px 0',
        fontSize: '18px',
    },
    deleteTitle: {
        color: '#DC2626',
        margin: '0 0 6px 0',
        fontSize: '18px',
    },
    cardDesc: {
        color: 'var(--color-subtext)',
        fontSize: '14px',
        margin: 0,
        maxWidth: '480px',
        lineHeight: 1.5,
    },
    logoutBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#1B5E20',
        color: 'white',
        fontWeight: 600,
        fontSize: '14px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        whiteSpace: 'nowrap',
        transition: 'background-color 0.2s ease',
    },
    deleteBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '10px',
        border: '2px solid #DC2626',
        backgroundColor: 'transparent',
        color: '#DC2626',
        fontWeight: 600,
        fontSize: '14px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
    },
    confirmBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end',
    },
    confirmWarning: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        color: '#DC2626',
        fontWeight: 600,
    },
    confirmActions: {
        display: 'flex',
        gap: '8px',
    },
    cancelBtn: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        backgroundColor: 'transparent',
        color: 'var(--color-subtext)',
        fontWeight: 600,
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
    },
    confirmDeleteBtn: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#DC2626',
        color: 'white',
        fontWeight: 600,
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
    },
};

export default Profile;
