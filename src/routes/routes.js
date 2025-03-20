import Home from '../pages/Home';
import CustomerList from '../pages/CustomerList';
import SalesByCategory from '../pages/SalesByCategory';
import MonthlySalesCurrentYear from '../pages/MonthlySalesCurrentYear';
import MonthlySalesHistorical from '../pages/MonthlySalesHistorical';
import TopCustomers from '../pages/TopCustomers';

const routes = [
    { path: '/home', element: Home },
    { path: '/customers', element: CustomerList },
    { path: '/sales-by-category', element: SalesByCategory },
    { path: '/top-customers', element: TopCustomers },
    { path: '/monthly-sales-current-year', element: MonthlySalesCurrentYear },
    { path: '/monthly-sales-historical', element: MonthlySalesHistorical },
];

export default routes;
