import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, Users, ShoppingCart, BarChart, TrendingUp, Clock } from 'lucide-react';

const drawerWidth = 300;
const collapsedWidth = 60;

const navItems = [
    { text: 'Home', icon: <Home />, path: '/home' },
    { text: 'Customers', icon: <Users />, path: '/customers' },
    { text: 'Top Customers', icon: <BarChart />, path: '/top-customers' },
    { text: 'Sales by Category', icon: <ShoppingCart />, path: '/sales-by-category' },
    { text: 'Monthly Sales (Current Year)', icon: <TrendingUp />, path: '/monthly-sales-current-year' },
    { text: 'Monthly Sales (Historical)', icon: <Clock />, path: '/monthly-sales-historical' }
];

const Navbar = ({ children, isExpanded, setIsExpanded }) => {
    return (
        <div style={{ display: 'flex', height: '1vh' }}>
            {/* Drawer */}
            <Drawer
                variant="permanent"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                sx={{
                    width: isExpanded ? drawerWidth : collapsedWidth,
                    flexShrink: 0,
                    transition: 'width 0.3s ease',
                    '& .MuiDrawer-paper': {
                        width: isExpanded ? drawerWidth : collapsedWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#F9F9F9',
                        color: '#000',
                        borderRight: '1px solid #E0E0E0',
                        overflowX: 'hidden',
                        transition: 'width 0.3s ease',
                    },
                }}
            >
                <Toolbar />
                <List>
                    {navItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            component={Link}
                            to={item.path}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#F0F0F0',
                                    borderRadius: '8px',
                                },
                                padding: '12px',
                                margin: '4px 8px',
                                transition: 'background-color 0.2s ease-in-out',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemIcon sx={{ color: '#757575', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            {isExpanded && (
                                <ListItemText 
                                    primary={item.text} 
                                    primaryTypographyProps={{
                                        fontSize: '16px',
                                        fontWeight: 500
                                    }} 
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Main Content */}
            <div style={{
                flexGrow: 1,
                padding: '16px',
                marginLeft: isExpanded ? `${drawerWidth}px` : `${collapsedWidth}px`,
                overflow: 'auto',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh',
                transition: 'margin-left 0.3s ease',
            }}>
                {children}
            </div>
        </div>
    );
};

export default Navbar;
