import React from 'react';
import { Info, HelpCircle, Book } from 'lucide-react';

const LiteracySection = ({ title, content, type = "info" }) => {
    const Icon = type === 'info' ? Info : (type === 'faq' ? HelpCircle : Book);

    return (
        <div style={styles.container}>
            <div style={styles.iconBox}>
                <Icon size={24} color="var(--color-primary)" />
            </div>
            <div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.content}>{content}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        backgroundColor: 'var(--color-white)',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-sm)'
    },
    iconBox: {
        backgroundColor: 'var(--color-highlight)',
        padding: '12px',
        borderRadius: '8px',
        height: 'fit-content'
    },
    title: {
        fontSize: '18px',
        color: 'var(--color-primary)',
        marginBottom: '8px',
        marginTop: 0
    },
    content: {
        color: 'var(--color-subtext)',
        lineHeight: 1.6
    }
};

export default LiteracySection;
