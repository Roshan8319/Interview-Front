import React, { useState, useEffect } from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

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

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 2000; year--) {
    years.push(year);
  }

  const [filteredData, setFilteredData] = useState(data);
  const [isDataRangeEntered, setIsDataRangeEntered] = useState(false);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/'); return `${year}/${month}/${day}`;
  };

  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const [selectedMonth2, setSelectedMonth2] = useState(new Date().getMonth() + 1);
  const [selectedDay2, setSelectedDay2] = useState(new Date().getDate());
  const [days2, setDays2] = useState([]);
  useEffect(() => {
    const days2InMonth = new Date(selectedYear2, selectedMonth2, 0).getDate();
    const days2Array = Array.from({ length: days2InMonth }, (_, i) => i + 1); setDays2(days2Array);
  }
    , [selectedYear2, selectedMonth2]);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [days, setDays] = useState([]);
  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1); setDays(daysArray);
  }
    , [selectedYear, selectedMonth]);

  const filterDataByDate = () => {
    const startDate = new Date(`${selectedYear}/${selectedMonth}/${selectedDay}`);
    const endDate = new Date(`${selectedYear2}/${selectedMonth2}/${selectedDay2}`);

    if (!startDate || !endDate) {
      setFilteredData(data);
      return;
    }
    if (startDate > endDate) {
      alert("Please mention date in the correct order!!")
    } else {
      const filtered = data.filter(item => {
        const date = new Date(parseDate(item.Date));
        return date >= startDate && date <= endDate;
      });
      setFilteredData(filtered);
      setIsDataRangeEntered(true);
    }
  };

  const stats = {
    currentDues: 50000,
    totalPaid: 150000,
    pendingPayments: 25000,
    totalInterviews: 45
  };

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
        <div className="flex items-center gap-2 relative w-[20%]">
          <div className='relative w-full'>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 appearance-none cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={month} value={index + 1}>{month}</option>
              ))}

            </select>
            {/* vector */}
            <div className='absolute right-[15%] translate-y-[-24px]'>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" stroke-width="1.5" />
              </svg>
            </div>
          </div>
          <div className='relative w-full'>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 appearance-none cursor-pointer"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {/* vector */}
            <div className='absolute right-[15%] translate-y-[-24px]'>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <button
          onClick={filterDataByDate}
          className="px-4 py-2 bg-[#E65F2B] flex justify-center items-center text-white font-semibold text-[16px] rounded-3xl hover:bg-[#d44d1b] transition-colors"
        >
          <div className='flex items-center justify-center mr-2'>
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 3H14.25L10.5 7.875V15L7.5 12V7.875L3.75 3Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          Apply Filter
        </button>
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
            {filteredData.map((data, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-[#E65F2B]">{data.Candidate}</td>
                <td className="py-4 px-6 text-gray-600">{data.Role}</td>
                <td className="py-4 px-6 text-gray-600">{data.Experience}</td>
                <td className="py-4 px-6 text-gray-600">{data.Date}</td>
                <td className="py-4 px-6 font-medium text-gray-600">₹{data.Amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Finance;
