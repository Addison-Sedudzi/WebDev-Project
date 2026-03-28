import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const formatUser = (supabaseUser) => {
    if (!supabaseUser) return null;
    return {
        id: supabaseUser.id,
        email: supabaseUser.email,
        fullName: supabaseUser.user_metadata?.full_name || '',
        studentId: supabaseUser.user_metadata?.student_id || '',
        program: supabaseUser.user_metadata?.program || '',
        level: supabaseUser.user_metadata?.level || '',
    };
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setCurrentUser(session?.user ? formatUser(session.user) : null);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ? formatUser(session.user) : null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const register = async (userData) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        full_name: userData.fullName,
                        student_id: userData.studentId,
                        program: userData.program,
                        level: userData.level,
                    }
                }
            });

            if (error) return { success: false, message: error.message };

            if (data.user && !data.session) {
                return { success: false, requiresConfirmation: true, message: 'Please check your email to confirm your account before signing in.' };
            }

            return { success: true, message: 'Account created successfully!' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) return { success: false, message: error.message };
            return { success: true, user: data.user };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
    };

    const deleteAccount = async () => {
        try {
            // Calls a Postgres function in Supabase that deletes the current user
            const { error } = await supabase.rpc('delete_user');
            if (error) return { success: false, message: error.message };
            await supabase.auth.signOut();
            setCurrentUser(null);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const forgotPassword = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) return { success: false, message: error.message };
            return { success: true, message: 'Password reset email sent! Check your inbox.' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const resetPassword = async (newPassword) => {
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) return { success: false, message: error.message };
            return { success: true, message: 'Password updated successfully!' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const updateProfile = async (updates) => {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                full_name: updates.fullName ?? currentUser?.fullName,
                student_id: updates.studentId ?? currentUser?.studentId,
                program: updates.program ?? currentUser?.program,
                level: updates.level ?? currentUser?.level,
            }
        });
        if (!error && data.user) {
            setCurrentUser(formatUser(data.user));
        }
        return { success: !error, message: error?.message };
    };

    const value = {
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        deleteAccount,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
