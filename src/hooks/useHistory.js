import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
    });

export const useHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchHistory = useCallback(async () => {
        if (!currentUser) { setHistory([]); setLoading(false); return; }
        setLoading(true);
        const { data, error } = await supabase
            .from('academic_history')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) {
            setHistory(data.map(row => ({ ...row, date: formatDate(row.created_at) })));
        }
        setLoading(false);
    }, [currentUser]);

    useEffect(() => { fetchHistory(); }, [fetchHistory]);

    const addEntry = async (entry) => {
        if (!currentUser) return { success: false };
        const { data, error } = await supabase
            .from('academic_history')
            .insert([{ ...entry, user_id: currentUser.id }])
            .select()
            .single();
        if (!error && data) {
            setHistory(prev => [{ ...data, date: formatDate(data.created_at) }, ...prev]);
            return { success: true };
        }
        return { success: false, message: error?.message };
    };

    const clearHistory = async () => {
        if (!currentUser) return;
        await supabase.from('academic_history').delete().eq('user_id', currentUser.id);
        setHistory([]);
    };

    return { history, loading, addEntry, clearHistory };
};
