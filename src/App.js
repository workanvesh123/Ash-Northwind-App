import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CustomerList from './CustomerList';
import SalesByCategory from './SalesByCategory';
import MonthlySalesCurrentYear from './MonthlySalesCurrentYear';
import MonthlySalesHistorical from './MonthlySalesHistorical';
import TopCustomers from './TopCustomers';
import Home from './Home';
import { CircularProgress, Container } from '@mui/material';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Router>
            <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            {loading ? (
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Container>
            ) : (
                <Routes>
                    <Route path="/home" element={<Home isExpanded={isExpanded} />} />
                    <Route path="/customers" element={<CustomerList isExpanded={isExpanded} />} />
                    <Route path="/sales-by-category" element={<SalesByCategory isExpanded={isExpanded} />} />
                    <Route path="/top-customers" element={<TopCustomers isExpanded={isExpanded} />} />
                    <Route path="/monthly-sales-current-year" element={<MonthlySalesCurrentYear isExpanded={isExpanded} />} />
                    <Route path="/monthly-sales-historical" element={<MonthlySalesHistorical isExpanded={isExpanded} />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
