import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { Mail, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const { forgotPassword } = useAuth();
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        setIsSubmitting(true);
        const result = await forgotPassword(email);
        if (result.success) {
            setSent(true);
            showToast('Reset email sent!', 'success');
        } else {
            setError(result.message);
            showToast(result.message, 'error');
        }
        setIsSubmitting(false);
    };

    return (
        <div style={styles.wrapper}>
            <motion.div
                style={styles.container}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
                <div style={styles.header}>
                    <div style={styles.logoCircle}>
                        <BookOpen size={32} color="white" />
                    </div>
                    <h1 style={styles.title}>Reset Password</h1>
                    <p style={styles.subtitle}>Enter your email and we'll send you a reset link</p>
                </div>

                {sent ? (
                    <motion.div
                        style={styles.successBox}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <CheckCircle size={40} color="#059669" style={{ marginBottom: '12px' }} />
                        <h3 style={styles.successTitle}>Check your inbox!</h3>
                        <p style={styles.successText}>
                            We sent a password reset link to <strong>{email}</strong>.
                            Click the link in the email to set a new password.
                        </p>
                        <p style={styles.successHint}>Didn't get it? Check your spam folder.</p>
                    </motion.div>
                ) : (
                    <>
                        {error && (
                            <motion.div
                                style={styles.errorBox}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@knust.edu.gh"
                                        style={styles.input}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-primary"
                                style={styles.submitBtn}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <span style={styles.spinner} />
                                ) : (
                                    'Send Reset Link'
                                )}
                            </motion.button>
                        </form>
                    </>
                )}

                <div style={styles.footer}>
                    <Link to="/login" style={styles.backLink}>
                        <ArrowLeft size={16} />
                        Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)',
    },
    container: {
        backgroundColor: 'var(--color-white)',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    logoCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B5E20, #43A047)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        margin: 0,
    },
    subtitle: {
        color: 'var(--color-subtext)',
        fontSize: '15px',
        marginTop: '8px',
    },
    errorBox: {
        backgroundColor: '#FEE2E2',
        color: '#DC2626',
        padding: '12px 16px',
        borderRadius: '10px',
        fontSize: '14px',
        marginBottom: '20px',
        border: '1px solid #FECACA',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--color-text)',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '14px 14px 14px 44px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        fontSize: '15px',
        fontFamily: "'Poppins', sans-serif",
        transition: 'border-color 0.25s ease',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        margin: 0,
    },
    submitBtn: {
        width: '100%',
        padding: '16px',
        fontSize: '16px',
        borderRadius: '12px',
        justifyContent: 'center',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTop: '3px solid white',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        display: 'inline-block',
    },
    successBox: {
        textAlign: 'center',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    successTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        margin: '0 0 12px',
    },
    successText: {
        fontSize: '14px',
        color: 'var(--color-text)',
        lineHeight: 1.6,
        margin: 0,
    },
    successHint: {
        fontSize: '13px',
        color: 'var(--color-subtext)',
        marginTop: '12px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid #E5E7EB',
    },
    backLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--color-primary)',
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
    },
};

export default ForgotPassword;
