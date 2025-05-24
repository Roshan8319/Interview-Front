import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VisitorDisableWrapper } from '../Hooks/VisitorGuard';

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
    if (storedJobId) {
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
    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-2 sm:p-4 flex flex-col'>
      <div className='flex flex-col gap-y-4 p-1 sm:p-2'>
        <div>
          <div className="flex flex-col w-full sm:flex-row sm:items-center space-y-4 sm:space-y-0">
            {/* Spacer that takes up available space and pushes elements to the right */}
            <div className="hidden sm:block sm:flex-grow"></div>

            {/* Search Input - positioned with specific margin */}
            <div className="flex items-center rounded-full px-3 sm:px-4 py-2 mt-3 sm:mt-0 w-full sm:w-[350px] md:w-[400px] lg:w-[446px] bg-[#fff] border-gray-300 border focus-within:border-orange-500 sm:mr-[20px]">
              <input
                type="text"
                placeholder="Search jobs..."
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
            <VisitorDisableWrapper>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate(`${location.pathname}/addjob`)}
                  className="relative w-[160px] h-10 flex items-center rounded-full border-[1px] border-[#E65F2B] overflow-hidden bg-[#ffffff] cursor-pointer transition-all duration-300 hover:bg-[#E65F2B] active:border-[#E65F2B] group"
                >
                  <span className="pl-2 absolute left-5 text-[#E65F2B] font-semibold transition-all duration-300 group-hover:text-transparent">
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
            </VisitorDisableWrapper>
          </div>
        </div>

        {/* Responsive Table that converts to cards on mobile */}
        <div className='w-full'>
          {/* Desktop Table - hidden on mobile */}
          <div className='hidden sm:block w-full bg-[rgba(255,255,255,0.34)] rounded-xl shadow-md'>
            <table className='w-full'>
              <thead>
                <tr className="border-b-2 border-[#E65F2B]/20">
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[#E65F2B]">Jobs</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[#E65F2B]">Active Candidates</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[#E65F2B]" colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((job, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-[#F6F1EE]/50 transition-colors">
                      <td className="py-3 px-3 sm:px-6 text-center">{job.jobRole}</td>
                      <td className="py-3 px-3 sm:px-6 text-center">{job.candidateCount}</td>
                      <td className="py-3 px-3 sm:px-6 flex flex-row gap-3 md:gap-4 lg:gap-6 justify-center">
                        <button onClick={() => navigate(`${location.pathname}/viewjob`)} className="sm:w-auto">
                          <div className='bg-white text-[#E65F2B] flex items-center justify-center px-3 sm:px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group'>
                            View
                            <div className='flex items-center justify-center'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.2291 4.99136C7.2291 4.64619 7.50892 4.36636 7.8541 4.36636L15.0077 4.36636C15.1734 4.36636 15.3324 4.43221 15.4496 4.54942C15.5668 4.66663 15.6327 4.8256 15.6327 4.99136L15.6327 12.1449C15.6327 12.4901 15.3528 12.7699 15.0077 12.7699C14.6625 12.7699 14.3827 12.4901 14.3827 12.1449L14.3827 5.61636L7.8541 5.61636C7.50892 5.61636 7.2291 5.33654 7.2291 4.99136Z" fill="#E65F2B" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.54839 15.4507C4.30431 15.2066 4.30431 14.8108 4.54839 14.5668L14.4656 4.6496C14.7096 4.40552 15.1054 4.40552 15.3494 4.6496C15.5935 4.89367 15.5935 5.2894 15.3494 5.53348L5.43227 15.4507C5.18819 15.6947 4.79246 15.6947 4.54839 15.4507Z" fill="#E65F2B" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        <VisitorDisableWrapper>
                          <button onClick={() => handleAddCandidate(job.jobId)} className="sm:w-auto">
                            <div className='bg-white text-[#E65F2B] flex items-center justify-center px-3 sm:px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group'>
                              Add Candidate
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E65F2B"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                              </span>
                            </div>
                          </button>
                        </VisitorDisableWrapper>
                      </td>
                      <td className="py-3 px-1 w-10 text-center">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Glyph" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"></path>
                            <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"></path>
                            <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-md text-[#797979]">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - visible only on mobile */}
          <div className="sm:hidden space-y-4 mb-4">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((job, index) => (
                <div key={index} className="bg-[rgba(255,255,255,0.34)] rounded-xl p-4 shadow-md">
                  <div className="flex justify-between items-center border-b border-[#E65F2B]/10 pb-2 mb-3">
                    <h3 className="font-medium text-[#E65F2B]">{job.jobRole}</h3>
                    <button className="p-1.5 hover:bg-gray-100 rounded-full">
                      <svg fill="#000000" width="16px" height="16px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Glyph" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"></path>
                        <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"></path>
                        <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Active Candidates</span>
                    <span className="font-medium mr-3">{job.candidateCount}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate(`${location.pathname}/viewjob`)} className="w-full">
                      <div className='bg-white text-[#E65F2B] flex items-center justify-center px-4 py-2 rounded-full gap-x-2 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out'>
                        View
                        <div className='flex items-center justify-center'>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.2291 4.99136C7.2291 4.64619 7.50892 4.36636 7.8541 4.36636L15.0077 4.36636C15.1734 4.36636 15.3324 4.43221 15.4496 4.54942C15.5668 4.66663 15.6327 4.8256 15.6327 4.99136L15.6327 12.1449C15.6327 12.4901 15.3528 12.7699 15.0077 12.7699C14.6625 12.7699 14.3827 12.4901 14.3827 12.1449L14.3827 5.61636L7.8541 5.61636C7.50892 5.61636 7.2291 5.33654 7.2291 4.99136Z" fill="#E65F2B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.54839 15.4507C4.30431 15.2066 4.30431 14.8108 4.54839 14.5668L14.4656 4.6496C14.7096 4.40552 15.1054 4.40552 15.3494 4.6496C15.5935 4.89367 15.5935 5.2894 15.3494 5.53348L5.43227 15.4507C5.18819 15.6947 4.79246 15.6947 4.54839 15.4507Z" fill="#E65F2B" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    <VisitorDisableWrapper>
                      <button onClick={() => handleAddCandidate(job.jobId)} className="w-full">
                        <div className='bg-white text-[#E65F2B] flex items-center justify-center px-4 py-2 rounded-full gap-x-2 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out'>
                          Add Candidate
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#E65F2B"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                          </span>
                        </div>
                      </button>
                    </VisitorDisableWrapper>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[rgba(255,255,255,0.34)] rounded-xl p-6 shadow-md text-center text-md text-[#797979]">
                No Data Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;