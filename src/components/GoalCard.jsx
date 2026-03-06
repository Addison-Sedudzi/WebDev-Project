import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Plus, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GoalCard = ({ goal, onToggle, onDelete, onAddMilestone, onToggleMilestone }) => {
    const [expanded, setExpanded] = useState(false);
    const [milestoneInput, setMilestoneInput] = useState('');

    const milestoneDone = goal.milestones.filter(m => m.done).length;
    const milestoneTotal = goal.milestones.length;
    const progress = milestoneTotal > 0 ? Math.round((milestoneDone / milestoneTotal) * 100) : 0;

    const handleAddMilestone = (e) => {
        e.preventDefault();
        if (milestoneInput.trim()) {
            onAddMilestone(milestoneInput.trim());
            setMilestoneInput('');
        }
    };

    return (
        <div
            className="card"
            style={{
                borderLeft: `4px solid ${goal.completed ? '#059669' : 'var(--color-primary)'}`,
                opacity: goal.completed ? 0.75 : 1,
                transition: 'all 0.3s ease',
            }}
        >
            {/* Header Row */}
            <div style={styles.headerRow}>
                <button onClick={onToggle} style={styles.checkButton}>
                    {goal.completed ? (
                        <CheckCircle size={24} color="#059669" />
                    ) : (
                        <Circle size={24} color="var(--color-subtext)" />
                    )}
                </button>
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        ...styles.goalTitle,
                        textDecoration: goal.completed ? 'line-through' : 'none',
                        color: goal.completed ? 'var(--color-subtext)' : 'var(--color-text)',
                    }}>
                        {goal.title}
                    </h3>
                    <div style={styles.metaRow}>
                        <span style={styles.metaTag}>
                            <Target size={14} /> Target: {goal.targetCWA} CWA
                        </span>
                        <span style={styles.metaTag}>{goal.semester}</span>
                    </div>
                </div>
                <div style={styles.actions}>
                    <button onClick={() => setExpanded(!expanded)} style={styles.iconButton}>
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button onClick={onDelete} style={{ ...styles.iconButton, color: '#DC2626' }}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Description */}
            {goal.description && (
                <p style={styles.description}>{goal.description}</p>
            )}

            {/* Progress Bar */}
            {milestoneTotal > 0 && (
                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <motion.div
                            style={{ ...styles.progressFill, backgroundColor: progress === 100 ? '#059669' : 'var(--color-primary)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <span style={styles.progressText}>{milestoneDone}/{milestoneTotal} milestones</span>
                </div>
            )}

            {/* Expanded Milestones */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={styles.milestonesSection}>
                            <h4 style={styles.milestoneTitle}>Milestones</h4>

                            {goal.milestones.map(m => (
                                <div key={m.id} style={styles.milestoneItem}>
                                    <button onClick={() => onToggleMilestone(m.id)} style={styles.checkButton}>
                                        {m.done ? (
                                            <CheckCircle size={18} color="#059669" />
                                        ) : (
                                            <Circle size={18} color="var(--color-subtext)" />
                                        )}
                                    </button>
                                    <span style={{
                                        fontSize: '14px',
                                        textDecoration: m.done ? 'line-through' : 'none',
                                        color: m.done ? 'var(--color-subtext)' : 'var(--color-text)',
                                    }}>
                                        {m.title}
                                    </span>
                                </div>
                            ))}

                            <form onSubmit={handleAddMilestone} style={styles.milestoneForm}>
                                <input
                                    type="text"
                                    value={milestoneInput}
                                    onChange={(e) => setMilestoneInput(e.target.value)}
                                    placeholder="Add a milestone..."
                                    style={styles.milestoneInput}
                                />
                                <button type="submit" className="btn-primary" style={styles.addMilestoneBtn}>
                                    <Plus size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    headerRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
    },
    checkButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        display: 'flex',
        flexShrink: 0,
    },
    goalTitle: {
        fontSize: '16px',
        fontWeight: 600,
        margin: 0,
        transition: 'all 0.3s ease',
    },
    metaRow: {
        display: 'flex',
        gap: '12px',
        marginTop: '6px',
        flexWrap: 'wrap',
    },
    metaTag: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '12px',
        color: 'var(--color-subtext)',
        backgroundColor: 'var(--color-background)',
        padding: '4px 10px',
        borderRadius: '20px',
    },
    actions: {
        display: 'flex',
        gap: '4px',
        flexShrink: 0,
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '6px',
        color: 'var(--color-subtext)',
        display: 'flex',
        transition: 'background-color 0.2s ease',
    },
    description: {
        fontSize: '14px',
        color: 'var(--color-subtext)',
        marginTop: '12px',
        marginLeft: '36px',
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: '16px',
        marginLeft: '36px',
    },
    progressBar: {
        flex: 1,
        height: '6px',
        backgroundColor: '#E5E7EB',
        borderRadius: '6px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: '6px',
    },
    progressText: {
        fontSize: '12px',
        color: 'var(--color-subtext)',
        whiteSpace: 'nowrap',
    },
    milestonesSection: {
        marginTop: '20px',
        marginLeft: '36px',
        paddingTop: '16px',
        borderTop: '1px solid #E5E7EB',
    },
    milestoneTitle: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--color-primary)',
        marginBottom: '12px',
    },
    milestoneItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 0',
    },
    milestoneForm: {
        display: 'flex',
        gap: '8px',
        marginTop: '12px',
    },
    milestoneInput: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '8px',
        border: '2px solid #E5E7EB',
        fontSize: '13px',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
    },
    addMilestoneBtn: {
        padding: '10px 14px',
        borderRadius: '8px',
    },
};

export default GoalCard;
