import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const Loader = () => (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Container>
);

export default Loader;
