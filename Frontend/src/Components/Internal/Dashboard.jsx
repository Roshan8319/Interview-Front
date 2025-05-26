import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  CardDescription,
  CardTitle,
} from "@/Components/Ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";

function Dashboard() {
  const interviewerData = [
    { name: 'Pending Acceptance', value: 12, color: '#E65F2B' },
    { name: 'Interview Decline', value: 8, color: '#EF4444' },
    { name: 'Recommended', value: 25, color: '#10B981' },
    { name: 'Rejected', value: 6, color: '#F59E0B' },
    { name: 'Strong Candidates', value: 10, color: '#3B82F6' },
    { name: 'Scheduled', value: 34, color: '#8B5CF6' },
  ];

  const clientData = [
    { name: 'Active Clients', value: 12 },
    { name: 'Passive Clients', value: 8 },
    { name: 'Pending Onboardings', value: 25 },
  ];

  const areaChartData = [
    { month: 'Jan', interviews: 42, candidates: 28, jobs: 32 },
    { month: 'Feb', interviews: 38, candidates: 30, jobs: 35 },
    { month: 'Mar', interviews: 45, candidates: 33, jobs: 40 },
    { month: 'Apr', interviews: 50, candidates: 36, jobs: 38 },
    { month: 'May', interviews: 48, candidates: 34, jobs: 42 },
    { month: 'Jun', interviews: 55, candidates: 40, jobs: 50 },
    { month: 'Jul', interviews: 60, candidates: 43, jobs: 52 },
    { month: 'Aug', interviews: 58, candidates: 41, jobs: 49 },
    { month: 'Sep', interviews: 52, candidates: 39, jobs: 47 },
    { month: 'Oct', interviews: 47, candidates: 35, jobs: 44 },
    { month: 'Nov', interviews: 40, candidates: 32, jobs: 36 },
    { month: 'Dec', interviews: 35, candidates: 28, jobs: 30 },
  ];


  return (
    <div className='min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-2 sm:p-4 md:p-6'>
      <div className="flex flex-col w-full gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-0 mb-4 sm:mb-0">
        {/* First Row - Two Columns (one column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Interviewers Section */}
          <div className="bg-[#ffffff57] rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    Interviewers
                    <span className="text-white text-xs sm:text-sm font-normal bg-[#E65F2B] ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {interviewerData.reduce((acc, curr) => acc + curr.value, 0)}
                    </span>
                  </CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-gray-500 flex items-center">
                  More than last month
                  <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1 text-green-600" />
                </CardDescription>
              </div>
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
                +12.5%
                <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
              </span>
            </div>
            <div className="h-[200px] sm:h-[220px] md:h-[250px] mt-2 sm:mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interviewerData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {interviewerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm font-regular">{payload[0].name}</p>
                            <p className="text-sm font-medium">{payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clients Section */}
          <div className="bg-[#ffffff57] rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Clients</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-gray-500 flex items-center">
                  New clients onboarded last quarter
                  <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1 text-green-600" />
                </CardDescription>
              </div>
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
                +6.5%
                <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
              </span>
            </div>
            <div className="h-[200px] sm:h-[220px] md:h-[250px] mt-2 sm:mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} sm:fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} width={30} sm:width={40} fontSize={10} sm:fontSize={12} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm font-regular">{label}</p>
                            <p className="text-sm font-medium">{payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{
                      fill: '#F3F4F6',
                      opacity: 0.2,
                      strokeWidth: 0,
                      width: 30
                    }}
                  />
                  <Bar dataKey="value" fill="#E65F2B" radius={[4, 4, 0, 0]} barSize={40} sm:barSize={50} md:barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row - Full Width */}
        <div className="bg-[#ffffff57] rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Details Overview</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm text-gray-500 flex items-center">
                Snapshot of platform activity
                <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3 ml-1 text-red-600" />
              </CardDescription>
            </div>
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-red-600 bg-red-50">
              +9.3%
              <TrendingDown className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
            </span>
          </div>
          <div className="h-[200px] sm:h-[220px] md:h-[250px] mt-2 sm:mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E65F2B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E65F2B" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  width={30}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
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
                  }}
                  cursor={{ stroke: '#E65F2B', strokeWidth: 0 }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stackId="1"
                  stroke="#E65F2B"
                  fill="url(#colorInterviews)"
                  name="Interviews"
                />
                <Area
                  type="monotone"
                  dataKey="candidates"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#colorCandidates)"
                  name="Candidates"
                />
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="url(#colorJobs)"
                  name="Jobs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard as InternalDashboard };