import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div style={styles.wrapper}>
            <motion.div
                style={styles.content}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
                {/* Animated 404 Number */}
                <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    <h1 style={styles.errorCode}>404</h1>
                </motion.div>

                <motion.div
                    style={styles.iconCircle}
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <AlertTriangle size={40} color="white" />
                </motion.div>

                <h2 style={styles.title}>Page Not Found</h2>
                <p style={styles.description}>
                    Oops! Looks like this page went on academic probation and got suspended. 😅
                    <br />
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/" className="btn-primary" style={styles.homeButton}>
                        <Home size={20} />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Fun animated dots */}
                <div style={styles.dotsRow}>
                    {[0, 1, 2].map(i => (
                        <motion.span
                            key={i}
                            style={styles.dot}
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    },
    content: {
        textAlign: 'center',
        maxWidth: '500px',
    },
    errorCode: {
        fontSize: '120px',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #1B5E20, #43A047, #A5D6A7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
        lineHeight: 1,
    },
    iconCircle: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #F59E0B, #DC2626)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px auto',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--color-text)',
        marginBottom: '12px',
    },
    description: {
        fontSize: '16px',
        color: 'var(--color-subtext)',
        lineHeight: 1.7,
        marginBottom: '32px',
    },
    homeButton: {
        display: 'inline-flex',
        padding: '14px 32px',
        fontSize: '16px',
        borderRadius: '12px',
        textDecoration: 'none',
    },
    dotsRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '40px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-highlight)',
    },
};

export default NotFound;
