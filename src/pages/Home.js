import React, { useMemo } from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Timeline, People, AttachMoney } from '@mui/icons-material';

const Home = ({ isExpanded }) => {
    const navigate = useNavigate();

    const drawerWidth = useMemo(() => 300, []);
    const collapsedWidth = useMemo(() => 60, []);

    const items = [
        { title: 'Monthly Sales (Current Year)', icon: <BarChart fontSize="large" />, path: '/monthly-sales-current-year' },
        { title: 'Monthly Sales (Historical)', icon: <Timeline fontSize="large" />, path: '/monthly-sales-historical' },
        { title: 'Top Customers', icon: <People fontSize="large" />, path: '/top-customers' },
        { title: 'Customer List', icon: <AttachMoney fontSize="large" />, path: '/customers' }
    ];

    return (
        <Box
            sx={{
                marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
                transition: 'margin-left 0.3s ease',
                padding: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
                        <Card 
                            sx={{ 
                                height: 150, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                boxShadow: 3,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover, &:focus-within': { 
                                    boxShadow: 6, 
                                    transform: 'translateY(-3px)',
                                    backgroundColor: '#f5f5f5',
                                }
                            }}
                        >
                            <CardActionArea 
                                onClick={() => navigate(item.path)}
                                tabIndex={0} // Enable keyboard navigation
                                sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box 
                                        sx={{
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 500,
                                            color: '#333',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
