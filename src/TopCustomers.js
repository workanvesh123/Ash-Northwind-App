import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const drawerWidth = 300;
const collapsedWidth = 60;

const TopCustomers = ({ isExpanded }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:64264/api/customer/top10customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error("Error fetching top customers:", error);
            });
    }, []);

    const columns = [
        { field: 'customerID', headerName: 'Customer ID', width: 120 },
        { field: 'companyName', headerName: 'Company Name', width: 150 },
        { field: 'totalSales', headerName: 'Total Sales', width: 150 },
    ];

    const rows = customers.map((customer, index) => ({
        id: index,
        customerID: customer.customerID,
        companyName: customer.companyName,
        totalSales: customer.totalSales,
    }));

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
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    sx={{
                        '& .MuiDataGrid-root': {
                            border: '1px solid #E0E0E0',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F9F9F9',
                            borderBottom: '1px solid #E0E0E0',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #E0E0E0',
                        },
                    }}
                />
            </div>
        </Container>
    );
};

export default TopCustomers;
