import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Sun, Moon, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
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
    const navigate = useNavigate();
    const { isAuthenticated, currentUser, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const { showToast } = useToast();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname === path;
    };

    // Hide navbar on login/register pages
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleLogout = () => {
        logout();
        showToast('You have been logged out.', 'info');
        navigate('/login');
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
                    <div style={styles.desktopMenu}>
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
                            <span style={styles.userName}>
                                {currentUser?.fullName?.split(' ')[0]}
                            </span>
                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                <LogOut size={16} />
                                Logout
                            </button>
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
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && isAuthenticated && (
                <div style={styles.mobileMenu}>
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
            )}
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: 'var(--color-white)',
        boxShadow: 'var(--shadow-sm)',
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
    userName: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--color-primary)',
        display: 'none',
    },
    logoutBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        backgroundColor: 'transparent',
        color: 'var(--color-subtext)',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif",
        transition: 'all 0.25s ease',
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
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        color: 'var(--color-text)',
    },
    mobileMenu: {
        padding: '12px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        borderTop: '1px solid #E5E7EB',
    },
    mobileNavLink: {
        padding: '12px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        color: 'var(--color-subtext)',
        transition: 'all 0.2s ease',
    },
    mobileNavLinkActive: {
        fontWeight: 700,
        color: 'var(--color-primary)',
        backgroundColor: 'rgba(165, 214, 167, 0.3)',
    },
};

// Add responsive styles via CSS (inject at module level)
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @media (max-width: 1024px) {
            nav .desktop-menu-auto { display: none !important; }
        }
        @media (min-width: 1025px) {
            nav button[data-hamburger] { display: none !important; }
        }
    `;
    // Avoid duplicate injection
    if (!document.querySelector('[data-gradesync-nav-styles]')) {
        styleSheet.setAttribute('data-gradesync-nav-styles', 'true');
        document.head.appendChild(styleSheet);
    }
}

export default Navbar;
