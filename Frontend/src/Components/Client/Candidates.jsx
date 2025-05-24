import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Users, UserPlus, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';

const SkeletonCard = () => (
  <div className="p-4 w-full h-[96px] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const SkeletonRow = () => (
  <div className="w-full flex flex-col">
    <div className="w-full flex items-center justify-evenly">
      <div className="w-[98%] h-[80px] grid gap-x-5" style={{ gridTemplateColumns: "1fr 0.8fr 1.3fr 0.8fr 0.8fr 0.8fr" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-center w-full mt-0 mb-0">
      <hr className="w-[98%] h-[1px] bg-gray-200" />
    </div>
  </div>
);

// Mobile card component for displaying candidate data on small screens
const CandidateCard = ({ person }) => (
  <div className="bg-[rgba(255,255,255,0.34)] rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between items-start mb-3">
      <Link to={``} className="text-base font-semibold text-[#E65F2B] hover:underline">
        {person.firstName} {person.lastName}
      </Link>
      <span
        className={`text-xs px-2 py-1 rounded-full text-center bg-[#F6F1EE] font-semibold ${person.interviewStatus?.toLowerCase() === "recommended"
          ? "border-[1px] border-[#89E093] text-[#2EAC34]"
          : person.interviewStatus?.toLowerCase() === "not recommended"
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
    <div className="grid grid-cols-2 gap-2 text-sm gap-x-20">
      <div>
        <p className="text-xs text-gray-500">Role</p>
        <p className="text-[#797979]">{person.jobRole}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Score</p>
        <p className="text-[#797979]">{person.score}/500</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Email</p>
        <p className="text-[#797979]">{person.email}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Date</p>
        <p className="text-[#797979]">{person.createdAt}</p>
      </div>
    </div>
  </div>
);

function Candidates() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    role: "All",
    status: "All",
  });

  // Add filteredData state
  const [filteredData, setFilteredData] = useState([]);

  const role = [
    "All",
    "SDE-I",
    "SDE-II",
    "SDE-III",
    "SDET-I",
    "EM",
    "DevOps"
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
    if (category === "role" && value === selectedFilters.role) {
      // If clicking the same role button, reset to "All"
      setSelectedFilters(prev => ({
        ...prev,
        [category]: "All"
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const [people, setPeople] = useState([]);

  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for slicing the data
  const totalPages = Math.ceil(people.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = people.slice(startIndex, endIndex);

  const [data, setData] = useState([]);
  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/client/getAllCandidatesForClient`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data.candidates);
        setFilteredData(response.data.data.candidates); // Set initial filtered data
        setStat(response.data.data.statistics);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    let result = [...data];

    // Filter by role
    if (selectedFilters.role !== "All") {
      result = result.filter(item => item.jobRole === selectedFilters.role);
    }

    // Filter by status
    if (selectedFilters.status !== "All") {
      result = result.filter(item => {
        if (selectedFilters.status === "Recommended") {
          return item.interviewStatus?.toLowerCase() === "recommended";
        } else if (selectedFilters.status === "Not Recommended") {
          return item.interviewStatus?.toLowerCase() === "not recommended";
        } else if (selectedFilters.status === "Scheduled") {
          return item.interviewStatus?.toLowerCase() === "scheduled";
        } else if (selectedFilters.status === "Not Scheduled") {
          return item.interviewStatus?.toLowerCase() === "not scheduled";
        }
        return true;
      });
    }

    setFilteredData(result);
  }, [selectedFilters, data]);

  return (
    <div className="flex flex-col gap-y-4 px-2 sm:px-4 md:px-6 pt-2 bg-[#EBDFD7] min-h-screen">
      {loading ? (
        <div className="flex-1 pt-4 md:pt-4">
          {/* Stats Skeleton */}
          <div className="w-full flex flex-col sm:flex-row flex-wrap items-center justify-evenly mb-8 ">
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-evenly">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className="py-4 top-[60px] bg-[#EBDFD7]">
            <div className="pl-1 sm:pl-3 space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start sm:items-center flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-[rgba(255,255,255,0.34)] p-2 border rounded-2xl shadow mb-4 hidden md:block">
            {[...Array(6)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>

          {/* Mobile Skeleton Cards */}
          <div className="md:hidden space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.34)] rounded-lg p-4 shadow-md animate-pulse">
                <div className="flex justify-between mb-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="col-span-2">
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-evenly">
            {stat ? ( // Check if stat exists
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 justify-evenly pt-4 md:pt-4">
                <div className="p-3 sm:p-4 w-full h-[96px] flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#E65F2B]/20">
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-xs sm:text-sm text-black/60 font-medium mb-2">
                      Total Candidates
                    </span>
                    <span className="text-xl sm:text-[24px] font-bold text-[#E65F2B]">
                      {stat.totalCandidates}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-[#E65F2B]/10 group-hover:bg-[#E65F2B]/20 transition-colors">
                    <Users className="w-5 h-5 text-[#E65F2B]" />
                  </div>
                </div>

                <div className="p-3 sm:p-4 w-full h-[96px] flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#f1a028]/20">
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-xs sm:text-sm text-black/60 font-medium mb-2">
                      To be Scheduled
                    </span>
                    <span className="text-xl sm:text-[24px] font-bold text-[#f1a028]">
                      {stat.toBeScheduled}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-[#f1a028]/10 group-hover:bg-[#f1a028]/20 transition-colors">
                    <UserPlus className="w-5 h-5 text-[#f1a028]" />
                  </div>
                </div>

                <div className="p-3 sm:p-4 w-full h-[96px] flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#6366F1]/20">
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-xs sm:text-sm text-black/60 font-medium mb-2">
                      In Progress
                    </span>
                    <span className="text-xl sm:text-[24px] font-bold text-[#6366F1]">
                      {stat.scheduled}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 transition-colors">
                    <Clock className="w-5 h-5 text-[#6366F1]" />
                  </div>
                </div>

                <div className="p-3 sm:p-4 w-full h-[96px] flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#2EAC34]/20">
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-xs sm:text-sm text-black/60 font-medium mb-2">
                      Recommended
                    </span>
                    <span className="text-xl sm:text-[24px] font-bold text-[#2EAC34]">
                      {stat.recommended}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-[#2EAC34]/10 group-hover:bg-[#2EAC34]/20 transition-colors">
                    <ThumbsUp className="w-5 h-5 text-[#2EAC34]" />
                  </div>
                </div>

                <div className="p-3 sm:p-4 w-full h-[96px] flex items-start justify-between bg-[rgba(255,255,255,0.34)] shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#AC2E2E]/20">
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-xs sm:text-sm text-black/60 font-medium mb-2">
                      Rejected
                    </span>
                    <span className="text-xl sm:text-[24px] font-bold text-[#AC2E2E]">
                      {stat.rejected}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-[#AC2E2E]/10 group-hover:bg-[#AC2E2E]/20 transition-colors">
                    <ThumbsDown className="w-5 h-5 text-[#AC2E2E]" />
                  </div>
                </div>
              </div>
            ) : (
              <div>No statistics available</div>
            )}
          </div>

          <div className="py-4 top-[60px] bg-[#EBDFD7]">
            <div className="pl-1 sm:pl-3 space-y-4">
              {/* Domain Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-3">
                <span className="text-sm font-bold mb-2 sm:mb-0 sm:mr-7 flex text-[#E65F2B]">
                  Role
                </span>
                <div className="flex flex-wrap gap-2">
                  {role.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleSelect("role", role)}
                      className={`flex items-center justify-center px-2 py-1 border rounded-3xl text-[12px] w-auto ${selectedFilters.role === role
                        ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                        : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                        }`}
                    >
                      {/* Tick container */}
                      {selectedFilters.role === role && (
                        <span className="w-4 h-4 flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
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
              </div>

              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-3">
                <span className="text-sm font-bold mb-2 sm:mb-0 sm:mr-4 text-[#E65F2B]">
                  Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {status.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleSelect("status", status)}
                      className={`flex items-center justify-center px-2 py-1 border rounded-2xl text-[12px] w-auto ${selectedFilters.status === status
                        ? "bg-[#E65F2B] text-white border-[#E65F2B]"
                        : "bg-[#F6F1EE] text-[#E65F2B] border-[#E65F2B]"
                        }`}
                    >
                      {/* Tick container */}
                      {selectedFilters.status === status && (
                        <span className="w-4 h-4 flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
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
          </div>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block w-[100%] bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md overflow-hidden mb-10">
            <table className="w-[100%] h-[100%]">
              <thead>
                <tr className="border-b-2 border-[#E65F2B]/20">
                  <th className="px-6 py-4 font-bold text-[#E65F2B] text-start">Name</th>
                  <th className="px-6 py-4 font-bold text-[#E65F2B]">Role</th>
                  <th className="px-6 py-4 font-bold text-[#E65F2B]">Email</th>
                  <th className="px-6 py-4 font-bold text-[#E65F2B]">Score</th>
                  <th className="px-6 py-4 font-bold text-[#E65F2B]">Date</th>
                  <th className="px-6 py-4 font-bold text-[#E65F2B]">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((person, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors"
                    >
                      {/* Name */}
                      <td className="px-6 py-4 max-w-max text-start">
                        <Link
                          to={``}
                          className="text-sm font-semibold text-[#E65F2B] hover:underline"
                        >
                          {person.firstName} {person.lastName}
                        </Link>
                      </td>
                      {/* Role */}
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.jobRole}
                      </td>
                      {/* Email */}
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.email}
                      </td>
                      {/* Score */}
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.score}/500
                      </td>
                      {/* Date */}
                      <td className="px-6 py-4 max-w-max text-center text-sm text-[#797979]">
                        {person.createdAt}
                      </td>
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

          {/* Mobile Cards - Visible only on mobile/tablet */}
          <div className="md:hidden pb-10">
            <span className="text-md font-bold mb-2 sm:mb-0 sm:mr-7 flex text-[#E65F2B]">
              Candidate Details
            </span>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <CandidateCard key={index} person={person} />
              ))
            ) : (
              <div className="bg-[rgba(57, 17, 17, 0.34)] rounded-lg p-4 text-center text-[#797979]">
                No Data Available
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Candidates;