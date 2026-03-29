import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section style={styles.hero} className="hero-section">
            {/* Background orbs for depth */}
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                style={styles.orb1}
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                style={styles.orb2}
            />

            <div style={styles.container}>
                {/* Left — text */}
                <div style={styles.textContainer}>
                    <div style={styles.eyebrow}>Built for KNUST Students</div>
                    <h1 style={styles.title} className="hero-title">
                        Your CWA means<br />
                        more than you think.
                    </h1>
                    <p style={styles.subtitle} className="hero-subtitle">
                        GradeSync converts your KNUST score to a globally recognised GPA — then shows you the scholarships, universities, and opportunities you actually qualify for.
                    </p>
                    <div style={styles.ctaGroup}>
                        <Link to="/converter" className="btn-primary" style={styles.ctaPrimary}>
                            Convert My CWA <ArrowRight size={18} />
                        </Link>
                        <Link to="/scholarships" style={styles.ctaSecondary}>
                            Find Scholarships
                        </Link>
                    </div>

                    {/* Stat strip */}
                    <div style={styles.statStrip}>
                        {[
                            { icon: TrendingUp, label: 'Real-time conversion' },
                            { icon: Globe, label: 'Global grading systems' },
                            { icon: Award, label: 'Scholarship matching' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} style={styles.statItem}>
                                <Icon size={14} color="#A5D6A7" />
                                <span style={styles.statLabel}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — preview card */}
                <div style={styles.cardContainer} className="hero-preview-card">
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            rotateY: [0, 4, -4, 0],
                            rotateX: [0, -2, 2, 0],
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                    >
                    <div style={styles.previewCard}>
                        <div style={styles.cardLabel}>Live Preview</div>
                        <div style={styles.cwaRow}>
                            <span style={styles.cwaValue}>72</span>
                            <span style={styles.cwaUnit}>CWA</span>
                        </div>
                        <div style={styles.arrow}>↓</div>
                        <div style={styles.gpaRow}>
                            <span style={styles.gpaValue}>3.0</span>
                            <span style={styles.gpaUnit}>GPA (4.0 Scale)</span>
                        </div>
                        <div style={styles.standingBadge}>Second Class Upper ✓</div>
                        <div style={styles.cardNote}>Eligible for 6 scholarships</div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)',
        color: 'white',
        padding: '64px 32px',
        borderRadius: '20px',
        marginBottom: '48px',
        boxShadow: '0 20px 40px rgba(27, 94, 32, 0.3)',
        overflow: 'hidden',
        position: 'relative',
    },
    orb1: {
        position: 'absolute',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
        top: '-80px',
        right: '10%',
        pointerEvents: 'none',
    },
    orb2: {
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(165,214,167,0.12) 0%, transparent 70%)',
        bottom: '-40px',
        left: '5%',
        pointerEvents: 'none',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
    },
    textContainer: {
        flex: '1 1 380px',
    },
    eyebrow: {
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#A5D6A7',
        marginBottom: '16px',
        border: '1px solid rgba(165,214,167,0.4)',
        borderRadius: '20px',
        padding: '4px 12px',
    },
    title: {
        fontSize: '44px',
        fontWeight: 800,
        lineHeight: 1.15,
        color: 'white',
        marginBottom: '20px',
        letterSpacing: '-0.5px',
    },
    subtitle: {
        fontSize: '16px',
        color: 'rgba(255,255,255,0.82)',
        marginBottom: '32px',
        lineHeight: 1.7,
        maxWidth: '440px',
    },
    ctaGroup: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: '32px',
    },
    ctaPrimary: {
        padding: '13px 24px',
        fontSize: '14px',
        borderRadius: '10px',
        background: 'white',
        color: '#1B5E20',
        fontWeight: 700,
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        border: 'none',
    },
    ctaSecondary: {
        padding: '13px 20px',
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.9)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        borderRadius: '10px',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
    },
    statStrip: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    statLabel: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 500,
    },
    cardContainer: {
        flex: '1 1 260px',
        display: 'flex',
        justifyContent: 'center',
    },
    previewCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '28px 32px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        minWidth: '220px',
    },
    cardLabel: {
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '1.2px',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        marginBottom: '16px',
    },
    cwaRow: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '6px',
    },
    cwaValue: {
        fontSize: '52px',
        fontWeight: 800,
        color: '#1F2937',
        lineHeight: 1,
        letterSpacing: '-2px',
    },
    cwaUnit: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#6B7280',
    },
    arrow: {
        fontSize: '24px',
        color: '#A5D6A7',
        margin: '8px 0',
        fontWeight: 700,
    },
    gpaRow: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '6px',
    },
    gpaValue: {
        fontSize: '44px',
        fontWeight: 800,
        color: '#1B5E20',
        lineHeight: 1,
        letterSpacing: '-1.5px',
    },
    gpaUnit: {
        fontSize: '12px',
        fontWeight: 600,
        color: '#6B7280',
    },
    standingBadge: {
        marginTop: '14px',
        display: 'inline-block',
        padding: '5px 14px',
        borderRadius: '20px',
        backgroundColor: 'rgba(165,214,167,0.25)',
        color: '#1B5E20',
        fontSize: '12px',
        fontWeight: 700,
        border: '1px solid #A5D6A7',
    },
    cardNote: {
        marginTop: '10px',
        fontSize: '11px',
        color: '#9CA3AF',
        fontWeight: 500,
    },
};

export default HeroSection;
