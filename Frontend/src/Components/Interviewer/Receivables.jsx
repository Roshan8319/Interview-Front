import React, { useState } from 'react'

function Receivables() {
  const data = [
    {
      "Candidate": "Aryan Gupta",
      "Role": "Backend Engineer",
      "Experience": "3.5 Years",
      "Date": "15/05/2025",
      "Amount": 3500.00
    },
    {
      "Candidate": "Meera Nair",
      "Role": "Full Stack Developer",
      "Experience": "4.2 Years",
      "Date": "03/05/2025",
      "Amount": 4200.00
    },
    {
      "Candidate": "Vikram Malhotra",
      "Role": "Engineering Manager",
      "Experience": "7.5 Years",
      "Date": "28/04/2025",
      "Amount": 6500.00
    },
    {
      "Candidate": "Simran Kaur",
      "Role": "Data Scientist",
      "Experience": "5.8 Years",
      "Date": "22/04/2025",
      "Amount": 5000.00
    },
    {
      "Candidate": "Rahul Das",
      "Role": "DevOps Engineer",
      "Experience": "4.5 Years",
      "Date": "18/04/2025",
      "Amount": 4800.00
    },
    {
      "Candidate": "Ishaan Mishra",
      "Role": "Frontend Specialist",
      "Experience": "3.8 Years",
      "Date": "12/04/2025",
      "Amount": 3800.00
    },
    {
      "Candidate": "Tanya Agarwal",
      "Role": "UX Engineer",
      "Experience": "4.2 Years",
      "Date": "05/04/2025",
      "Amount": 4200.00
    }
  ];

  const [filteredData, setFilteredData] = useState(data);
  const [isDataRangeEntered, setIsDataRangeEntered] = useState(false);
  
  // Calculate total receivables from the filtered data
  const totalReceivables = filteredData.reduce((sum, item) => sum + item.Amount, 0);

  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-4 sm:p-6 md:p-8'>
      <div className='w-full'>
        <div className='w-full flex font-semibold text-[16px] sm:text-[18px] md:text-[20px]'>
          <div className='w-full sm:w-[75%] md:w-[50%] mt-4 sm:mt-0'>
            <h1>Current Receivables: <span className='text-[#E65F2B]'>₹{totalReceivables.toLocaleString()}</span></h1>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden mt-4 sm:mt-6 md:mt-8">
          <div className="block w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead className="hidden sm:table-header-group">
                <tr className="border-b-2 border-[#E65F2B]/20">
                  <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-bold text-[#E65F2B] w-1/5">Candidate</th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-bold text-[#E65F2B] w-1/5 text-center">Role</th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-bold text-[#E65F2B] w-1/5 text-center">Experience</th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-bold text-[#E65F2B] w-1/5 text-center">Date</th>
                  <th className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-bold text-[#E65F2B] w-1/5 text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <React.Fragment key={index}>
                    {/* Mobile card view */}
                    <tr className="sm:hidden block border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors p-4">
                      <div className="font-semibold text-[#E65F2B] text-lg mb-2">{data.Candidate}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[#E65F2B] font-medium">Role:</span>
                          <span className="text-gray-600 ml-1">{data.Role}</span>
                        </div>
                        <div>
                          <span className="text-[#E65F2B] font-medium">Experience:</span>
                          <span className="text-gray-600 ml-1">{data.Experience}</span>
                        </div>
                        <div>
                          <span className="text-[#E65F2B] font-medium">Date:</span>
                          <span className="text-gray-600 ml-1">{data.Date}</span>
                        </div>
                        <div>
                          <span className="text-[#E65F2B] font-medium">Amount:</span>
                          <span className="text-gray-600 ml-1 font-medium">₹{data.Amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </tr>
                    
                    {/* Tablet and Desktop table view */}
                    <tr className="hidden sm:table-row border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-semibold text-[#E65F2B] w-1/5">{data.Candidate}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 text-gray-600 w-1/5 text-center">{data.Role}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 text-gray-600 w-1/5 text-center">{data.Experience}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 text-gray-600 w-1/5 text-center">{data.Date}</td>
                      <td className="py-3 px-3 sm:py-4 sm:px-4 md:px-6 font-medium text-gray-600 w-1/5 text-center">₹{data.Amount.toLocaleString()}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receivables