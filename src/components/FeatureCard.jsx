import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, icon: Icon, linkTo }) => {
    return (
        <Link to={linkTo} style={{ textDecoration: 'none' }}>
            <div className="card" style={styles.card}>
                <div style={styles.iconWrapper}>
                    <Icon size={32} color="var(--color-primary)" />
                </div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.description}>{description}</p>
            </div>
        </Link>
    );
};

const styles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer'
    },
    iconWrapper: {
        backgroundColor: 'var(--color-highlight)',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '20px',
        display: 'inline-flex'
    },
    title: {
        fontSize: '20px',
        color: 'var(--color-primary)',
        marginBottom: '12px'
    },
    description: {
        color: 'var(--color-subtext)',
        fontSize: '15px'
    }
};

export default FeatureCard;
