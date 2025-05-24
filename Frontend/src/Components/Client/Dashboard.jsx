import React from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/Ui/Card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart, Bar, Legend } from 'recharts';

function Dashboard() {
  const metricsData = [
    {
      title: "Total Interviews",
      value: "14",
      trend: "+8.7%",
      trending: "up",
      subtitle: "More than last month",
      description: "Last 6 months"
    },
    {
      title: "Pending Interviews",
      value: "5",
      trend: "-16.4%",
      trending: "down",
      subtitle: "Fewer pending now",
      description: "Needs scheduling"
    },
    {
      title: "Recommended",
      value: "7",
      trend: "+22%",
      trending: "up",
      subtitle: "Higher quality pool",
      description: "Strong candidates"
    },
    {
      title: "Offers Accepted",
      value: "3",
      trend: "+5.2%",
      trending: "up",
      subtitle: "Better conversions",
      description: "Positive outcomes"
    }
  ];

  const chartData = [
    { role: 'SDE I', visitors: 20 },
    { role: 'SDE II', visitors: 8 },
    { role: 'SDE III', visitors: 25 },
    { role: 'EM', visitors: 10 },
    { role: 'SDET I', visitors: 34 },
    { role: 'SDE II', visitors: 18 },
  ];

  const analyticsData = [
    {
      name: 'Jan',
      interviews: 95,
      selected: 42,
      rejected: 38,
    },
    {
      name: 'Feb',
      interviews: 110,
      selected: 51,
      rejected: 47,
    },
    {
      name: 'Mar',
      interviews: 130,
      selected: 65,
      rejected: 55,
    },
    {
      name: 'Apr',
      interviews: 120,
      selected: 58,
      rejected: 52,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-100 text-sm">
          <p className="font-regular text-gray-600">{`${label}`}</p>
          <p className="text-[#E65F2B] font-medium">
            {`Tasks: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const BarChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
          <p className="font-medium text-gray-600 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-2 md:p-4'>
      {/* Metrics Cards Row */}
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 p-2 md:p-4 mt-2'>
        {metricsData.map((metric, index) => (
          <Card key={index} className="bg-[#F2EAE5] rounded-xl shadow-sm">
            <CardHeader className="pb-1 md:pb-2 px-2 md:px-4 pt-2 md:pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-500 text-[11px] xs:text-xs sm:text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <span className={`inline-flex items-center px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] xs:text-xs font-medium ${metric.trending === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                  }`}>
                  {metric.trend}
                  {metric.trending === 'up' ?
                    <TrendingUp className="h-2.5 w-2.5 ml-0.5 sm:h-3 sm:w-3 sm:ml-1" /> :
                    <TrendingDown className="h-2.5 w-2.5 ml-0.5 sm:h-3 sm:w-3 sm:ml-1" />
                  }
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-2 md:px-4 py-1 md:py-2 pb-2 md:pb-4">
              <div className="text-lg xs:text-xl sm:text-2xl font-bold mb-0.5 md:mb-1">
                {metric.value}
              </div>
              <div className="flex items-center text-[10px] xs:text-xs sm:text-sm font-medium">
                {metric.subtitle}
                {metric.trending === 'up' ?
                  <TrendingUp className="h-2.5 w-2.5 ml-0.5 sm:h-3 sm:w-3 sm:ml-1" /> :
                  <TrendingDown className="h-2.5 w-2.5 ml-0.5 sm:h-3 sm:w-3 sm:ml-1" />
                }
              </div>
              <CardDescription className="text-[10px] xs:text-xs sm:text-sm text-gray-500 mt-0.5 md:mt-1">
                {metric.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-2 md:p-4">
        {/* First Column - Area Chart */}
        <Card className="bg-[#F2EAE5] rounded-xl shadow-sm p-0 md:p-2">
          <CardHeader className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-semibold text-gray-800">
                  Total Pending Tasks
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Total for the last 3 months
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-0 pb-2">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 0, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorVisitors1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E65F2B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#E65F2B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="role"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    padding={{ left: 5, right: 5 }}
                    interval={0}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    width={25}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#E65F2B', strokeWidth: 0 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#E65F2B"
                    fillOpacity={1}
                    fill="url(#colorVisitors1)"
                    baseLine={8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Second Column - Bar Chart */}
        <Card className="bg-[#F2EAE5] rounded-xl shadow-sm p-0 md:p-2">
          <CardHeader className="px-3 py-2">
            <div>
              <CardTitle className="text-lg md:text-xl font-semibold text-gray-800">
                Analytics Overview
              </CardTitle>
              <CardDescription className="text-gray-500">
                Monthly Interview Statistics
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-0 pb-2">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{ top: 5, right: 0, left: 15, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    width={25}
                  />
                  <Tooltip content={<BarChartTooltip />}
                    cursor={{
                      fill: '#F3F4F6',
                      opacity: 0.2,
                      strokeWidth: 0,
                      width: 25
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px' }}
                    iconType="circle"
                    iconSize={8}
                    height={25}
                  />
                  <Bar
                    dataKey="interviews"
                    stackId="a"
                    fill="#E65F2B"
                    radius={[0, 0, 0, 0]}
                    name="Total Interviews"
                    barSize={45}
                  />
                  <Bar
                    dataKey="selected"
                    stackId="a"
                    fill="#10B981"
                    radius={[0, 0, 0, 0]}
                    name="Selected"
                    barSize={45}
                  />
                  <Bar
                    dataKey="rejected"
                    stackId="a"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                    name="Rejected"
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;