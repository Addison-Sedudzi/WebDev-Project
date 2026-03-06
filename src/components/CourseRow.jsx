import React from 'react';
import { Trash2 } from 'lucide-react';

const CourseRow = ({ course, index, updateCourse, removeCourse }) => {
    return (
        <div style={styles.row}>
            <input
                type="text"
                placeholder="Course Name (e.g. CS 311)"
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                style={styles.input}
                aria-label={`Course Name ${index + 1}`}
            />
            <input
                type="number"
                placeholder="Credits (1-4)"
                min="1"
                max="10"
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                style={{ ...styles.input, width: '100px' }}
                aria-label={`Credits for Course ${index + 1}`}
            />
            <input
                type="number"
                placeholder="Grade (0-100)"
                min="0"
                max="100"
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                style={{ ...styles.input, width: '120px' }}
                aria-label={`Grade for Course ${index + 1}`}
            />
            <button
                onClick={() => removeCourse(index)}
                style={styles.deleteBtn}
                aria-label={`Remove Course ${index + 1}`}
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

const styles = {
    row: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    input: {
        flex: '1 1 150px',
        margin: 0
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-danger)',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform var(--transition-speed)'
    }
};

export default CourseRow;
