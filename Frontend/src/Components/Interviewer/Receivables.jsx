import React, { useState } from 'react'

function Receivables() {

  const data = [
    {
      "Candidate": "Aryan Gupta",
      "Role": "SDE I",
      "Experience": "2.5 Years",
      "Date": "05/08/2024",
      "Amount": 1100.00
    },
    {
      "Candidate": "Meera Nair",
      "Role": "SDE II",
      "Experience": "3.2 Years",
      "Date": "15/09/2024",
      "Amount": 1250.00
    },
    {
      "Candidate": "Vikram Malhotra",
      "Role": "Tech Lead",
      "Experience": "6.0 Years",
      "Date": "10/10/2024",
      "Amount": 2000.00
    },
    {
      "Candidate": "Simran Kaur",
      "Role": "SDE III",
      "Experience": "5.5 Years",
      "Date": "20/10/2024",
      "Amount": 1800.00
    },
    {
      "Candidate": "Rahul Das",
      "Role": "Senior Developer",
      "Experience": "4.8 Years",
      "Date": "28/11/2024",
      "Amount": 1400.00
    },
    {
      "Candidate": "Ishaan Mishra",
      "Role": "SDE II",
      "Experience": "4.2 Years",
      "Date": "12/12/2024",
      "Amount": 1350.00
    },
    {
      "Candidate": "Tanya Agarwal",
      "Role": "Frontend Developer",
      "Experience": "3.5 Years",
      "Date": "20/12/2024",
      "Amount": 1200.00
    }
  ];

  const [filteredData, setFilteredData] = useState(data);
  const [isDataRangeEntered, setIsDataRangeEntered] = useState(false);



  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-8'>
      <div className='w-full '>
        <div className='w-full flex font-semibold text-[20px]'>
          <div className='w-[50%]'>
            <h1>Current Receivables: <span className='text-[#E65F2B]'>₹10,100</span></h1>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden mt-8">
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
    </div>
  )
}

export default Receivables