import React from 'react';
import ApexCharts from 'react-apexcharts';
import websiteAnalysisImage from '../img/Vw.png';
import { FaDollarSign, FaChartPie, FaPaypal } from 'react-icons/fa';
import Layout from './layout/layoutside';

const Dashboard: React.FC = () => {
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 240,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
    grid: {
      borderColor: '#dddddd',
      strokeDashArray: 5,
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
    colors: ['#020617'],
  };

  const barChartSeries = [
    {
      name: 'Sales',
      data: [20, 30, 40, 35, 50, 60, 70],
    },
  ];

  const totalSales = barChartSeries[0].data.reduce((acc, value) => acc + value, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <div>
          <h5 className="text-lg font-semibold">Earning Reports</h5>
          <small className="text-gray-500">Weekly Earnings Overview</small>
        </div>
        <div className="relative">
          <div
            className="dropdown-menu absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg hidden"
            aria-labelledby="earningReportsId"
          >
            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">View More</a>
            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Delete</a>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-end mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="text-2xl font-bold mr-2">${totalSales.toFixed(2)}</h1>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">+4.2%</span>
          </div>
          <small className="text-gray-500">This week's earnings compared to last week</small>
        </div>
        <div id="weeklyEarningReports" className="relative min-h-[199px] mb-4">
          <ApexCharts
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={240}
          />
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  <FaDollarSign className="text-xl" />
                </div>
                <h6 className="text-sm font-semibold">Earnings</h6>
              </div>
              <h4 className="text-xl font-bold mb-2">$545.69</h4>
              <div className="relative h-1 bg-gray-200 rounded">
                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  <FaChartPie className="text-xl" />
                </div>
                <h6 className="text-sm font-semibold">Profit</h6>
              </div>
              <h4 className="text-xl font-bold mb-2">$256.34</h4>
              <div className="relative h-1 bg-gray-200 rounded">
                <div className="absolute top-0 left-0 h-full bg-blue-400 rounded" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  <FaPaypal className="text-xl" />
                </div>
                <h6 className="text-sm font-semibold">Expense</h6>
              </div>
              <h4 className="text-xl font-bold mb-2">$74.19</h4>
              <div className="relative h-1 bg-gray-200 rounded">
                <div className="absolute top-0 left-0 h-full bg-red-500 rounded" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WebsiteAnalytics: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg ml-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h5 className="text-2xl font-semibold">การวิเคราะห์เว็บไซต์</h5>
        <small className="text-gray-400">อัตราการแปลงรวม 28.5%</small>
      </div>

      <div className="text-center mb-6">
        <img
          src={websiteAnalysisImage}
          alt="การวิเคราะห์เว็บไซต์"
          className="mx-auto rounded-lg w-3/4 max-w-md"
          style={{ maxHeight: '350px' }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="bg-gray-600 text-white p-3 rounded-full mr-3">28%</span>
              <p>เซสชัน</p>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-600 text-white p-3 rounded-full mr-3">1.2</span>
              <p>ลูกค้าเป้าหมาย</p>
            </li>
          </ul>
        </div>
        <div className="p-4 rounded-lg shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="bg-gray-600 text-white p-3 rounded-full mr-3">3.1</span>
              <p>การดูหน้าเว็บ</p>
            </li>
            <li className="flex items-center">
              <span className="bg-gray-600 text-white p-3 rounded-full mr-3">12%</span>
              <p>แปลง</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MainDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <Dashboard />
        </div>
        <div className="flex-1">
          <WebsiteAnalytics />
        </div>
      </div>
    </Layout>
  );
};

export default MainDashboard;
