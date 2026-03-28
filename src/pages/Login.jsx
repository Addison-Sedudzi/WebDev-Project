import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        setIsSubmitting(true);
        const result = await login(email, password);
        if (result.success) {
            showToast('Welcome back! 🎉', 'success');
            navigate('/');
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
                {/* Header / Branding */}
                <div style={styles.header}>
                    <div style={styles.logoCircle}>
                        <BookOpen size={32} color="white" />
                    </div>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Sign in to your GradeSync account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        style={styles.errorBox}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@knust.edu.gh"
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                style={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={styles.optionsRow}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={styles.checkbox}
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" style={styles.forgotLink}>
                            Forgot password?
                        </Link>
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
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Footer */}
                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Don't have an account?{' '}
                        <Link to="/register" style={styles.link}>Create one here</Link>
                    </p>
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
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
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
    optionsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: 'var(--color-subtext)',
        cursor: 'pointer',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        accentColor: 'var(--color-primary)',
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
    },
    footer: {
        textAlign: 'center',
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid #E5E7EB',
    },
    footerText: {
        fontSize: '14px',
        color: 'var(--color-subtext)',
    },
    link: {
        color: 'var(--color-primary)',
        fontWeight: 600,
        textDecoration: 'none',
    },
    forgotLink: {
        fontSize: '14px',
        color: 'var(--color-primary)',
        fontWeight: 600,
        textDecoration: 'none',
    },
};

export default Login;
