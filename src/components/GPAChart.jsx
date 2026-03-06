import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GPAChart = ({ history }) => {
    if (!history || history.length === 0) {
        return <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-subtext)' }}>No conversion history available to plot.</div>;
    }

    // Reverse so oldest is first (left to right progression)
    const sortedHistory = [...history].reverse();

    const data = {
        labels: sortedHistory.map(h => h.date),
        datasets: [
            {
                label: 'GPA (4.0)',
                data: sortedHistory.map(h => h.gpa),
                borderColor: 'rgb(46, 125, 50)', // var(--color-accent)
                backgroundColor: 'rgba(46, 125, 50, 0.5)',
                tension: 0.3, // slight curve
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'GPA Progression Trend',
                font: { family: 'Poppins', size: 16, weight: 600 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `GPA: ${context.parsed.y.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            y: { min: 0, max: 4.0 }
        }
    };

    return (
        <div className="card" style={{ marginBottom: '24px' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default GPAChart;
