import React, { useState, useEffect } from 'react';
import CourseRow from './CourseRow';
import ResultDisplay from './ResultDisplay';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { convertCWAToGPA, getAcademicStanding } from '../utils/conversionAlgorithm';

const SimulatorTable = () => {
    const [courses, setCourses] = useState([
        { name: '', credits: '', grade: '' },
        { name: '', credits: '', grade: '' },
        { name: '', credits: '', grade: '' }
    ]);
    const [result, setResult] = useState(null);
    const [standing, setStanding] = useState(null);
    const [totals, setTotals] = useState({ creditHours: 0, cwa: 0 });
    const [saveSuccess, setSaveSuccess] = useState(false);

    const addCourse = () => {
        setCourses([...courses, { name: '', credits: '', grade: '' }]);
    };

    const removeCourse = (index) => {
        if (courses.length > 1) {
            setCourses(courses.filter((_, i) => i !== index));
        }
    };

    const updateCourse = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    // Live Calculation
    useEffect(() => {
        let totalCredits = 0;
        let weightedScore = 0;
        let validCourses = 0;

        courses.forEach(c => {
            const cr = parseFloat(c.credits);
            const gr = parseFloat(c.grade);

            if (!isNaN(cr) && !isNaN(gr) && cr > 0 && gr >= 0 && gr <= 100) {
                totalCredits += cr;
                weightedScore += (gr * cr);
                validCourses++;
            }
        });

        if (totalCredits > 0) {
            const currentCwa = weightedScore / totalCredits;
            setTotals({ creditHours: totalCredits, cwa: currentCwa.toFixed(2) });

            const conversion = convertCWAToGPA(currentCwa);
            setResult(conversion);
            setStanding(getAcademicStanding(conversion.gpa));
        } else {
            setTotals({ creditHours: 0, cwa: 0 });
            setResult(null);
            setStanding(null);
        }
    }, [courses]);

    const handleSave = () => {
        if (result && totals.cwa > 0) {
            const historyItem = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                cwa: parseFloat(totals.cwa),
                credits: totals.creditHours,
                gpa: result.gpa,
                system: '4.0',
                source: 'simulator'
            };

            const existingHistory = JSON.parse(localStorage.getItem('gradesync_history') || '[]');
            localStorage.setItem('gradesync_history', JSON.stringify([historyItem, ...existingHistory]));

            // Show success feedback
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Success Toast */}
            {saveSuccess && (
                <div style={styles.toast}>
                    <CheckCircle size={20} />
                    <span>Saved to your profile successfully!</span>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="section-heading" style={{ margin: 0 }}>Course Grades</h2>
                <button onClick={addCourse} style={styles.addBtn}>
                    <PlusCircle size={18} /> Add Course
                </button>
            </div>

            <div style={{ marginBottom: '32px' }}>
                {courses.map((course, index) => (
                    <CourseRow
                        key={index}
                        index={index}
                        course={course}
                        updateCourse={updateCourse}
                        removeCourse={removeCourse}
                    />
                ))}
            </div>

            {result ? (
                <div style={styles.summaryBox}>
                    <div style={{ textAlign: 'center' }}>
                        <span className="caption">Total Credits</span>
                        <div style={styles.summaryStat}>{totals.creditHours}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span className="caption">Calculated CWA</span>
                        <div style={styles.summaryStat}>{totals.cwa}</div>
                    </div>
                </div>
            ) : (
                <div style={styles.placeholderBox}>
                    Enter valid credits and grades to see your live CWA / GPA simulation.
                </div>
            )}

            {result && <ResultDisplay result={result} standing={standing} onSave={handleSave} />}
        </div>
    );
};

const styles = {
    addBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'var(--color-highlight)',
        color: 'var(--color-primary)',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px'
    },
    summaryBox: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'var(--color-background)',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid var(--color-highlight)',
        marginBottom: '24px'
    },
    summaryStat: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--color-primary)'
    },
    placeholderBox: {
        textAlign: 'center',
        padding: '24px',
        backgroundColor: 'var(--color-background)',
        borderRadius: '8px',
        color: 'var(--color-subtext)',
        fontStyle: 'italic',
        marginBottom: '24px'
    },
    toast: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#e6f9ed',
        color: '#1a7a3a',
        padding: '14px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontWeight: 600,
        fontSize: '15px',
        border: '1px solid #a3e4b8',
        animation: 'fadeIn 0.3s ease-in-out'
    }
};

export default SimulatorTable;
