import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
function Candidates() {

  const baseUrl = import.meta.env.VITE_BASE_URL

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    role: "All",
    status: "All",
  });

  const role = [
    "SDE II",
    "SDE III",
    "SDET I",
    "EM",
    "SDE I - Frontend",
    "SDE II - Frontend",
  ];
  const status = [
    "All",
    "Recommended",
    "Not Recommended",
    "Scheduled",
    "Not Scheduled",
  ];
  // All
  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const [people, setPeople] = useState([
    {
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

  const [data,setData] = useState([]);
  const [stat,setStat] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/client/getAllCandidatesForClient`, {
          withCredentials: true,
        });
        setData(response.data.data.candidates);
        setStat(response.data.data.statistics);
        console.log(response);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCandidates();
  }, []);


  return (
    <div className="flex flex-col gap-y-4 px-6 pt-2 bg-[#EBDFD7]">
      <div>
        <div className="flex flex-col w-full justify-end sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 ml-auto">
          {/* Search Input */}
          <div className="flex items-center rounded-full px-4 py-2 w-[446px] bg-[#F6F1EE] border-gray-300 border focus-within:border-[#F6F1EE]">
            <input
              type="text"
              placeholder="Search candidate by name"
              className="flex-1 bg-transparent text-gray-600 outline-none text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </div>

          {/* Add Client Button */}
          {/* <button
            type="button"
            onClick={() => navigate(`${location.pathname}/addcandidate`)}
            class="relative w-[170px] h-10 flex items-center rounded-xl overflow-hidden border border-[#E65F2B] bg-[#E65F2B] cursor-pointer transition-all duration-300 hover:bg-[#cd4b18] active:border-[#72290d] group"
          >

            <span class=" pl-2 absolute left-1 text-white font-semibold transition-all duration-300 group-hover:text-transparent">
              Add Candidate
            </span>


            <span class="absolute right-0 h-full w-[39px] bg-[#cd4b18] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:translate-x-0 active:bg-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                fill="none"
                class="stroke-white"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button> */}


        </div>
      </div>

      <div className="w-full flex items-center justify-evenly">
      {stat ? (  // Check if stat exists
    <div className="w-[98%] grid grid-cols-5 gap-x-5 justify-evenly ">
      <div className="p-4 w-[200px] h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg">
        <span className="text-sm text-black font-extralight">Total Candidates</span>
        <span className="text-[24px] font-semibold">{stat.totalCandidates}</span>
      </div>
      <div className="p-4 w-[200px] h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg">
        <span className="text-sm text-black font-extralight">To be Scheduled</span>
        <span className="text-[24px] font-semibold">{stat.toBeScheduled}</span>
      </div>
      <div className="p-4 w-[200px] h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg">
        <span className="text-sm text-black font-extralight">In Progress</span>
        <span className="text-[24px] font-semibold">{stat.scheduled}</span>
      </div>
      <div className="p-4 w-[200px] h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg">
        <span className="text-sm text-black font-extralight">Recommended</span>
        <span className="text-[24px] font-semibold">{stat.recommended}</span>
      </div>
      <div className="p-4 w-[200px] h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg">
        <span className="text-sm text-black font-extralight">Rejected</span>
        <span className="text-[24px] font-semibold">{stat.rejected}</span>
      </div>
    </div>
  ) : (
    <div>No statistics available</div>
  )}
      </div>

      <div className="py-4 sticky top-[60px]">
        <div className="pl-3 space-y-2">
          {/* Domain Filter */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold mr-7 flex text-[#E65F2B]">
              Role
            </span>
            {role.map((role) => (
              <button
                key={role}
                onClick={() => handleSelect("role", role)}
                className={`flex items-center justify-center px-2 py-1 border rounded-md text-[12px] w-auto ${
                  selectedFilters.role === role
                    ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                    : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                }`}
              >
                {/* Tick container */}
                {selectedFilters.role === role && (
                  <span className="w-4 h-4 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#FFFFFF"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
                {role}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold mr-4  text-[#E65F2B]">
              Status
            </span>
            {status.map((status) => (
              <button
                key={status}
                onClick={() => handleSelect("status", status)}
                className={`flex items-center justify-center px-2 py-1 border rounded-md text-[12px] w-auto ${
                  selectedFilters.status === status
                    ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                    : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                }`}
              >
                {/* Tick container */}
                {selectedFilters.status === status && (
                  <span className="w-4 h-4 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#FFFFFF"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.34)] p-2 border rounded-2xl shadow mb-4 " >
      {Array.isArray(data) ? (
        data.map((person, index) => (
          <div key={index} className="flex flex-col w-full">
          <div className="w-full flex items-center justify-evenly">
            <div
              className="w-[98%] h-[80px] grid gap-x-5"
              style={{
                gridTemplateColumns: "1fr 0.8fr 1.3fr 0.8fr 0.8fr 0.8fr",
              }}
            >
              {/* Name and Status */}
              <div className="flex flex-col items-start justify-evenly">
                <div className="text-sm font-semibold text-[#E65F2B]">
                  {person.firstName}
                </div>
              </div>
              {/* Role */}
              <div className="flex items-center justify-center">
                <div className="text-sm text-black text-center">
                  {person.jobRole}
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
                  {person.createdAt}
                </div>
              </div>
              {/* Status */}
              <div className="flex items-center justify-center">
                <div className="text-sm text-black text-center">
                  <div
                    className={`text-sm px-4 py-[4px] rounded-full text-center bg-[#F6F1EE] ${
                      person.interviewStatus === "Recommended"
                        ? "border-[1px] border-[#89E093] text-[#2EAC34] font-semibold"
                        : person.interviewStatus === "Not Recommended"
                        ? "border-[1px] border-[#E08989] text-[#AC2E2E] font-semibold whitespace-nowrap"
                        : person.interviewStatus === "Scheduled"
                        ? "border-[1px] border-[#f1a028] text-[#d7870e] font-semibold"
                        : "border-[1px] border-[#a6a6a6] text-[#737373] font-semibold"
                    }`}
                  >
                    {person.interviewStatus}
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
        ))
      ) : (
        <div>
          No service 
        </div>
      )
      }
      </div>
    </div>
  );
}

export default Candidates;

