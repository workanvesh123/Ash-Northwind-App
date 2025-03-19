import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Typography, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const drawerWidth = 300;
const collapsedWidth = 60;

const MonthlySalesCurrentYear = ({ isExpanded }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:64264/api/MonthlySalesTrend/monthlySales')
            .then(response => {
                const months = Object.keys(response.data);
                const sales = Object.values(response.data);

                setChartData({
                    labels: months,
                    datasets: [
                        {
                            label: 'Monthly Sales',
                            data: sales,
                            backgroundColor: 'rgba(75,192,192,0.6)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the sales data!", error);
                setLoading(false);
            });
    }, []);

    return (
        <Container
            sx={{
                marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
                transition: 'margin-left 0.3s ease',
                padding: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Monthly Sales (Current Year)
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ height: '400px', width: '100%' }}>
                    <Bar 
                        data={chartData} 
                        options={{ 
                            maintainAspectRatio: false,
                            responsive: true,
                            scales: {
                                x: { title: { display: true, text: 'Month' } },
                                y: { title: { display: true, text: 'Sales' } },
                            },
                        }} 
                    />
                </div>
            )}
        </Container>
    );
};

export default MonthlySalesCurrentYear;
