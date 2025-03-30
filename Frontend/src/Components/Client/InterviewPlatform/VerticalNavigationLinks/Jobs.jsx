import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState('');
  
  useEffect(() => {
    // Try to get jobId from sessionStorage when component mounts
    const storedJobId = sessionStorage.getItem('jobId');
    if(storedJobId) {
      setJobId(storedJobId);
      console.log("Retrieved jobId from session:", storedJobId);
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/client/getAllJobsForClient`, {
          withCredentials: true,
        });
        setData(response.data.data.jobs);
        console.log("Jobs data:", response.data.data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);

  const handleAddCandidate = (jobId) => {
    // Store the jobId in sessionStorage before navigating
    sessionStorage.setItem('jobId', jobId);
    console.log("Setting jobId in session:", jobId);
    
    // Set it in state as well
    setJobId(jobId);
    
    // Navigate to add candidate page
    navigate('/client/candidates/addcandidate', { 
      state: { jobId: jobId }
    });
  };

  const handleArchiveClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading Jobs data...</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-4 flex flex-col'>
      <div className='flex flex-col gap-y-4 p-2'>
        <div className=''>
          <div className="flex flex-col w-full justify-end sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 ml-auto">
            {/* Search Input */}
            <div className="flex items-center rounded-full px-4 py-2 w-[446px] bg-[#fff] border-gray-300 border focus-within:border-blue-700">
              <input
                type="text"
                placeholder="Search job by Name, Email & Mobile Number"
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

            {/* Add Job Button */}
            <button
              type="button"
              onClick={() => navigate(`${location.pathname}/addjob`)}
              className="relative w-[160px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
            >
              <span className="pl-2 absolute left-7 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
                Add Job
              </span>
              <span className="absolute right-0 h-full w-[39px] bg-[#E65F2B] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:translate-x-0 active:bg-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  className="stroke-white"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className='w-[100%] bg-[rgba(255,255,255,0.34)] p-5 mt-8 rounded-lg'>
          <div>
            <div>
              <table className='w-[100%] h-[100%]'>
                <thead>
                  <tr className="border-b-2 border-[#E65F2B]">
                    <th className="py-2 px-4 max-w-max text-start text-md font-semibold text-black">Jobs</th>
                    <th className="py-2 px-4 max-w-max font-semibold text-black whitespace-nowrap">Active Candidates</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((job, index) => (
                      <tr key={index} className="h-5 border-b border-[#E65F2B] space-y-2">
                        <td className="py-2 px-4 max-w-max text-start">{job.jobRole}</td>
                        <td className="py-2 px-4 max-w-max text-center">{job.candidateCount}</td>
                        <td className="py-2 px-4 max-w-max flex gap-32 ml-40">
                          <button onClick={() => navigate(`${location.pathname}/viewjob`, { state: { jobId: job.jobId } })}>
                            <div className='bg-white text-[#E65F2B] flex items-center justify-center px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group'>
                              View↗
                            </div>
                          </button>

                          <button onClick={() => handleAddCandidate(job.jobId)}>
                            <div className='bg-white text-[#E65F2B] flex items-center justify-center px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group'>
                              Add Candidate 
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E65F2B">
                                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                                </svg>
                              </span>
                            </div>
                          </button>
                        </td>
                        <td className='py-2 px-4 max-w-max text-center ml-[50%]'>
                          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Glyph" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"></path>
                              <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"></path>
                              <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"></path>
                            </g>
                          </svg>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">No jobs available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;