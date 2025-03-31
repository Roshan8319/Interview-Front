import { useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function ViewJob() {

  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  const [people, setPeople] = useState([{
    name: "Ananya Sharma",
    status: "Recommended",
    role: "SDE II",
    email: "sumit.kumar.mahto341@gmail.com",
    date: "MON, 4 DEC",
    score: 450,
  },
  {
    name: "Rohan Verma",
    status: "Not Recommended",
    role: "SDET I",
    email: "sumit@gmail.com",
    date: "TUE, 5 DEC",
    score: 320,
  },
  {
    name: "Vikram Singh",
    status: "Not Scheduled",
    role: "EM",
    email: "sumit@gmail.com",
    date: "WED, 6 DEC",
    score: 400,
  },
  {
    name: "Priya Desai",
    status: "Scheduled",
    role: "SDE II - Frontend",
    email: "sumit@gmail.com",
    date: "THU, 7 DEC",
    score: 360,
  },
  {
    name: "Karthik Iyer",
    status: "Recommended",
    role: "SDE III",
    email: "sumit@gmail.com",
    date: "FRI, 8 DEC",
    score: 490,
  },
  {
    name: "Aarav Kapoor",
    status: "Not Recommended",
    role: "SDE I",
    email: "sumit@gmail.com",
    date: "TUE, 16 AUG 24",
    score: 320,
  },
  {
    name: "Meera Nair",
    status: "Recommended",
    role: "SDE II",
    email: "sumit@gmail.com",
    date: "WED, 17 AUG 24",
    score: 470,
  },
  {
    name: "Shreya Banerjee",
    status: "Not Scheduled",
    role: "EM",
    email: "sumit@gmail.com",
    date: "THU, 18 AUG 24",
    score: 390,
  },
  {
    name: "Rahul Gupta",
    status: "Scheduled",
    role: "SDET III",
    email: "sumit@gmail.com",
    date: "FRI, 19 AUG 24",
    score: 480,
  },
  {
    name: "Tanvi Reddy",
    status: "Recommended",
    role: "Data Scientist",
    email: "sumit@gmail.com",
    date: "MON, 20 AUG 24",
    score: 450,
  },
  {
    name: "Arjun Khanna",
    status: "Not Recommended",
    role: "SDE II - Backend",
    email: "sumit@gmail.com",
    date: "TUE, 21 AUG 24",
    score: 310,
  },
  {
    name: "Ishita Malhotra",
    status: "Scheduled",
    role: "UI/UX Designer",
    email: "sumit@gmail.com",
    date: "WED, 22 AUG 24",
    score: 370,
  },
  {
    name: "Aditya Roy",
    status: "Not Scheduled",
    role: "Product Manager",
    email: "sumit@gmail.com",
    date: "THU, 23 AUG 24",
    score: 420,
  },
  {
    name: "Sanya Bhatia",
    status: "Recommended",
    role: "QA Lead",
    email: "sumit@gmail.com",
    date: "FRI, 24 AUG 24",
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
    <div className='min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7]  items-center' >
      <div className='p-2 flex' >
        <div className="w-[30%] p-5  ">

          <div className="mb-4">
            <p className='text-sm text-[#797979]'>Job Role</p>
            <p className='font-lg font-semibold'>SDE-III</p>

          </div>

          <div className="mb-4">
            <p className='text-sm text-[#797979]'>Hiring Manager Email</p>
            <p className='font-lg font-semibold'>sumit@gmail.com</p>

          </div>


        </div>
        <div className='w-[70%] p-5 rounded-lg' >
          <div className="mb-4">
            <label className="block text-sm text-[#797979]">Job Description</label>
            <div className='w-[80%] ' >
              Design, develop, and maintain scalable software solutions. Collaborate with cross-functional teams, write clean code, and ensure high performance. Debug, test, and optimize applications while adhering to coding standards. Demonstrate problem-solving skills, passion for technology, and continuous learning.
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-2 ' >
        <div className="bg-[rgba(255,255,255,0.34)] p-2 border rounded-xl shadow" >
          {currentData.map((person, index) => (
            <div key={index} className="flex flex-col w-full">
              <div className="w-full flex items-center justify-evenly">
                <div
                  className="w-[98%] h-[80px] grid gap-x-5"
                  style={{
                    gridTemplateColumns: "1fr 0.6fr 1.3fr 0.6fr 0.6fr 0.8fr",
                  }}
                >
                  {/* Name and Status */}
                  <div className="flex flex-col items-start justify-evenly">
                    <div className="px-5 text-sm font-semibold text-[#E65F2B]">
                      {person.name}
                    </div>
                  </div>
                  {/* Role */}
                  <div className="flex items-center justify-center">
                    <div className="text-sm text-black text-center">
                      {person.role}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-center justify-center">
                    <div className="text-sm text-black text-center">
                      {person.email}
                    </div>
                  </div>
                  {/* Score */}
                  <div className="flex items-center justify-center">
                    {person.score}/500
                  </div>
                  {/* Date */}
                  <div className="flex items-center justify-center">
                    <div className="text-sm text-black text-center">
                      {person.date}
                    </div>
                  </div>
                  {/* Status */}
                  <div className="flex items-center justify-center">
                    <div className="text-sm text-black text-center">
                      <div
                        className={`text-sm px-4 py-[4px] rounded-full text-center bg-[#F6F1EE] ${person.status === "Recommended"
                          ? "border-[1px] border-[#89E093] text-[#2EAC34] font-semibold"
                          : person.status === "Not Recommended"
                            ? "border-[1px] border-[#E08989] text-[#AC2E2E] font-semibold"
                            : person.status === "Scheduled"
                              ? "border-[1px] border-[#f1a028] text-[#d7870e] font-semibold"
                              : "border-[1px] border-[#a6a6a6] text-[#737373] font-semibold"
                          }`}
                      >
                        {person.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full mt-0 mb-0">
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewJob
