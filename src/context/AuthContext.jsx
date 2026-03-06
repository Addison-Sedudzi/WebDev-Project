import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const session = JSON.parse(localStorage.getItem('gradesync_session') || 'null');
        if (session) {
            setCurrentUser(session);
        }
        setLoading(false);
    }, []);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('gradesync_users') || '[]');

        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'An account with this email already exists.' };
        }

        // Check if student ID already exists
        if (users.find(u => u.studentId === userData.studentId)) {
            return { success: false, message: 'This Student ID is already registered.' };
        }

        const newUser = {
            id: Date.now().toString(),
            fullName: userData.fullName,
            studentId: userData.studentId,
            email: userData.email,
            password: userData.password, // In a real app, this would be hashed
            program: userData.program,
            level: userData.level,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('gradesync_users', JSON.stringify(users));

        // Auto-login after registration
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        localStorage.setItem('gradesync_session', JSON.stringify(sessionUser));
        setCurrentUser(sessionUser);

        return { success: true, message: 'Account created successfully!' };
    };

    const login = (email, password, rememberMe = false) => {
        const users = JSON.parse(localStorage.getItem('gradesync_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const sessionUser = { ...user };
        delete sessionUser.password;

        if (rememberMe) {
            localStorage.setItem('gradesync_session', JSON.stringify(sessionUser));
        } else {
            sessionStorage.setItem('gradesync_session', JSON.stringify(sessionUser));
            localStorage.setItem('gradesync_session', JSON.stringify(sessionUser));
        }

        setCurrentUser(sessionUser);
        return { success: true, message: 'Login successful!' };
    };

    const logout = () => {
        localStorage.removeItem('gradesync_session');
        sessionStorage.removeItem('gradesync_session');
        setCurrentUser(null);
    };

    const updateProfile = (updates) => {
        const users = JSON.parse(localStorage.getItem('gradesync_users') || '[]');
        const index = users.findIndex(u => u.id === currentUser.id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('gradesync_users', JSON.stringify(users));
            const sessionUser = { ...users[index] };
            delete sessionUser.password;
            localStorage.setItem('gradesync_session', JSON.stringify(sessionUser));
            setCurrentUser(sessionUser);
        }
    };

    const value = {
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        register,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
