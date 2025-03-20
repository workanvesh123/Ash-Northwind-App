import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Alert, CircularProgress } from '@mui/material';
import customerService from '../services/customerService';

const drawerWidth = 300;
const collapsedWidth = 60;

const CustomerList = ({ isExpanded }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await customerService.getCustomers();
                setCustomers(data);
            } catch (error) {
                setError('Failed to load customer data');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'contactName', headerName: 'Contact Name', width: 200 },
        { field: 'contactTitle', headerName: 'Contact Title', width: 200 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'region', headerName: 'Region', width: 150 },
        { field: 'postalCode', headerName: 'Postal Code', width: 150 },
        { field: 'country', headerName: 'Country', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'fax', headerName: 'Fax', width: 150 }
    ];
    
    const rows = customers.map((customer) => ({
        id: customer.customerId, // Use customerId as the unique identifier
        companyName: customer.companyName,
        contactName: customer.contactName,
        contactTitle: customer.contactTitle,
        address: customer.address,
        city: customer.city,
        region: customer.region || '', // Handle null values
        postalCode: customer.postalCode,
        country: customer.country,
        phone: customer.phone,
        fax: customer.fax || '' // Handle null values
    }));    

    return (
        <Container
            sx={{
                marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
                transition: 'margin-left 0.3s ease',
                padding: 3,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Customer List
            </Typography>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        autoHeight
                        sx={{
                            '& .MuiDataGrid-root': {
                                border: '1px solid #ddd',
                                borderRadius: 2,
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#fafafa',
                                color: '#333',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                color: '#555',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    />
                </div>
            )}
        </Container>
    );
};

export default CustomerList;
