// // reportService.ts
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// interface DateRange {
//   from: Date;
//   to: Date;
// }

// export const fetchSalesReport = async (dateRange: DateRange, token: string) => {
//   console.log( "fetchSalesReport", fetchSalesReport);
  
//   try {
//     const params = {
//       startDate: dateRange.from.toISOString().split('T')[0],
//       endDate: dateRange.to.toISOString().split('T')[0]
//     };

//         console.log('Fetching sales with params:', params);


//     const response = await axios.get(`${API_URL}/reports/sales`, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//         console.log('Sales response:', response.data); // Add this line

//     return response.data.data;
//   } catch (error) {
//         console.error('Sales report error:', error);
//     if (axios.isAxiosError(error)) {
//       console.error('Error fetching sales report:', error.response?.status, error.message);
//       throw new Error(error.response?.data?.message || 'Failed to fetch sales report');
//     }
//     console.error('Unexpected error:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };

// export const fetchInventoryReport = async (token: string) => {
//     console.log( "fetchInventoryReport", fetchInventoryReport);

//   try {
//     const response = await axios.get(`${API_URL}/reports/inventory`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error fetching inventory report:', error.response?.status);
//       throw new Error(error.response?.data?.message || 'Failed to fetch inventory report');
//     }
//     console.error('Unexpected error:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };

// export const fetchRevenueReport = async (token: string) => {
//       console.log( "fetchRevenueReport", fetchRevenueReport);

  
//   try {
//     const response = await axios.get(`${API_URL}/reports/revenue`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error fetching revenue report:', error.response?.status);
//       throw new Error(error.response?.data?.message || 'Failed to fetch revenue report');
//     }
//     console.error('Unexpected error:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };

// export const fetchProfitReport = async (token: string) => {
//         console.log( "fetchProfitReport", fetchProfitReport);

//   try {
//     const response = await axios.get(`${API_URL}/reports/profit`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error fetching profit report:', error.response?.status);
//       throw new Error(error.response?.data?.message || 'Failed to fetch profit report');
//     }
//     console.error('Unexpected error:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };

// export const fetchRecentOrders = async (token: string) => {
//           console.log( "fetchRecentOrders", fetchRecentOrders);

//   try {
//     const response = await axios.get(`${API_URL}/reports/recent-orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error fetching recent orders:', error.response?.status);
//       throw new Error(error.response?.data?.message || 'Failed to fetch recent orders');
//     }
//     console.error('Unexpected error:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };

















// for ordr dtbse chngng
// reportService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface DateRange {
  from: Date;
  to: Date;
}


export const fetchSalesReport = async (dateRange: DateRange, token: string) => {
  console.log( "fetchSalesReport", fetchSalesReport);
  
  try {
    const params = {
      startDate: dateRange.from.toISOString().split('T')[0],
      endDate: dateRange.to.toISOString().split('T')[0]
    };

    console.log('Fetching sales with params:', params);

    const response = await axios.get(`${API_URL}/reports/sales`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Sales response:', response.data);

    return response.data.data;
  } catch (error) {
    console.error('Sales report error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error fetching sales report:', error.response?.status, error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch sales report');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const fetchInventoryReport = async (token: string) => {
  console.log( "fetchInventoryReport", fetchInventoryReport);

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

export const fetchRevenueReport = async (token: string) => {
  console.log( "fetchRevenueReport", fetchRevenueReport);

  try {
    const response = await axios.get(`${API_URL}/reports/revenue`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching revenue report:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to fetch revenue report');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const fetchProfitReport = async (token: string) => {
  console.log( "fetchProfitReport", fetchProfitReport);

  try {
    const response = await axios.get(`${API_URL}/reports/profit`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching profit report:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to fetch profit report');
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const fetchRecentOrders = async (token: string) => {
  console.log( "fetchRecentOrders", fetchRecentOrders);

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

// ADD THESE TWO NEW FUNCTIONS AT THE END OF THE FILE:

export const fetchDashboardSummary = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/reports/dashboard-summary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard summary');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchDailySales = async (dateRange: DateRange, token: string) => {
  try {
    const params = {
      startDate: dateRange.from.toISOString().split('T')[0],
      endDate: dateRange.to.toISOString().split('T')[0]
    };

    const response = await axios.get(`${API_URL}/reports/daily-sales`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch daily sales');
    }
    throw new Error('An unexpected error occurred');
  }
};