import React from 'react'
import {Link} from 'react-router-dom'




function InterviewHistory() {

  const data = [
    {
      interviewId: "INT001",
      candidateName: "Sharma",
      jobRole: "SDE II",
      email: "rohan.sharma@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-10"
    },
    {
      interviewId: "INT002",
      candidateName: "Verma",
      jobRole: "SDE I",
      email: "ankita.verma@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-12"
    },
    {
      interviewId: "INT003",
      candidateName: "Patel",
      jobRole: "Data Analyst",
      email: "raj.patel@example.com",
      interviewStatus: "Not Recommended",
      interviewDate: "2024-10-08"
    },
    {
      interviewId: "INT004",
      candidateName: "Singh",
      jobRole: "Frontend Developer",
      email: "mohit.singh@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-15"
    },
    {
      interviewId: "INT005",
      candidateName: "Kumar",
      jobRole: "Backend Developer",
      email: "deepak.kumar@example.com",
      interviewStatus: "Not Scheduled",
      interviewDate: "2024-10-20"
    },
    {
      interviewId: "INT006",
      candidateName: "Yadav",
      jobRole: "ML Engineer",
      email: "ravi.yadav@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-22"
    },
    {
      interviewId: "INT007",
      candidateName: "Gupta",
      jobRole: "DevOps Engineer",
      email: "rishabh.gupta@example.com",
      interviewStatus: "Not Recommended",
      interviewDate: "2024-10-18"
    },
    {
      interviewId: "INT008",
      candidateName: "Mishra",
      jobRole: "System Administrator",
      email: "ananya.mishra@example.com",
      interviewStatus: "Scheduled",
      interviewDate: "2024-10-25"
    },
    {
      interviewId: "INT009",
      candidateName: "Roy",
      jobRole: "Security Analyst",
      email: "kiran.roy@example.com",
      interviewStatus: "Recommended",
      interviewDate: "2024-10-28"
    },
    {
      interviewId: "INT010",
      candidateName: "Mehta",
      jobRole: "UI/UX Designer",
      email: "priya.mehta@example.com",
      interviewStatus: "Not Scheduled",
      interviewDate: "2024-10-30"
    }
  ];
  


  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6 flex flex-col'>
         <div className="bg-[rgba(255,255,255,0.34)] p-4 border rounded-2xl shadow mb-4 ">
           {/* Column Headings */}
           <div className="w-[98%] h-[40px] grid gap-x-5 text-[#2E2E2E] font-semibold text-center py-2 border-b-2 border-[#f2a98d]" 
             style={{
               gridTemplateColumns: "1fr 0.8fr 1.3fr 0.8fr 0.8fr 0.8fr",
             }}>
             <div>Interview Date</div>
             <div>Candidate Name</div>
             <div>Candidate Email</div>
             <div>Hiring Role</div>
             <div>Date</div>
             <div>Status</div>
           </div>
           {/* Data Rows */}
           {Array.isArray(data) ? (
             data.map((person, index) => (
               <div key={index} className="flex flex-col w-full py-1">
                 <div className="w-full flex items-center justify-evenly">
                   <div
                     className="w-[98%] h-[60px] grid gap-x-5 items-center text-center"
                     style={{
                       gridTemplateColumns: "1fr 0.8fr 1.3fr 0.8fr 0.8fr 0.8fr",
                     }}
                   >
                     {/* Name and Status */}
                     <div className="text-sm font-semibold text-[#E65F2B] cursor-pointer hover:underline">
                         <Link to={``}>
                           {person.interviewId}
                         </Link>
                     </div>
                     {/* Role */}
                     <div className="text-sm text-[#797979]">
                         {person.candidateName}
                     </div>
                     {/* Email */}
                     <div className="text-sm text-[#797979]">
                         {person.email}
                     </div>
                     {/* Score */}
                     <div className="text-sm text-[#797979]">
                       {person.jobRole}
                     </div>
                     {/* Date */}
                     <div className="text-sm text-[#797979]">
                         {person.interviewDate}
                     </div>
                     {/* Status */}
                     <div className="text-sm text-black">
                         <div
                           className={`text-sm px-4 py-[2px] rounded-full bg-[#F6F1EE] ${
                             person.interviewStatus?.toLowerCase() ===
                             "recommended"
                               ? "border-[1px] border-[#89E093] text-[#2EAC34] font-semibold"
                               : person.interviewStatus?.toLowerCase() ===
                                 "not recommended"
                               ? "border-[1px] border-[#E08989] text-[#AC2E2E] font-semibold whitespace-nowrap"
                               : person.interviewStatus?.toLowerCase() ===
                                 "scheduled"
                               ? "border-[1px] border-[#f1a028] text-[#d7870e] font-semibold"
                               : person.interviewStatus?.toLowerCase() ===
                                 "not scheduled"
                               ? "border-[1px] border-[#E08989] text-[#AC2E2E] font-semibold"
                               : "border-[1px] border-[#a6a6a6] text-[#737373] font-semibold"
                           }`}
                         >
                           {person.interviewStatus}
                         </div>
                     </div>
                   </div>
                 </div>
                 <div className="flex justify-center w-full mt-1 mb-1">
                   <hr
                     style={{
                       backgroundColor: "#f2a98d",
                       width: "98%",
                       height: "1px",
                       borderRadius: "9999px",
                       border: "none",
                     }}
                   />
                 </div>
               </div>
             ))
           ) : (
             <div>No service</div>
           )}
         </div>
       </div>


  )
}

export default InterviewHistory