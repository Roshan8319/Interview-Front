import { useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function ViewJob() {

  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const [people, setPeople] = useState([
    {
      name: "Ananya Sharma",
      status: "Recommended",
      role: "SDE II - Frontend",
      email: "ananya.sharma@example.com",
      date: "Mon, 12 Feb",
      score: 450,
    },
    {
      name: "Rohan Verma",
      status: "Not Recommended",
      role: "SDET I",
      email: "rohan.verma@example.com",
      date: "Wed, 14 Feb",
      score: 310,
    },
    {
      name: "Vikram Singh",
      status: "Not Scheduled",
      role: "Engineering Manager",
      email: "vikram.singh@example.com",
      date: "Tue, 20 Feb",
      score: 400,
    },
    {
      name: "Priya Desai",
      status: "Scheduled",
      role: "SDE II - Backend",
      email: "priya.desai@example.com",
      date: "Fri, 8 Mar",
      score: 365,
    },
    {
      name: "Karthik Iyer",
      status: "Recommended",
      role: "SDE III - Fullstack",
      email: "karthik.iyer@example.com",
      date: "Mon, 18 Mar",
      score: 490,
    },
    {
      name: "Aarav Kapoor",
      status: "Not Recommended",
      role: "SDE I",
      email: "aarav.kapoor@example.com",
      date: "Thu, 4 Apr",
      score: 325,
    },
    {
      name: "Meera Nair",
      status: "Recommended",
      role: "SDE II - Mobile",
      email: "meera.nair@example.com",
      date: "Tue, 16 Apr",
      score: 470,
    },
    {
      name: "Shreya Banerjee",
      status: "Not Scheduled",
      role: "Engineering Manager",
      email: "shreya.banerjee@example.com",
      date: "Mon, 29 Apr",
      score: 390,
    },
    {
      name: "Rahul Gupta",
      status: "Scheduled",
      role: "SDET III",
      email: "rahul.gupta@example.com",
      date: "Fri, 3 May",
      score: 480,
    },
    {
      name: "Tanvi Reddy",
      status: "Recommended",
      role: "Data Scientist",
      email: "tanvi.reddy@example.com",
      date: "Wed, 15 May",
      score: 455,
    },
    {
      name: "Arjun Khanna",
      status: "Not Recommended",
      role: "SDE II - Backend",
      email: "arjun.khanna@example.com",
      date: "Tue, 21 May",
      score: 310,
    },
    {
      name: "Ishita Malhotra",
      status: "Scheduled",
      role: "UI/UX Designer",
      email: "ishita.malhotra@example.com",
      date: "Thu, 6 Jun",
      score: 375,
    },
    {
      name: "Aditya Roy",
      status: "Not Scheduled",
      role: "Product Manager",
      email: "aditya.roy@example.com",
      date: "Wed, 19 Jun",
      score: 420,
    },
    {
      name: "Sanya Bhatia",
      status: "Recommended",
      role: "QA Lead",
      email: "sanya.bhatia@example.com",
      date: "Mon, 24 Jun",
      score: 490,
    },
  ]);


  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for slicing the data
  const totalPages = Math.ceil(people.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = people.slice(startIndex, endIndex);

  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7] items-center' >
      <div className='w-[95%] p-2 flex flex-col md:flex-row' >
        <div className="w-full md:w-[30%] p-5">
          <div className="mb-4">
            <p className='text-sm text-[#797979]'>Job Role</p>
            <p className='font-lg font-semibold'>SDE-III</p>
          </div>

          <div className="-mb-4 sm:mb-4">
            <p className='text-sm text-[#797979]'>Hiring Manager Email</p>
            <p className='font-lg font-semibold'>sumit@gmail.com</p>
          </div>
        </div>

        <div className='w-full md:w-[70%] p-5 rounded-lg' >
          <div className="mb-4">
            <label className="block text-sm text-[#797979]">Job Description</label>
            <div className='w-full md:w-[80%]' >
              Design, develop, and maintain scalable software solutions. Collaborate with cross-functional teams, write clean code, and ensure high performance. Debug, test, and optimize applications while adhering to coding standards. Demonstrate problem-solving skills, passion for technology, and continuous learning.
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table (hidden on mobile) */}
      <div className=" w-[95%] bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md text-sm hidden md:block">
        <table className="w-[100%] h-[100%]">
          <thead>
            <tr className="border-b-2 border-[#E65F2B]/20 text-[16px]">
              <th className="px-6 py-4 font-bold text-[#E65F2B] text-start">Name</th>
              <th className="px-6 py-4 font-bold text-[#E65F2B]">Role</th>
              <th className="px-6 py-4 font-bold text-[#E65F2B]">Email</th>
              <th className="px-6 py-4 font-bold text-[#E65F2B]">Score</th>
              <th className="px-6 py-4 font-bold text-[#E65F2B]">Date</th>
              <th className="px-6 py-4 font-bold text-[#E65F2B]">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((person, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                  {/* Name */}
                  <td className="px-6 py-3 max-w-max text-start">{person.name}</td>
                  {/* Role */}
                  <td className="px-6 py-3 max-w-max text-center">{person.role}</td>
                  {/* Email */}
                  <td className="px-6 py-3 max-w-max text-center">{person.email}</td>
                  {/* Score */}
                  <td className="px-6 py-3 max-w-max text-center">{person.score}/500</td>
                  {/* Date */}
                  <td className="px-6 py-3 max-w-max text-center">{person.date}</td>
                  {/* Status */}
                  <td className="px-6 py-3 max-w-max text-center">
                    <span
                      className={`text-sm px-3 py-[4px] rounded-full text-center bg-[#F6F1EE] font-semibold  ${person.status === "Recommended"
                        ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                        : person.status === "Not Recommended"
                          ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                          : person.status === "Scheduled"
                            ? "border-[1px] border-[#F1A028] text-[#D7870E]"
                            : "border-[1px] border-[#A6A6A6] text-[#737373]"
                        }`}
                    >
                      {person.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-md text-[#797979]"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (visible only on mobile) */}
      <div className="w-[95%] md:hidden space-y-4 mb-4">
        <span className="text-md font-bold mb-2 sm:mb-0 sm:mr-7 flex text-[#E65F2B]">
          Candidate Details
        </span>
        {Array.isArray(currentData) && currentData.length > 0 ? (
          currentData.map((person, index) => (
            <div key={index} className="bg-[rgba(255,255,255,0.34)] p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{person.name}</h3>
                <span
                  className={`text-xs px-2 py-[2px] rounded-full text-center bg-[#F6F1EE] font-semibold ${person.status === "Recommended"
                    ? "border-[1px] border-[#89E093] text-[#2EAC34]"
                    : person.status === "Not Recommended"
                      ? "border-[1px] border-[#E08989] text-[#AC2E2E]"
                      : person.status === "Scheduled"
                        ? "border-[1px] border-[#F1A028] text-[#D7870E]"
                        : "border-[1px] border-[#A6A6A6] text-[#737373]"
                    }`}
                >
                  {person.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p className="text-[#797979]">Role:</p>
                <p>{person.role}</p>
                <p className="text-[#797979]">Email:</p>
                <p className="truncate">{person.email}</p>
                <p className="text-[#797979]">Score:</p>
                <p>{person.score}/500</p>
                <p className="text-[#797979]">Date:</p>
                <p>{person.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[rgba(255,255,255,0.34)] p-4 rounded-xl shadow-md text-center text-md text-[#797979]">
            No Data Available
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewJob
