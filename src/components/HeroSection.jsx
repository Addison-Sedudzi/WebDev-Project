import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <section style={styles.hero}>
            <div style={styles.container}>
                <div style={styles.textContainer}>
                    <h1 className="page-title" style={styles.title}>
                        Master Your Academic Future with <span style={{ color: 'var(--color-highlight)' }}>GradeSync</span>
                    </h1>
                    <p style={styles.subtitle}>
                        Accurately convert your KNUST CWA to an internationally recognised GPA. Stop guessing, start planning, and discover the global opportunities you qualify for.
                    </p>
                    <div style={styles.ctaGroup}>
                        <Link to="/converter" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
                            Convert My CWA <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
                <div style={styles.imageContainer}>
                    {/* A soft decorative element replacing an image for now */}
                    <div style={styles.decorativeCircle}>
                        <div style={styles.innerCircle}>
                            <span style={{ fontSize: '48px', fontWeight: 'bold' }}>A+</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        padding: '80px 24px',
        borderRadius: '16px',
        marginBottom: '48px',
        boxShadow: 'var(--shadow-lg)'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    textContainer: {
        flex: '1 1 400px',
    },
    title: {
        color: 'var(--color-white)',
        fontSize: '48px',
        lineHeight: 1.2,
        marginBottom: '24px'
    },
    subtitle: {
        color: 'var(--color-background)',
        fontSize: '20px',
        marginBottom: '32px',
        opacity: 0.9
    },
    ctaGroup: {
        display: 'flex',
        gap: '16px'
    },
    imageContainer: {
        flex: '1 1 300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    decorativeCircle: {
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
    },
    innerCircle: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-highlight)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-primary)'
    }
};

export default HeroSection;
