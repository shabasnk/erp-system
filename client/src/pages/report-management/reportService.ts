// // src/services/reportService.ts
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// interface DateRange {
//   from: Date;
//   to: Date;
// }

// export const fetchSalesReport = async (dateRange: DateRange | undefined, token: string) => {
//   const params: any = {};
  
//   if (dateRange?.from && dateRange?.to) {
//     params.startDate = dateRange.from.toISOString();
//     params.endDate = dateRange.to.toISOString();
//   }

//   const response = await axios.get(`${API_URL}/reports/sales`, {
//     params,
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data.data;
// };

// export const fetchInventoryReport = async (token: string) => {
//   const response = await axios.get(`${API_URL}/reports/inventory`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data.data;
// };

// export const fetchRevenueReport = async (token: string) => {
//   const response = await axios.get(`${API_URL}/reports/revenue`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data.data;
// };

// export const fetchProfitReport = async (token: string) => {
//   const response = await axios.get(`${API_URL}/reports/profit`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data.data;
// };

// export const fetchRecentOrders = async (token: string) => {
//   const response = await axios.get(`${API_URL}/reports/recent-orders`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data.data;
// };






// import axios from 'axios';
// import { log } from 'console';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// interface DateRange {
//   from: Date;
//   to: Date;
// }

// export const fetchSalesReport = async (dateRange: DateRange, token: string) => {

//   console.log('Making request with token:', token); // Verify token exists
  
//   try {
//     const params = {
//       startDate: dateRange.from.toISOString(),
//       endDate: dateRange.to.toISOString()
//     };

//     const response = await axios.get(`${API_URL}/reports/sales`, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching sales report:', error);
//     throw error;
//   }
// };

// export const fetchInventoryReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/inventory`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching inventory report:', error);
//     throw error;
//   }
// };

// export const fetchRevenueReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/revenue`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching revenue report:', error);
//     throw error;
//   }
// };

// export const fetchProfitReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/profit`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching profit report:', error);
//     throw error;
//   }
// };

// export const fetchRecentOrders = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/recent-orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching recent orders:', error);
//     throw error;
//   }
// };








// import axios from 'axios';
// import { log } from 'console';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// interface DateRange {
//   from: Date;
//   to: Date;
// }

// export const fetchSalesReport = async (dateRange: DateRange, token: string) => {
//   console.log("token:",token);
  
//   try {
//     const params = {
//       startDate: dateRange.from.toISOString(),
//       endDate: dateRange.to.toISOString()
//     };

//     const response = await axios.get(`${API_URL}/reports/sales`, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching sales report:', error);
//     throw error;
//   }
// };

// export const fetchInventoryReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/inventory`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching inventory report:', error);
//     throw error;
//   }
// };

// export const fetchRevenueReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/revenue`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching revenue report:', error);
//     throw error;
//   }
// };

// export const fetchProfitReport = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/profit`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching profit report:', error);
//     throw error;
//   }
// };

// export const fetchRecentOrders = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/recent-orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching recent orders:', error);
//     throw error;
//   }
// };


// // reportService.ts
// export const fetchRecentOrders = async (token: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/recent-orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching recent orders:', error);
//     throw error;
//   }
// };




import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface DateRange {
  from: Date;
  to: Date;
}

export const fetchSalesReport = async (dateRange: DateRange, token: string) => {
  try {
    const params = {
      startDate: dateRange.from.toISOString().split('T')[0], // Just the date portion
      endDate: dateRange.to.toISOString().split('T')[0]
    };

    const response = await axios.get(`${API_URL}/reports/sales`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching sales report:', error.response?.status, error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch sales report');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const fetchInventoryReport = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/reports/inventory`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching inventory report:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to fetch inventory report');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

// Keep only one instance of each function
export const fetchRecentOrders = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/reports/recent-orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching recent orders:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to fetch recent orders');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

// Other functions (revenue, profit) follow the same pattern...