import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import customerService from '../services/customerService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const drawerWidth = 300;
const collapsedWidth = 60;

const TopCustomers = ({ isExpanded }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopCustomers = async () => {
            try {
                const data = await customerService.getTopCustomers();
                setCustomers(data);
            } catch (error) {
                setError('Failed to load top customers');
            } finally {
                setLoading(false);
            }
        };

        fetchTopCustomers();
    }, []);

    const chartData = {
        labels: customers.map(customer => customer.companyName),
        datasets: [
            {
                label: 'Total Sales',
                data: customers.map(customer => customer.totalSales),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#FFD700', '#00FA9A', '#8A2BE2', '#DC143C'
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#FFD700', '#00FA9A', '#8A2BE2', '#DC143C'
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#555',
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw || 0;
                        return `${context.label}: $${value.toLocaleString()}`;
                    },
                },
            },
        },
        cutout: '70%', // Controls the size of the hole in the doughnut
        animation: {
            animateRotate: true,
            animateScale: true,
        },
    };

    // Custom plugin to draw labels inside each segment
    const drawLabelsPlugin = {
        id: 'drawLabels',
        afterDraw: (chart) => {
            const { ctx, data } = chart;
            const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

            chart.data.datasets[0].data.forEach((value, i) => {
                const meta = chart.getDatasetMeta(0);
                const arc = meta.data[i];
                const centerAngle = (arc.startAngle + arc.endAngle) / 2;

                // Calculate x and y positions for the label
                const x = arc.x + Math.cos(centerAngle) * (arc.outerRadius + arc.innerRadius) / 2;
                const y = arc.y + Math.sin(centerAngle) * (arc.outerRadius + arc.innerRadius) / 2;

                const percentage = ((value / total) * 100).toFixed(1);

                ctx.save();
                ctx.fillStyle = '#000';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${percentage}%`, x, y); // Draw the label
                ctx.restore();
            });
        },
    };

    ChartJS.register(drawLabelsPlugin);

    return (
        <Container
            sx={{
                marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
                transition: 'margin-left 0.3s ease',
                padding: 3
            }}
        >
            <Typography variant="h4" gutterBottom>
                Top Customers
            </Typography>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <Doughnut data={chartData} options={chartOptions} />
                </div>
            )}
        </Container>
    );
};

export default TopCustomers;
