import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Container, Typography, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary scales and components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const drawerWidth = 300;
const collapsedWidth = 60;

const MonthlySalesHistorical = ({isExpanded}) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:64264/api/MonthlySalesTrend/')
            .then(response => {
                const labels = response.data.map(item => `${item.year}-${item.month}`);
                const sales = response.data.map(item => item.totalSales);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Monthly Sales (Historical)',
                            data: sales,
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                            fill: true,
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
        <Container  sx={{
            marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
            transition: 'margin-left 0.3s ease',
            padding: 3,
        }}>
            <Typography variant="h4" gutterBottom>
                Monthly Sales (Historical Data)
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ height: '400px', width: '100%' }}>
                    <Line 
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

export default MonthlySalesHistorical;