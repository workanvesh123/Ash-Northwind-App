import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Typography, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesByCategory = ({ isExpanded  }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:64264/api/salesbycategory')
            .then(response => {
                const categories = response.data.map(item => item.categoryName);
                const sales = response.data.map(item => item.totalSales);

                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Sales by Category',
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
                marginLeft: isExpanded ? '300px' : '60px', // Adjust based on navbar state
                transition: 'margin-left 0.3s ease',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Sales by Category
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
                        }} 
                    />
                </div>
            )}
        </Container>
    );
};

export default SalesByCategory;
