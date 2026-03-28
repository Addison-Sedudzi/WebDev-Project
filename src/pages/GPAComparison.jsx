import React, { useState, useEffect } from 'react';
import { useHistory } from '../hooks/useHistory';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Realistic average GPAs for KNUST programs
const programAverages = [
    { program: 'Computer Science', avg: 2.85, top: 3.65 },
    { program: 'Electrical Eng.', avg: 2.70, top: 3.50 },
    { program: 'Mechanical Eng.', avg: 2.75, top: 3.55 },
    { program: 'Civil Engineering', avg: 2.80, top: 3.60 },
    { program: 'Medicine', avg: 3.10, top: 3.80 },
    { program: 'Pharmacy', avg: 2.95, top: 3.70 },
    { program: 'Architecture', avg: 2.90, top: 3.60 },
    { program: 'Business Admin.', avg: 2.65, top: 3.45 },
    { program: 'Mathematics', avg: 2.60, top: 3.40 },
    { program: 'Economics', avg: 2.70, top: 3.50 },
];

const GPAComparison = () => {
    const [userGpa, setUserGpa] = useState('');
    const { history } = useHistory();

    useEffect(() => {
        if (history.length > 0) {
            setUserGpa(history[0].gpa.toFixed(2));
        }
    }, [history]);

    const gpaNum = parseFloat(userGpa) || 0;

    const chartData = {
        labels: programAverages.map(p => p.program),
        datasets: [
            {
                label: 'Your GPA',
                data: programAverages.map(() => gpaNum || 0),
                backgroundColor: 'rgba(27, 94, 32, 0.85)',
                borderColor: '#1B5E20',
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.25,
                categoryPercentage: 0.8,
            },
            {
                label: 'Program Average',
                data: programAverages.map(p => p.avg),
                backgroundColor: 'rgba(165, 214, 167, 0.7)',
                borderColor: '#A5D6A7',
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.25,
                categoryPercentage: 0.8,
            },
            {
                label: 'Top 10% Average',
                data: programAverages.map(p => p.top),
                backgroundColor: 'rgba(245, 158, 11, 0.7)',
                borderColor: '#F59E0B',
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.25,
                categoryPercentage: 0.8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: "'Poppins', sans-serif", size: 13 },
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleFont: { family: "'Poppins', sans-serif" },
                bodyFont: { family: "'Poppins', sans-serif" },
                padding: 12,
                borderRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 4.0,
                ticks: {
                    stepSize: 0.5,
                    font: { family: "'Poppins', sans-serif", size: 12 },
                },
                grid: { color: 'rgba(0,0,0,0.06)' },
                title: {
                    display: true,
                    text: 'GPA (4.0 Scale)',
                    font: { family: "'Poppins', sans-serif", size: 13, weight: 600 },
                },
            },
            x: {
                ticks: {
                    font: { family: "'Poppins', sans-serif", size: 11 },
                    maxRotation: 45,
                    minRotation: 30,
                },
                grid: { display: false },
            },
        },
    };

    // Determine where the user stands
    const getStanding = () => {
        if (!gpaNum) return null;
        const above = programAverages.filter(p => gpaNum > p.avg).length;
        const pct = Math.round((above / programAverages.length) * 100);
        if (gpaNum >= 3.5) return { text: `Outstanding! You're in the top tier across all programs.`, color: '#059669' };
        if (pct >= 70) return { text: `Great work! Your GPA is above ${pct}% of program averages listed.`, color: '#2563EB' };
        if (pct >= 40) return { text: `You're competitive with ${pct}% of program averages. Keep pushing!`, color: '#F59E0B' };
        return { text: `There's room for improvement. Use the Improvement Planner to set targets.`, color: '#DC2626' };
    };

    const standing = getStanding();

    return (
        <div className="main-content">
            <div style={{ marginBottom: '32px' }}>
                <span className="badge">Analytics</span>
                <h1 className="page-title" style={{ marginTop: '10px', marginBottom: '8px' }}>GPA Comparison</h1>
                <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px' }}>
                    See where you stand against average and top-performing students across KNUST programs.
                </p>
            </div>

            {/* Input Section */}
            <div className="card" style={{ maxWidth: '400px', margin: '0 auto 32px', textAlign: 'center' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)' }}>
                    Your GPA (4.0 Scale)
                </label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={userGpa}
                    onChange={(e) => setUserGpa(e.target.value)}
                    placeholder="Enter your GPA (e.g. 3.2)"
                    style={{ maxWidth: '200px', margin: '8px auto 0', textAlign: 'center' }}
                />
            </div>

            {/* Standing Message */}
            {standing && (
                <motion.div
                    className="card"
                    style={{
                        marginBottom: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        borderLeft: `4px solid ${standing.color}`,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <BarChart3 size={24} color={standing.color} />
                    <p style={{ margin: 0, fontSize: '15px', color: 'var(--color-text)' }}>
                        {standing.text}
                    </p>
                </motion.div>
            )}

            {/* Chart */}
            <div className="card" style={{ padding: '24px' }}>
                <div style={{ height: '420px' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Legend/Info */}
            <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: 'var(--color-white)',
                borderRadius: '10px',
                borderLeft: '4px solid var(--color-primary)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
            }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-subtext)' }}>
                    <strong style={{ color: 'var(--color-primary)' }}>Note:</strong> Program averages are estimates based on publicly available KNUST academic data.
                    Individual performance varies by year and cohort.
                </p>
            </div>
        </div>
    );
};

export default GPAComparison;
