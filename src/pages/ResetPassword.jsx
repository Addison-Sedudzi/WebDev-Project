import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, BookOpen, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [done, setDone] = useState(false);

    const { resetPassword, logout } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if Supabase already processed the recovery token before this component mounted
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) setIsReady(true);
        };
        checkSession();

        // Also catch it if the event fires after mount
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
                setIsReady(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const getPasswordStrength = () => {
        if (!password) return { label: '', color: '', width: '0%' };
        if (password.length < 4) return { label: 'Weak', color: '#DC2626', width: '25%' };
        if (password.length < 6) return { label: 'Fair', color: '#F59E0B', width: '50%' };
        if (password.length < 8) return { label: 'Good', color: '#2563EB', width: '75%' };
        return { label: 'Strong', color: '#059669', width: '100%' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!password) {
            setError('Please enter a new password.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        const result = await resetPassword(password);
        if (result.success) {
            setDone(true);
            showToast('Password updated successfully!', 'success');
            await logout();
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(result.message);
            showToast(result.message, 'error');
        }
        setIsSubmitting(false);
    };

    const strength = getPasswordStrength();

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
                    <h1 style={styles.title}>Set New Password</h1>
                    <p style={styles.subtitle}>Choose a strong password for your account</p>
                </div>

                {done ? (
                    <motion.div
                        style={styles.successBox}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <CheckCircle size={40} color="#059669" style={{ marginBottom: '12px' }} />
                        <h3 style={styles.successTitle}>Password Updated!</h3>
                        <p style={styles.successText}>Redirecting you to the sign in page...</p>
                    </motion.div>
                ) : !isReady ? (
                    <div style={styles.waitingBox}>
                        <p style={styles.waitingText}>
                            Verifying your reset link... If this takes too long, please request a new one from the{' '}
                            <a href="/forgot-password" style={styles.link}>forgot password</a> page.
                        </p>
                    </div>
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
                                <label style={styles.label}>New Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        style={styles.input}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.eyeButton}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {password && (
                                    <div style={styles.strengthBar}>
                                        <div style={{ ...styles.strengthFill, width: strength.width, backgroundColor: strength.color }} />
                                        <span style={{ ...styles.strengthLabel, color: strength.color }}>{strength.label}</span>
                                    </div>
                                )}
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm New Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter your password"
                                        style={styles.input}
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
                                    'Update Password'
                                )}
                            </motion.button>
                        </form>
                    </>
                )}
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
        padding: '14px 44px 14px 44px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        fontSize: '15px',
        fontFamily: "'Poppins', sans-serif",
        transition: 'border-color 0.25s ease',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        margin: 0,
    },
    eyeButton: {
        position: 'absolute',
        right: '14px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-subtext)',
        display: 'flex',
        padding: '4px',
    },
    strengthBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '4px',
    },
    strengthFill: {
        height: '4px',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        flex: 1,
        maxWidth: '120px',
    },
    strengthLabel: {
        fontSize: '12px',
        fontWeight: 600,
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
        color: 'var(--color-subtext)',
    },
    waitingBox: {
        padding: '16px',
        backgroundColor: '#FEF3C7',
        borderRadius: '10px',
        border: '1px solid #FDE68A',
        marginBottom: '20px',
    },
    waitingText: {
        fontSize: '14px',
        color: '#92400E',
        margin: 0,
        lineHeight: 1.6,
    },
    link: {
        color: 'var(--color-primary)',
        fontWeight: 600,
    },
};

export default ResetPassword;
