/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  BarChart3,
  FileText,
  ShoppingCart,
  Truck,
  ClipboardList,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Database,
  Activity,
  Plus
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const mockData = {
  stats: {
    quotations: { count: 145, change: 12, trending: 'up' },
    jobCards: { count: 89, change: 8, trending: 'up' },
    deliveryNotes: { count: 67, change: -3, trending: 'down' },
    invoices: { count: 52, change: 15, trending: 'up' }
  },
  chartData: {
    // Yearly business data in Lakhs (₹)
    monthly: [45, 52, 38, 67, 58, 75, 82, 69],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',]
  },
recentQuotations: [
  { id: 'QUO-001', customer: 'Emirates Engineering LLC', status: 'Pending', total: 'AED 48,000', date: '2025-08-21' },
  { id: 'QUO-002', customer: 'Al Futtaim Group', status: 'Approved', total: 'AED 72,500', date: '2025-08-20' },
  { id: 'QUO-003', customer: 'Dubai Investments PJSC', status: 'Draft', total: 'AED 36,200', date: '2025-08-19' },
  { id: 'QUO-004', customer: 'Nakheel Properties', status: 'Approved', total: 'AED 91,800', date: '2025-08-18' },
  { id: 'QUO-005', customer: 'DP World Logistics', status: 'Pending', total: 'AED 58,600', date: '2025-08-17' },
  { id: 'QUO-006', customer: 'Etihad Rail', status: 'Approved', total: 'AED 120,000', date: '2025-08-16' },
  { id: 'QUO-007', customer: 'Dubai Municipality', status: 'Draft', total: 'AED 27,450', date: '2025-08-15' },
  { id: 'QUO-008', customer: 'Majid Al Futtaim Retail', status: 'Approved', total: 'AED 64,300', date: '2025-08-14' },
  { id: 'QUO-009', customer: 'ENOC (Emirates National Oil Company)', status: 'Pending', total: 'AED 83,900', date: '2025-08-13' },
  { id: 'QUO-010', customer: 'DAMAC Properties', status: 'Approved', total: 'AED 152,700', date: '2025-08-12' },
]

};


const StatCard = ({ title, value, change, trending, icon: Icon, color }) => (
  <div className="bg-white  rounded-sm   border border-gray-200 p-6 ">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>

    </div>
  </div>
);

// ChartComponent with yearly business data
const ChartComponent = ({ data, labels, title }) => {
  return (
    <div className="bg-white rounded-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <select className="text-sm border border-gray-300 rounded-sm px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#0477BF]">
          <option>2025-2026</option>
          <option>2024-2025</option>
          <option>2023-2024</option>
        </select>
      </div>

      {/* Yearly business chart */}
      <div className="space-y-4">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center">
            <div className="w-16 text-sm text-gray-600 font-medium">{label}</div>
            <div className="flex-1 ml-4">
              <div className="bg-gray-100 rounded-full h-8 flex items-center relative">
                <div
                  className="bg-gradient-to-r from-[#0477BF] to-[#0477BF] h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500 ease-out"
                  style={{ width: `${(data[index] / Math.max(...data)) * 100}%` }}
                >
                  <span className="text-xs font-semibold text-white">
                    ₹{data[index]}L
                  </span>
                </div>
                {/* Hover tooltip */}
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
                  {((data[index] / Math.max(...data)) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-20 text-right">
              <span className="text-sm font-medium text-gray-700">₹{data[index]}L</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-sm font-semibold text-gray-900">
              ₹{data.reduce((sum, val) => sum + val, 0)}L
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg/Month</p>
            <p className="text-sm font-semibold text-gray-900">
              ₹{(data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(1)}L
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Best Month</p>
            <p className="text-sm font-semibold text-[#0477BF]">
              {labels[data.indexOf(Math.max(...data))]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentQuotationsTable = ({ quotations }) => {
   const [search, setSearch] = useState("");

  // filter quotations based on search input
  const filteredQuotations = quotations.filter((q) =>
    [q.id, q.customer, q.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  
  return(
  <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
    {/* Header */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Quotations
        </h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 text-sm border w-75 border-gray-300 rounded-sm outline-0"
        />
      </div>


    {/* Table */}
    <div className="overflow-x-auto">
        <table className="min-w-full text-xs divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Quotation ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Created Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredQuotations.length > 0 ? (
              filteredQuotations.map((quotation) => (
                <tr
                  key={quotation.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                    {quotation.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                    {quotation.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-sm ${
                        quotation.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : quotation.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-[#0477BF]"
                      }`}
                    >
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                    {quotation.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {quotation.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    {/* Footer */}
    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <button className="text-sm font-medium text-[#0477BF] hover:text-[#035a90] transition-colors duration-150">
        View all quotations →
      </button>
    </div>
  </div>
)};

// const QuickActions = () => (

// );

function Overview() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      weekday: "long", // Wednesday
      year: "numeric", // 2025
      month: "long",   // August
      day: "numeric",  // 20
    });
    setCurrentDate(formatted);
  }, []);

  useEffect(() => {
    // Simulate API call
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
      setData(mockData);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-50">
        <div
          class="w-10 h-10 border-4 border-t-[#0477BF] border-gray-300 rounded-full animate-spin"
        ></div>

      </div>
    );
  }

  return (
    <div className="min-h-scree">
      {/* Header */}
      <div className="">
        <div className="">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
              <p className="text-gray-600 mt-1">Welcome back Pradeep, Here's what's happening with your business.</p>
            </div>
             <div className="flex items-center text-sm text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-sm ">
              <Calendar className="w-4 h-4 mr-2" />
              {currentDate}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Quotations Created"
            value={data.stats.quotations.count}
            change={data.stats.quotations.change}
            trending={data.stats.quotations.trending}
            icon={FileText}
            color="bg-[#0477BF]"
          />
          <StatCard
            title="Job Cards Created"
            value={data.stats.jobCards.count}
            change={data.stats.jobCards.change}
            trending={data.stats.jobCards.trending}
            icon={ClipboardList}
            color="bg-green-500"
          />
          <StatCard
            title="Delivery Notes"
            value={data.stats.deliveryNotes.count}
            change={data.stats.deliveryNotes.change}
            trending={data.stats.deliveryNotes.trending}
            icon={Truck}
            color="bg-purple-500"
          />
          <StatCard
            title="Invoices Generated"
            value={data.stats.invoices.count}
            change={data.stats.invoices.change}
            trending={data.stats.invoices.trending}
            icon={DollarSign}
            color="bg-orange-500"
          />
        </div>

        {/* Charts and Quick Actions Row */}
        <div className="flex-1 mb-4">
          {/* <div className="lg:col-span-2">
            <ChartComponent
              data={data.chartData.monthly}
              labels={data.chartData.labels}
              title="Yearly Business Overview"
            />
          </div> */}
          <div>
            <div className="bg-white  rounded-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-5">
                <button onClick={() => navigate("/dashboard/quotation/create-new-quotation")} className="flex flex-col items-start p-4 cursor-pointer bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150 group">
                  <FileText className="h-8 w-8 text-[#0477BF] group-hover:text-blue-700" strokeWidth={1.5} />
                  <div className="ml-1 mt-3 text-left">
                    <p className="text-sm font-normal text-gray-900">New Quotation</p>
                    <p className="text-xs text-gray-400 font-normal">Create new quotation</p>
                  </div>
                </button>

                <button className="flex flex-col items-start p-4 cursor-pointer bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-150 group">
                  <ClipboardList className="h-8 w-8 text-green-600 group-hover:text-green-700" strokeWidth={1.5} />
                  <div className="ml-1 mt-3 text-left">
                    <p className="text-sm font-medium text-gray-900">Job Card</p>
                    <p className="text-xs text-gray-400 font-normal">Create job number</p>
                  </div>
                </button>

                <button className="flex flex-col items-start p-4 cursor-pointer bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-150 group">
                  <Truck className="h-8 w-8 text-purple-600 group-hover:text-purple-700" strokeWidth={1.5} />
                  <div className="ml-1 mt-3 text-left">
                    <p className="text-sm font-medium text-gray-900">Delivery Note</p>
                    <p className="text-xs text-gray-400  font-normal">Generate delivery</p>
                  </div>
                </button>

                <button className="flex flex-col items-start p-4 cursor-pointer bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-150 group">
                  <DollarSign className="h-8 w-8 text-orange-600 group-hover:text-orange-700" strokeWidth={1.5} />
                  <div className="ml-1 mt-3 text-left">
                    <p className="text-sm font-medium text-gray-900">Invoice</p>
                    <p className="text-xs text-gray-400  font-normal">Create invoice</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mb-8">
          <RecentQuotationsTable quotations={data.recentQuotations} />
        </div>


      </div>
    </div>
  );
}

export default Overview