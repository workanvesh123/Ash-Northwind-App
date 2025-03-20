import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import routes from './routes/routes';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <Router>
            <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            {loading ? (
                <Loader />
            ) : (
                <Suspense fallback={<Loader />}>
                    <Routes>
                        {routes.map(({ path, element: Component }) => (
                            <Route key={path} path={path} element={<Component isExpanded={isExpanded} />} />
                        ))}
                        {/* Redirect to home if no route matches */}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>
                </Suspense>
            )}
        </Router>
    );
};

export default App;
