import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Eye, EyeOff, BookOpen, User, Hash, GraduationCap } from 'lucide-react';

const programs = [
    'Computer Science',
    'Computer Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biomedical Engineering',
    'Mathematics',
    'Statistics',
    'Physics',
    'Chemistry',
    'Biological Sciences',
    'Architecture',
    'Planning',
    'Pharmacy',
    'Medicine',
    'Nursing',
    'Business Administration',
    'Accounting',
    'Economics',
    'Actuarial Science',
    'Other'
];

const levels = ['100', '200', '300', '400', '500', '600'];

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        studentId: '',
        email: '',
        program: '',
        level: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear field error on change
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const errs = {};

        if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
        if (!formData.studentId.trim()) errs.studentId = 'Student ID is required.';

        if (!formData.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errs.email = 'Please enter a valid email address.';
        }

        if (!formData.program) errs.program = 'Please select your program.';
        if (!formData.level) errs.level = 'Please select your level.';

        if (!formData.password) {
            errs.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            errs.password = 'Password must be at least 6 characters.';
        }

        if (formData.password !== formData.confirmPassword) {
            errs.confirmPassword = 'Passwords do not match.';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const getPasswordStrength = () => {
        const pwd = formData.password;
        if (!pwd) return { label: '', color: '', width: '0%' };
        if (pwd.length < 4) return { label: 'Weak', color: '#DC2626', width: '25%' };
        if (pwd.length < 6) return { label: 'Fair', color: '#F59E0B', width: '50%' };
        if (pwd.length < 8) return { label: 'Good', color: '#2563EB', width: '75%' };
        return { label: 'Strong', color: '#059669', width: '100%' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const result = await register(formData);
        if (result.success) {
            showToast('Account created successfully! 🎓', 'success');
            navigate('/');
        } else if (result.requiresConfirmation) {
            showToast('Check your email to confirm your account.', 'success');
            navigate('/login');
        } else {
            setErrors({ general: result.message });
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
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.logoCircle}>
                        <BookOpen size={32} color="white" />
                    </div>
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join GradeSync and take control of your academic future</p>
                </div>

                {/* General Error */}
                {errors.general && (
                    <motion.div
                        style={styles.errorBox}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        {errors.general}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Full Name */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <User size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                            <input
                                id="register-name"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                placeholder="Kwame Asante"
                                style={styles.input}
                            />
                        </div>
                        {errors.fullName && <span style={styles.fieldError}>{errors.fullName}</span>}
                    </div>

                    {/* Student ID & Email Row */}
                    <div style={styles.row}>
                        <div style={{ ...styles.inputGroup, flex: 1 }}>
                            <label style={styles.label}>Student ID</label>
                            <div style={styles.inputWrapper}>
                                <Hash size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                <input
                                    id="register-student-id"
                                    type="text"
                                    value={formData.studentId}
                                    onChange={(e) => updateField('studentId', e.target.value)}
                                    placeholder="e.g. 20812345"
                                    style={styles.input}
                                />
                            </div>
                            {errors.studentId && <span style={styles.fieldError}>{errors.studentId}</span>}
                        </div>
                        <div style={{ ...styles.inputGroup, flex: 1 }}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputWrapper}>
                                <Mail size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                <input
                                    id="register-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="you@knust.edu.gh"
                                    style={styles.input}
                                />
                            </div>
                            {errors.email && <span style={styles.fieldError}>{errors.email}</span>}
                        </div>
                    </div>

                    {/* Program & Level Row */}
                    <div style={styles.row}>
                        <div style={{ ...styles.inputGroup, flex: 2 }}>
                            <label style={styles.label}>Program</label>
                            <div style={styles.inputWrapper}>
                                <GraduationCap size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                                <select
                                    id="register-program"
                                    value={formData.program}
                                    onChange={(e) => updateField('program', e.target.value)}
                                    style={{ ...styles.input, appearance: 'none' }}
                                >
                                    <option value="">Select Program</option>
                                    {programs.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.program && <span style={styles.fieldError}>{errors.program}</span>}
                        </div>
                        <div style={{ ...styles.inputGroup, flex: 1 }}>
                            <label style={styles.label}>Level</label>
                            <select
                                id="register-level"
                                value={formData.level}
                                onChange={(e) => updateField('level', e.target.value)}
                                style={{ ...styles.input, paddingLeft: '14px' }}
                            >
                                <option value="">Level</option>
                                {levels.map(l => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                            {errors.level && <span style={styles.fieldError}>{errors.level}</span>}
                        </div>
                    </div>

                    {/* Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                            <input
                                id="register-password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                placeholder="Min. 6 characters"
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
                        {formData.password && (
                            <div style={styles.strengthBar}>
                                <div style={{ ...styles.strengthFill, width: strength.width, backgroundColor: strength.color }} />
                                <span style={{ ...styles.strengthLabel, color: strength.color }}>{strength.label}</span>
                            </div>
                        )}
                        {errors.password && <span style={styles.fieldError}>{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} color="var(--color-subtext)" style={styles.inputIcon} />
                            <input
                                id="register-confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => updateField('confirmPassword', e.target.value)}
                                placeholder="Re-enter your password"
                                style={styles.input}
                            />
                        </div>
                        {errors.confirmPassword && <span style={styles.fieldError}>{errors.confirmPassword}</span>}
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
                                <UserPlus size={20} />
                                Create Account
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Footer */}
                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Already have an account?{' '}
                        <Link to="/login" style={styles.link}>Sign in here</Link>
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
        padding: '40px 36px',
        width: '100%',
        maxWidth: '580px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '28px',
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
        fontSize: '14px',
        marginTop: '8px',
    },
    errorBox: {
        backgroundColor: '#FEE2E2',
        color: '#DC2626',
        padding: '12px 16px',
        borderRadius: '10px',
        fontSize: '14px',
        marginBottom: '16px',
        border: '1px solid #FECACA',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    row: {
        display: 'flex',
        gap: '16px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
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
        padding: '12px 14px 12px 44px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        fontSize: '14px',
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
    fieldError: {
        fontSize: '12px',
        color: '#DC2626',
        marginTop: '2px',
    },
    submitBtn: {
        width: '100%',
        padding: '16px',
        fontSize: '16px',
        borderRadius: '12px',
        justifyContent: 'center',
        marginTop: '8px',
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
        marginTop: '24px',
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
};

export default Register;
