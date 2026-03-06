import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import GoalCard from '../components/GoalCard';
import { Plus, Target, TrendingUp, Award, BarChart3 } from 'lucide-react';

const GoalTracker = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', targetCWA: '', semester: '', description: '' });
    const { showToast } = useToast();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('gradesync_goals') || '[]');
        setGoals(saved);
    }, []);

    const saveGoals = (updated) => {
        setGoals(updated);
        localStorage.setItem('gradesync_goals', JSON.stringify(updated));
    };

    const addGoal = (e) => {
        e.preventDefault();
        if (!newGoal.title.trim() || !newGoal.targetCWA) {
            showToast('Please fill in the title and target CWA.', 'warning');
            return;
        }

        const goal = {
            id: Date.now().toString(),
            title: newGoal.title,
            targetCWA: parseFloat(newGoal.targetCWA),
            semester: newGoal.semester || 'Not specified',
            description: newGoal.description,
            milestones: [],
            completed: false,
            createdAt: new Date().toISOString(),
        };

        saveGoals([goal, ...goals]);
        setNewGoal({ title: '', targetCWA: '', semester: '', description: '' });
        setShowForm(false);
        showToast('Goal added successfully! 🎯', 'success');
    };

    const toggleGoal = (id) => {
        const updated = goals.map(g =>
            g.id === id ? { ...g, completed: !g.completed } : g
        );
        saveGoals(updated);
        const goal = updated.find(g => g.id === id);
        showToast(goal.completed ? 'Goal marked as completed! 🏆' : 'Goal reopened.', goal.completed ? 'success' : 'info');
    };

    const deleteGoal = (id) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            saveGoals(goals.filter(g => g.id !== id));
            showToast('Goal deleted.', 'info');
        }
    };

    const addMilestone = (goalId, milestoneTitle) => {
        const updated = goals.map(g => {
            if (g.id === goalId) {
                return {
                    ...g,
                    milestones: [...g.milestones, { id: Date.now().toString(), title: milestoneTitle, done: false }]
                };
            }
            return g;
        });
        saveGoals(updated);
        showToast('Milestone added! 📌', 'success');
    };

    const toggleMilestone = (goalId, milestoneId) => {
        const updated = goals.map(g => {
            if (g.id === goalId) {
                return {
                    ...g,
                    milestones: g.milestones.map(m =>
                        m.id === milestoneId ? { ...m, done: !m.done } : m
                    )
                };
            }
            return g;
        });
        saveGoals(updated);
    };

    const completedCount = goals.filter(g => g.completed).length;
    const totalMilestones = goals.reduce((acc, g) => acc + g.milestones.length, 0);
    const doneMilestones = goals.reduce((acc, g) => acc + g.milestones.filter(m => m.done).length, 0);

    return (
        <div className="main-content">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="page-title">Academic Goal Tracker</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-subtext)' }}>
                    Set clear academic targets, track milestones, and stay motivated throughout the semester.
                </p>
            </div>

            {/* Stats Bar */}
            <div style={styles.statsBar}>
                <div style={styles.statItem}>
                    <Target size={22} color="var(--color-primary)" />
                    <div>
                        <span style={styles.statNumber}>{goals.length}</span>
                        <span style={styles.statLabel}>Total Goals</span>
                    </div>
                </div>
                <div style={styles.statItem}>
                    <Award size={22} color="#059669" />
                    <div>
                        <span style={styles.statNumber}>{completedCount}</span>
                        <span style={styles.statLabel}>Completed</span>
                    </div>
                </div>
                <div style={styles.statItem}>
                    <BarChart3 size={22} color="#2563EB" />
                    <div>
                        <span style={styles.statNumber}>{doneMilestones}/{totalMilestones}</span>
                        <span style={styles.statLabel}>Milestones</span>
                    </div>
                </div>
                <div style={styles.statItem}>
                    <TrendingUp size={22} color="#F59E0B" />
                    <div>
                        <span style={styles.statNumber}>
                            {goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%
                        </span>
                        <span style={styles.statLabel}>Progress</span>
                    </div>
                </div>
            </div>

            {/* Add Goal Button or Form */}
            <AnimatePresence>
                {showForm ? (
                    <motion.form
                        key="form"
                        onSubmit={addGoal}
                        className="card"
                        style={styles.goalForm}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3 style={{ color: 'var(--color-primary)', margin: '0 0 16px' }}>Create New Goal</h3>
                        <div style={styles.formGrid}>
                            <div style={styles.formField}>
                                <label style={styles.formLabel}>Goal Title *</label>
                                <input
                                    type="text"
                                    value={newGoal.title}
                                    onChange={(e) => setNewGoal(p => ({ ...p, title: e.target.value }))}
                                    placeholder="e.g. Achieve First Class this semester"
                                    style={styles.formInput}
                                />
                            </div>
                            <div style={styles.formField}>
                                <label style={styles.formLabel}>Target CWA *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={newGoal.targetCWA}
                                    onChange={(e) => setNewGoal(p => ({ ...p, targetCWA: e.target.value }))}
                                    placeholder="e.g. 75"
                                    style={styles.formInput}
                                />
                            </div>
                            <div style={styles.formField}>
                                <label style={styles.formLabel}>Semester</label>
                                <select
                                    value={newGoal.semester}
                                    onChange={(e) => setNewGoal(p => ({ ...p, semester: e.target.value }))}
                                    style={styles.formInput}
                                >
                                    <option value="">Select Semester</option>
                                    <option value="Semester 1, 2025/26">Semester 1, 2025/26</option>
                                    <option value="Semester 2, 2025/26">Semester 2, 2025/26</option>
                                    <option value="Semester 1, 2026/27">Semester 1, 2026/27</option>
                                    <option value="Semester 2, 2026/27">Semester 2, 2026/27</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ ...styles.formField, marginTop: '12px' }}>
                            <label style={styles.formLabel}>Description (optional)</label>
                            <input
                                type="text"
                                value={newGoal.description}
                                onChange={(e) => setNewGoal(p => ({ ...p, description: e.target.value }))}
                                placeholder="Any notes about this goal..."
                                style={styles.formInput}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                            <button type="submit" className="btn-primary">
                                <Plus size={18} /> Add Goal
                            </button>
                            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.button
                        key="addBtn"
                        className="btn-primary"
                        onClick={() => setShowForm(true)}
                        style={{ marginBottom: '24px' }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Plus size={20} /> Set a New Goal
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Goals List */}
            {goals.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                    <Target size={48} color="var(--color-subtext)" style={{ marginBottom: '16px' }} />
                    <h3 style={{ color: 'var(--color-subtext)', fontWeight: 500 }}>No goals yet</h3>
                    <p style={{ color: 'var(--color-subtext)', fontSize: '14px' }}>
                        Click "Set a New Goal" above to start tracking your academic targets.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {goals.map((goal, index) => (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <GoalCard
                                goal={goal}
                                onToggle={() => toggleGoal(goal.id)}
                                onDelete={() => deleteGoal(goal.id)}
                                onAddMilestone={(title) => addMilestone(goal.id, title)}
                                onToggleMilestone={(mId) => toggleMilestone(goal.id, mId)}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    statsBar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px',
        backgroundColor: 'var(--color-white)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-sm)',
    },
    statNumber: {
        display: 'block',
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-text)',
    },
    statLabel: {
        display: 'block',
        fontSize: '13px',
        color: 'var(--color-subtext)',
    },
    goalForm: {
        marginBottom: '24px',
        overflow: 'hidden',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '16px',
    },
    formField: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    formLabel: {
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--color-text)',
    },
    formInput: {
        padding: '12px',
        borderRadius: '8px',
        border: '2px solid #E5E7EB',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '14px',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
    },
};

export default GoalTracker;
