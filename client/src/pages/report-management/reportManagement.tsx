//src\pages\report-management\reportManagement.tsx
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { DollarSign, ShoppingCart, TrendingUp, CreditCard } from "lucide-react";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDateRangePicker } from "@/pages/report-management/date-range-picker";
import { RecentSales } from "@/pages/report-management/recent-sales";
import { SalesChart } from "@/pages/report-management/sales-chart";
import { InventoryStatus } from "@/pages/report-management/inventory-status";
import { RevenueBarChart } from "@/pages/report-management/bar-chart";
import { ProfitBarChart } from "@/pages/report-management/profit-chart";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchSalesReport,
  fetchInventoryReport,
  fetchRevenueReport,
  fetchProfitReport,
  fetchRecentOrders,
} from "@/pages/report-management/reportService";

interface SalesData {
  date: string;
  totalSales: number;
  totalOrders: number;
}

interface RevenueData {
  month: string;
  revenue: number;
}

interface ProfitData {
  month: string;
  profit: number;
}

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
}

interface ReportData {
  dailySales: number;
  monthlySales: number;
  yearlySales: number;
  totalRevenue: number;
  totalProfit: number;
  monthlyProfit: number;
  pendingOrders: number;
  inventoryStatus: InventoryItem[];
  recentOrders: Order[];
  salesTrend: SalesData[];
  revenueTrend: RevenueData[];
  profitTrend: ProfitData[];
}

interface ApiInventoryItem {
  id: number;
  name: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface ApiOrder {
  id: number;
  customer?: { name: string };
  totalAmount: number;
  status: "Completed" | "Pending" | "Cancelled";
  createdAt: string;
}

interface ApiSalesData {
  date: string;
  totalSales: number | string;
  totalOrders: number | string;
}

interface DateRange {
  from: Date;
  to: Date;
}
function ReportManagement() {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { token, isLoading: authLoading, isAuthenticated } = useAuth();

  const [date, setDate] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      setError("Authentication required. Please login.");
      setLoading(false);
      return;
    }

    if (!token) return;

    const fetchReportData = async () => {
      try {
        setLoading(true);

        const [
          salesTrend,
          revenueTrend,
          profitTrend,
          inventoryData,
          recentOrders,
        ] = await Promise.all([
          fetchSalesReport(date, token),
          fetchRevenueReport(token),
          fetchProfitReport(token),
          fetchInventoryReport(token),
          fetchRecentOrders(token),
        ]);

        const dailySales =
          salesTrend.length > 0
            ? salesTrend[salesTrend.length - 1].totalSales
            : 0;

        const monthlySales =
          revenueTrend.length > 0
            ? revenueTrend[revenueTrend.length - 1].revenue
            : 0;

        const yearlySales = revenueTrend.reduce(
          (sum: number, item: RevenueData) => sum + item.revenue,
          0
        );

        const monthlyProfit =
          profitTrend.length > 0
            ? profitTrend[profitTrend.length - 1].profit
            : 0;

        const totalProfit = profitTrend.reduce(
          (sum: number, item: ProfitData) => sum + item.profit,
          0
        );

        const pendingOrders = recentOrders.filter(
          (order: ApiOrder) => order.status === "Pending"
        ).length;

        const transformedData: ReportData = {
          dailySales,
          monthlySales,
          yearlySales,
          totalRevenue: yearlySales,
          totalProfit,
          monthlyProfit,
          pendingOrders,
          inventoryStatus: inventoryData.statusCounts.map(
            (item: ApiInventoryItem) => ({
              id: item.id,
              name: item.name,
              sku: item.sku,
              currentStock: item.currentStock,
              lowStockThreshold: item.lowStockThreshold,
              status: item.status,
            })
          ),
          recentOrders: recentOrders.map((order: ApiOrder) => ({
            id: order.id,
            customerName: order.customer?.name || "Unknown Customer",
            totalAmount: order.totalAmount,
            status: order.status,
            date: order.createdAt,
          })),

          salesTrend: salesTrend.map((item: any) => ({
            date: item.date,
            totalSales: item.totalSales,
            totalOrders: item.totalOrders,
          })),
          revenueTrend: revenueTrend.map((item: RevenueData) => ({
            month: format(new Date(item.month), "MMM yyyy"),
            revenue: item.revenue,
          })),
          profitTrend: profitTrend.map((item: ProfitData) => ({
            month: format(new Date(item.month), "MMM yyyy"),
            profit: item.profit,
          })),
        };

        console.log('Transformed data:', transformedData);
        setReportData(transformedData);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setError("Failed to load report data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [date, token, authLoading, isAuthenticated]);
  //
  useEffect(() => {
    console.log("Report data:", reportData);
  }, [reportData]);
  //

  const calculateProfitChange = () => {
    if (
      !reportData ||
      !reportData.profitTrend ||
      reportData.profitTrend.length < 2
    ) {
      return "N/A";
    }

    const currentMonthProfit =
      reportData.profitTrend[reportData.profitTrend.length - 1].profit;
    const prevMonthProfit =
      reportData.profitTrend[reportData.profitTrend.length - 2].profit;
    const change =
      ((currentMonthProfit - prevMonthProfit) / prevMonthProfit) * 100;

    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}% from last month`;
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ea384c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-6 rounded-lg ${
            darkMode
              ? "bg-gray-800/50 border border-pink-900"
              : "bg-pink-50 border border-pink-100"
          } shadow-lg`}
        >
          <p className={darkMode ? "text-red-400" : "text-red-600"}>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant={darkMode ? "outline" : "default"}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'} shadow-lg`}>
          <p className={darkMode ? 'text-pink-400' : 'text-pink-600'}>
            No report data available. Please create some orders first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
        >
          Sales & Inventory Dashboard
        </h1>
        <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
          Monitor your business performance and inventory status
        </p>
      </div>

      <div
        className={`p-6 rounded-lg ${
          darkMode
            ? "bg-gray-800/50 border border-pink-900"
            : "bg-pink-50 border border-pink-100"
        }`}
      >
        <div className="mb-6 flex justify-end">
          <CalendarDateRangePicker
            date={date}
            setDate={setDate}
            darkMode={darkMode}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList
            className={`${
              darkMode
                ? "bg-gray-800 border border-pink-900"
                : "bg-white border border-pink-200"
            } p-1`}
          >
            <TabsTrigger
              value="overview"
              className={`${
                darkMode
                  ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
              }`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className={`${
                darkMode
                  ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
              }`}
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className={`${
                darkMode
                  ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
              }`}
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className={`${
                darkMode
                  ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ea384c] data-[state=active]:to-[#FF719A] data-[state=active]:text-white"
              }`}
            >
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className={`p-4 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                    : "bg-white border border-pink-200 hover:border-pink-300"
                } transition-all duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-pink-900/50" : "bg-pink-100"
                    }`}
                  >
                    <DollarSign
                      className={`h-5 w-5 ${
                        darkMode ? "text-pink-400" : "text-pink-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Revenue
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold font-['Kantumruy_Pro'] ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ${reportData.totalRevenue.toLocaleString()}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  All-time revenue
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                    : "bg-white border border-pink-200 hover:border-pink-300"
                } transition-all duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-pink-900/50" : "bg-pink-100"
                    }`}
                  >
                    <ShoppingCart
                      className={`h-5 w-5 ${
                        darkMode ? "text-pink-400" : "text-pink-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Today's Sales
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold font-['Kantumruy_Pro'] ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ${reportData.dailySales.toLocaleString()}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  +12% from yesterday
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                    : "bg-white border border-pink-200 hover:border-pink-300"
                } transition-all duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-pink-900/50" : "bg-pink-100"
                    }`}
                  >
                    <TrendingUp
                      className={`h-5 w-5 ${
                        darkMode ? "text-pink-400" : "text-pink-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Monthly Sales
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold font-['Kantumruy_Pro'] ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ${reportData.monthlySales.toLocaleString()}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  +8% from last month
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                    : "bg-white border border-pink-200 hover:border-pink-300"
                } transition-all duration-300 shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-pink-900/50" : "bg-pink-100"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${
                        darkMode ? "text-pink-400" : "text-pink-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Monthly Profit
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold font-['Kantumruy_Pro'] ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  ${reportData.monthlyProfit.toLocaleString()}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  {calculateProfitChange()}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <div
                className={`col-span-4 p-6 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900"
                    : "bg-white border border-pink-200"
                } shadow-sm`}
              >
                <h3
                  className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sales Overview
                </h3>
                <SalesChart data={reportData.salesTrend} darkMode={darkMode} />
              </div>

              <div
                className={`col-span-3 p-6 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900"
                    : "bg-white border border-pink-200"
                } shadow-sm`}
              >
                <h3
                  className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Recent Sales
                </h3>
                <RecentSales
                  orders={reportData.recentOrders}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className={`p-6 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900"
                    : "bg-white border border-pink-200"
                } shadow-sm`}
              >
                <h3
                  className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sales Trend
                </h3>
                <SalesChart data={reportData.salesTrend} darkMode={darkMode} />
              </div>

              <div
                className={`p-6 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900"
                    : "bg-white border border-pink-200"
                } shadow-sm`}
              >
                <h3
                  className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Revenue by Month
                </h3>
                <div className="h-[300px]">
                  <RevenueBarChart
                    data={reportData.revenueTrend}
                    darkMode={darkMode}
                  />
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border border-pink-900"
                    : "bg-white border border-pink-200"
                } shadow-sm`}
              >
                <h3
                  className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Profit by Month
                </h3>
                <div className="h-[300px]">
                  <ProfitBarChart
                    data={reportData.profitTrend}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border border-pink-900"
                  : "bg-white border border-pink-200"
              } shadow-sm`}
            >
              <h3
                className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Detailed Sales Report
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow
                      className={
                        darkMode ? "border-pink-900" : "border-pink-200"
                      }
                    >
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Date
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Orders
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Revenue
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Profit
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Avg. Order Value
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.salesTrend.map((day) => {
                      const profit = day.totalSales * 0.75;
                      const avgOrderValue = day.totalOrders > 0 ? day.totalSales / day.totalOrders : 0;
                      
                      return (
                        <TableRow
                          key={day.date}
                          className={
                            darkMode
                              ? "border-pink-900/50"
                              : "border-pink-200/50"
                          }
                        >
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {format(new Date(day.date), "MMM dd")}
                          </TableCell>
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {day.totalOrders}
                          </TableCell>
                          <TableCell
                            className={`font-bold ${
                              darkMode ? "text-pink-400" : "text-pink-600"
                            }`}
                          >
                            ${day.totalSales.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={`font-bold ${
                              darkMode ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            ${profit.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            ${(day.totalSales / day.totalOrders).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border border-pink-900"
                  : "bg-white border border-pink-200"
              } shadow-sm`}
            >
              <h3
                className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Inventory Status
              </h3>
              <InventoryStatus
                items={reportData.inventoryStatus}
                darkMode={darkMode}
              />
            </div>

            <div
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border border-pink-900"
                  : "bg-white border border-pink-200"
              } shadow-sm`}
            >
              <h3
                className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Low Stock Items
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow
                      className={
                        darkMode ? "border-pink-900" : "border-pink-200"
                      }
                    >
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Product
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        SKU
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Current Stock
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Threshold
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.inventoryStatus
                      .filter((item) => item.status === "Low Stock")
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          className={
                            darkMode
                              ? "border-pink-900/50"
                              : "border-pink-200/50"
                          }
                        >
                          <TableCell
                            className={`font-medium ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {item.name}
                          </TableCell>
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {item.sku}
                          </TableCell>
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {item.currentStock}
                          </TableCell>
                          <TableCell
                            className={
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {item.lowStockThreshold}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'Out of Stock'
                                ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                                : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800'
                            }`}>
                              {item.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border border-pink-900"
                  : "bg-white border border-pink-200"
              } shadow-sm`}
            >
              <h3
                className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow
                      className={
                        darkMode ? "border-pink-900" : "border-pink-200"
                      }
                    >
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Order ID
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Customer
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Date
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Amount
                      </TableHead>
                      <TableHead
                        className={`font-['Kantumruy_Pro'] ${
                          darkMode ? "text-pink-300" : "text-pink-700"
                        }`}
                      >
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.recentOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className={
                          darkMode ? "border-pink-900/50" : "border-pink-200/50"
                        }
                      >
                        <TableCell
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          #{order.id}
                        </TableCell>
                        <TableCell
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          {order.customerName}
                        </TableCell>
                        <TableCell
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          {format(new Date(order.date), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell
                          className={`font-bold ${
                            darkMode ? "text-pink-400" : "text-pink-600"
                          }`}
                        >
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Completed"
                                ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                                : order.status === "Pending"
                                ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                                : "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ReportManagement;
