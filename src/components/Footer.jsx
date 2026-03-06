const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.content}>
                    <h3 style={styles.logoText}>GradeSync</h3>
                    <p style={styles.text}>CWA to GPA Converter & Academic Intelligence Platform</p>
                    <p style={styles.subtext}>Built for KNUST Students</p>
                </div>
                <div style={styles.bottom}>
                    <p style={styles.copyright}>&copy; {new Date().getFullYear()} GradeSync Team. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        padding: '40px 24px 24px',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    content: {
        marginBottom: '24px',
    },
    logoText: {
        color: 'var(--color-highlight)',
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '8px',
    },
    text: {
        color: 'var(--color-white)',
        fontSize: '16px',
    },
    subtext: {
        color: 'var(--color-highlight)',
        fontSize: '14px',
        opacity: 0.8,
    },
    bottom: {
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '24px',
        textAlign: 'center',
    },
    copyright: {
        color: 'var(--color-white)',
        fontSize: '14px',
        opacity: 0.8,
    }
};

export default Footer;
