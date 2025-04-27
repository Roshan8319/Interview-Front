import React, { useState, useEffect } from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

function Finance() {
  const data = [
    {
      "Candidate": "Rohan Sharma",
      "Role": "SDE II",
      "Experience": "4.5 Years",
      "Date": "12/08/2024",
      "Amount": 1500.00
    },
    {
      "Candidate": "Priya Verma",
      "Role": "SDE II",
      "Experience": "3.8 Years",
      "Date": "25/09/2024",
      "Amount": 1400.00
    },
    {
      "Candidate": "Aarav Kapoor",
      "Role": "SDE II",
      "Experience": "5.2 Years",
      "Date": "30/09/2024",
      "Amount": 1600.00
    },
    {
      "Candidate": "Ishita Singh",
      "Role": "SDE II",
      "Experience": "4.0 Years",
      "Date": "07/10/2024",
      "Amount": 1350.00
    },
    {
      "Candidate": "Kabir Mehta",
      "Role": "SDE II",
      "Experience": "4.3 Years",
      "Date": "22/10/2024",
      "Amount": 1450.00
    },
    {
      "Candidate": "Ananya Roy",
      "Role": "SDE II",
      "Experience": "4.1 Years",
      "Date": "10/11/2024",
      "Amount": 1300.00
    },
    {
      "Candidate": "Devansh Patel",
      "Role": "SDE II",
      "Experience": "4.7 Years",
      "Date": "07/12/2024",
      "Amount": 1550.00
    }
  ];

  const stats = {
    currentDues: 50000,
    totalPaid: 150000,
    pendingPayments: 25000,
    totalInterviews: 45
  };

  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
  };

  const filterDataByDate = () => {
    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0);

    const filtered = data.filter(item => {
      const itemDate = parseDate(item.Date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(filtered);

    if (filtered.length === 0) {
      toast('No records found for ' + months[selectedMonth - 1] + ' ' + selectedYear, {
        icon: '📋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.success(`Showing ${filtered.length} records for ${months[selectedMonth - 1]} ${selectedYear}`);
    }
  };

  const clearFilter = () => {
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
    setFilteredData(data);
    toast.success('Showing all records');
  };

  useEffect(() => {
    setFilteredData(data);
    setLoading(false);
  }, []);

  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6 text-[14px]'>
      {/* Stats Cards */}
      <div className="w-full grid grid-cols-4 gap-5 mb-8">
        <div className="p-4 flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#E65F2B]/20">
          <div className="flex flex-col justify-between">
            <span className="text-sm text-black/60 font-medium mb-2">Current Dues</span>
            <span className="text-[24px] font-bold text-[#E65F2B]">
              ₹{stats.currentDues.toLocaleString()}
            </span>
          </div>
          <div className="p-2 rounded-full bg-[#E65F2B]/10 group-hover:bg-[#E65F2B]/20 transition-colors">
            <IndianRupee className="w-5 h-5 text-[#E65F2B]" />
          </div>
        </div>

        <div className="p-4 flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#2EAC34]/20">
          <div className="flex flex-col justify-between">
            <span className="text-sm text-black/60 font-medium mb-2">Total Paid</span>
            <span className="text-[24px] font-bold text-[#2EAC34]">
              ₹{stats.totalPaid.toLocaleString()}
            </span>
          </div>
          <div className="p-2 rounded-full bg-[#2EAC34]/10 group-hover:bg-[#2EAC34]/20 transition-colors">
            <ArrowUpRight className="w-5 h-5 text-[#2EAC34]" />
          </div>
        </div>

        <div className="p-4 flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#f1a028]/20">
          <div className="flex flex-col justify-between">
            <span className="text-sm text-black/60 font-medium mb-2">Pending</span>
            <span className="text-[24px] font-bold text-[#f1a028]">
              ₹{stats.pendingPayments.toLocaleString()}
            </span>
          </div>
          <div className="p-2 rounded-full bg-[#f1a028]/10 group-hover:bg-[#f1a028]/20 transition-colors">
            <ArrowDownRight className="w-5 h-5 text-[#f1a028]" />
          </div>
        </div>

        <div className="p-4 flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#6366F1]/20">
          <div className="flex flex-col justify-between">
            <span className="text-sm text-black/60 font-medium mb-2">Total Interviews</span>
            <span className="text-[24px] font-bold text-[#6366F1]">
              {stats.totalInterviews}
            </span>
          </div>
          <div className="p-2 rounded-full bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 transition-colors">
            <Calendar className="w-5 h-5 text-[#6366F1]" />
          </div>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-lg">
        <div className="flex items-center gap-2 relative">
          <div className='relative w-full'>
            <div className='relative'>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(parseInt(e.target.value));
                }}
                className="w-[140px] py-2 px-4 pr-10 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 appearance-none cursor-pointer"
              >
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <div className='absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className='relative w-full'>
            <div className='relative'>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(parseInt(e.target.value));
                }}
                className="w-[100px] py-2 px-4 pr-10 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 appearance-none cursor-pointer"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className='absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={filterDataByDate}
            className="px-4 py-2 bg-[#E65F2B] flex justify-center items-center text-white font-semibold text-[16px] rounded-3xl hover:bg-[#d44d1b] transition-colors"
          >
            <div className='flex items-center justify-center mr-2'>
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 3H14.25L10.5 7.875V15L7.5 12V7.875L3.75 3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Apply Filter
          </button>
          <button
            onClick={clearFilter}
            className="px-4 py-2 flex justify-center items-center text-red-500 font-semibold text-[16px] hover:text-red-700 transition-colors"
          >
            <div className='flex items-center justify-center mr-2'>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
              </svg>
            </div>
            Clear Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#E65F2B]/20">
              <th className="py-4 px-6 font-bold text-[#E65F2B]">Candidate</th>
              <th className="py-4 px-6 font-bold text-[#E65F2B]">Role</th>
              <th className="py-4 px-6 font-bold text-[#E65F2B]">Experience</th>
              <th className="py-4 px-6 font-bold text-[#E65F2B]">Date</th>
              <th className="py-4 px-6 font-bold text-[#E65F2B]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-md text-[#797979]">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#E65F2B]">{data.Candidate}</td>
                  <td className="py-4 px-6 text-gray-600">{data.Role}</td>
                  <td className="py-4 px-6 text-gray-600">{data.Experience}</td>
                  <td className="py-4 px-6 text-gray-600">{data.Date}</td>
                  <td className="py-4 px-6 font-medium text-gray-600">₹{data.Amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-md text-[#797979] bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-gray-400"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <p className="text-gray-500 font-medium">No Data Available</p>
                    <p className="text-gray-400 text-sm">
                      Try selecting a different month or year
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Finance;
