import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Sun, Moon, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const navItems = [
    { to: '/converter', label: 'Converter' },
    { to: '/simulator', label: 'Simulator' },
    { to: '/planner', label: 'Planner' },
    { to: '/scholarships', label: 'Scholarships' },
    { to: '/goals', label: 'Goals' },
    { to: '/comparison', label: 'Compare' },
    { to: '/literacy', label: 'Literacy' },
    { to: '/readiness', label: 'Readiness' },
    { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, currentUser } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname === path;
    };

    // Hide navbar on all auth pages
    const authPages = ['/login', '/register', '/forgot-password', '/reset-password'];
    if (authPages.includes(location.pathname)) {
        return null;
    }

    const getInitials = (fullName) => {
        if (!fullName) return '?';
        const parts = fullName.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <Link to="/" style={{
                    ...styles.logo,
                    ...(isActive('/') ? styles.logoActive : {}),
                }}>
                    <BookOpen color="var(--color-primary)" size={28} />
                    <span style={styles.logoText}>GradeSync</span>
                </Link>

                {/* Desktop Menu */}
                {isAuthenticated && (
                    <div style={styles.desktopMenu} className="nav-desktop-menu">
                        {navItems.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                style={{
                                    ...styles.navLink,
                                    ...(isActive(to) ? styles.navLinkActive : {}),
                                }}
                            >
                                {label}
                                {isActive(to) && <span style={styles.activeIndicator} />}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Right-side actions */}
                <div style={styles.rightSection}>
                    {/* Dark mode toggle */}
                    <button onClick={toggleTheme} style={styles.iconBtn} title={isDark ? 'Light Mode' : 'Dark Mode'}>
                        {isDark ? <Sun size={20} color="var(--color-warning)" /> : <Moon size={20} color="var(--color-subtext)" />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" style={styles.initialsAvatar} title={currentUser?.fullName}>
                                {getInitials(currentUser?.fullName)}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.authLink}>
                                <LogIn size={16} /> Login
                            </Link>
                            <Link to="/register" className="btn-primary" style={styles.registerBtn}>
                                <UserPlus size={16} /> Register
                            </Link>
                        </>
                    )}

                    {/* Mobile hamburger */}
                    {isAuthenticated && (
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={styles.hamburger}
                            className="nav-hamburger"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Side drawer + backdrop (always mounted so CSS transition works both ways) */}
            {isAuthenticated && (
                <>
                    <div
                        className="nav-drawer-overlay"
                        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none' }}
                        onClick={() => setMobileOpen(false)}
                    />
                    <div
                        className="nav-drawer"
                        style={{
                            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                            backgroundColor: 'var(--color-white)',
                        }}
                    >
                        <div style={styles.drawerHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <BookOpen color="var(--color-primary)" size={22} />
                                <span style={styles.logoText}>GradeSync</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)} style={styles.drawerClose}>
                                <X size={24} color="var(--color-subtext)" />
                            </button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 24px' }}>
                            {navItems.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        ...styles.mobileNavLink,
                                        ...(isActive(to) ? styles.mobileNavLinkActive : {}),
                                    }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: 'var(--color-white)',
        boxShadow: '0 1px 0 0 rgba(0,0,0,0.06)',
        borderBottom: '2px solid #A5D6A7',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        padding: '4px 8px',
        borderRadius: '8px',
        transition: 'background-color 0.25s ease',
        flexShrink: 0,
    },
    logoActive: {
        backgroundColor: 'rgba(27, 94, 32, 0.08)',
    },
    logoText: {
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-primary)',
    },
    desktopMenu: {
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    navLink: {
        fontWeight: 500,
        fontSize: '13px',
        color: 'var(--color-subtext)',
        textDecoration: 'none',
        padding: '6px 10px',
        borderRadius: '8px',
        transition: 'all 0.25s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap',
    },
    navLinkActive: {
        fontWeight: 700,
        color: 'var(--color-primary)',
        backgroundColor: 'rgba(165, 214, 167, 0.3)',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: '0px',
        left: '20%',
        right: '20%',
        height: '3px',
        borderRadius: '3px 3px 0 0',
        backgroundColor: 'var(--color-primary)',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.25s ease',
    },
    initialsAvatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B5E20, #43A047)',
        color: 'white',
        fontWeight: 700,
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        flexShrink: 0,
        boxShadow: '0 2px 6px rgba(27, 94, 32, 0.35)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    authLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '8px',
        color: 'var(--color-primary)',
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
    },
    registerBtn: {
        padding: '8px 16px',
        fontSize: '13px',
        borderRadius: '8px',
        textDecoration: 'none',
    },
    hamburger: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        color: 'var(--color-text)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        flexShrink: 0,
    },
    drawerClose: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileNavLink: {
        display: 'block',
        padding: '13px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        color: 'var(--color-subtext)',
        transition: 'all 0.2s ease',
        marginBottom: '4px',
    },
    mobileNavLinkActive: {
        fontWeight: 700,
        color: 'var(--color-primary)',
        backgroundColor: 'rgba(165, 214, 167, 0.3)',
    },
};


export default Navbar;
