import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const drawerWidth = 300;
const collapsedWidth = 60;

const CustomerList = ({ isExpanded }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:64264/api/customer')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the customer data!", error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'companyName', headerName: 'Company Name', width: 150 },
        { field: 'contactName', headerName: 'Contact Name', width: 150 },
        { field: 'country', headerName: 'Country', width: 110 },
    ];

    const rows = customers.map((customer, index) => ({
        id: index,
        companyName: customer.companyName,
        contactName: customer.contactName,
        country: customer.country,
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
                Customer List
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

export default CustomerList;
