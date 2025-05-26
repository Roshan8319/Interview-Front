import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function InterviewHistory() {
  // For responsive view, we'll track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = [
    {
      interviewId: "INT001",
      candidateName: "Rohan",
      jobRole: "SDE II",
      email: "rohan.sharma@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-10"
    },
    {
      interviewId: "INT002",
      candidateName: "Ankita",
      jobRole: "SDE I",
      email: "ankita.verma@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-12"
    },
    {
      interviewId: "INT003",
      candidateName: "Raj",
      jobRole: "Data Analyst",
      email: "raj.patel@example.com",
      interviewStatus: "Not Recommended",
      interviewDate: "2024-10-08"
    },
    {
      interviewId: "INT004",
      candidateName: "Mohit",
      jobRole: "Frontend Developer",
      email: "mohit.singh@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-15"
    },
    {
      interviewId: "INT005",
      candidateName: "Deepak",
      jobRole: "Backend Developer",
      email: "deepak.kumar@example.com",
      interviewStatus: "Not Scheduled",
      interviewDate: "2024-10-20"
    },
    {
      interviewId: "INT006",
      candidateName: "Ravi",
      jobRole: "ML Engineer",
      email: "ravi.yadav@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-22"
    },
    {
      interviewId: "INT007",
      candidateName: "Rishabh",
      jobRole: "DevOps Engineer",
      email: "rishabh.gupta@example.com",
      interviewStatus: "Not Recommended",
      interviewDate: "2024-10-18"
    },
    {
      interviewId: "INT008",
      candidateName: "Ananya",
      jobRole: "System Administrator",
      email: "ananya.mishra@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-25"
    },
    {
      interviewId: "INT009",
      candidateName: "Kiran",
      jobRole: "Security Analyst",
      email: "kiran.roy@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-28"
    },
    {
      interviewId: "INT010",
      candidateName: "Priya",
      jobRole: "UI/UX Designer",
      email: "priya.mehta@example.com",
      interviewStatus: "Not Scheduled",
      interviewDate: "2024-10-30"
    }
  ];


  // Check if we're on mobile (less than 640px)
  const isMobile = windowWidth < 640;
  // Check if we're on tablet (between 640px and 1024px)
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6 sm:p-4 xs:p-3 flex flex-col'>
      <div className='w-full flex font-semibold text-[20px] sm:text-[18px] xs:text-[16px]'>
        <div className='w-full sm:w-full'>
          <h1>Candidate History</h1>
        </div>
      </div>

      {/* For Desktop and Tablet (responsive table) */}
      {!isMobile && (
        <div className="w-full bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden mb-10 mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#E65F2B]/20">
                <th className="px-6 py-4 font-bold text-[#E65F2B] text-start">Interview ID</th>
                <th className="px-6 py-4 font-bold text-[#E65F2B] text-center">Name</th>
                {!isTablet && <th className="px-6 py-4 font-bold text-[#E65F2B] text-center">Email</th>}
                <th className="px-6 py-4 font-bold text-[#E65F2B] text-center">Hiring Role</th>
                {!isTablet && <th className="px-6 py-4 font-bold text-[#E65F2B] text-center">Interview Date</th>}
                <th className="px-6 py-4 font-bold text-[#E65F2B] text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((person, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 max-w-max text-start">
                      <Link
                        to={``}
                        className="text-sm font-semibold text-[#E65F2B] hover:underline"
                      >
                        {person.interviewId}
                      </Link>
                    </td>
                    {/* Name */}
                    <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                      {person.candidateName}
                    </td>
                    {/* Email - hide on tablet */}
                    {!isTablet && (
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.email}
                      </td>
                    )}
                    {/* Role */}
                    <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                      {person.jobRole}
                    </td>
                    {/* Date - hide on tablet */}
                    {!isTablet && (
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.interviewDate}
                      </td>
                    )}
                    {/* Status */}
                    <td className="px-6 py-4 max-w-max text-center">
                      <span
                        className={`text-sm px-3 py-[4px] rounded-full text-center bg-[#F6F1EE] font-semibold ${person.interviewStatus?.toLowerCase() === "recommended"
                          ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                          : person.interviewStatus?.toLowerCase() ===
                            "not recommended"
                            ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                            : person.interviewStatus?.toLowerCase() === "scheduled"
                              ? "border-[1px] border-[#F1A028] text-[#D7870E]"
                              : person.interviewStatus?.toLowerCase() === "not scheduled"
                                ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                                : "border-[1px] border-[#A6A6A6] text-[#737373]"
                          }`}
                      >
                        {person.interviewStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isTablet ? "4" : "6"}
                    className="px-6 py-4 text-center text-md text-[#797979]"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* For Mobile (card view) */}
      {isMobile && (
        <div className="w-full flex flex-col gap-4 mt-6 mb-10">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((person, index) => (
              <div 
                key={index} 
                className="bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <Link
                    to={``}
                    className="text-sm font-semibold text-[#E65F2B] hover:underline"
                  >
                    {person.interviewId}
                  </Link>
                  <span
                    className={`text-xs px-2 py-[3px] rounded-full text-center bg-[#F6F1EE] font-semibold ${person.interviewStatus?.toLowerCase() === "recommended"
                      ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                      : person.interviewStatus?.toLowerCase() ===
                        "not recommended"
                        ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                        : person.interviewStatus?.toLowerCase() === "scheduled"
                          ? "border-[1px] border-[#F1A028] text-[#D7870E]"
                          : person.interviewStatus?.toLowerCase() === "not scheduled"
                            ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                            : "border-[1px] border-[#A6A6A6] text-[#737373]"
                      }`}
                  >
                    {person.interviewStatus}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <p className="text-xs text-[#E65F2B] font-semibold">Name</p>
                    <p className="text-sm text-[#797979]">{person.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#E65F2B] font-semibold">Role</p>
                    <p className="text-sm text-[#797979]">{person.jobRole}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#E65F2B] font-semibold">Email</p>
                    <p className="text-sm text-[#797979] truncate">{person.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#E65F2B] font-semibold">Date</p>
                    <p className="text-sm text-[#797979]">{person.interviewDate}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md p-4">
              <p className="text-center text-md text-[#797979]">No Data Available</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewHistory