import axios from 'axios';

const API_URL = 'https://localhost:64264';
// const API_URL = process.env.REACT_APP_API_URL;

const customerService = {
    getCustomers: async () => {
        try {
            console.log(`${API_URL}/api/customer`); // ✅ Correct backticks
            const response = await axios.get(`${API_URL}/api/customer`); // ✅ Correct backticks
            return response.data;
        } catch (error) {
            console.error('Error fetching customer data:', error);
            throw error;
        }
    },
    getTopCustomers: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/customer/top10customers`);
            return response.data;
        } catch (error) {
            console.error("Error fetching top customers:", error);
            throw error;
        }
    }
};

export default customerService;
