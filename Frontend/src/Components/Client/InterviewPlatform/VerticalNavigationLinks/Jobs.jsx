import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  const rows = [
    'SDE-II',
    'SDE-III',
    'SDET-II',
    'SDET-I',
    'EM',
    'PE',
    'DEVOPS-II',
    'SDE-I',
    'QA-I',
    'QA-II',
  ];
  const jobData = [
  { title: "Software Development Engineer (SDE-I)", candidates: 40 },
  { title: "Software Development Engineer (SDE-III)", candidates: 40 },
  { title: "Engineering Manager", candidates: 40 },
  { title: "Product Manager", candidates: 40 },
  { title: "Development Operations (DevOps-I)", candidates: 40 },
  { title: "Software Development Engineer in Testing (SDET-I)", candidates: 40 },
];

  const handleArchiveClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-[100%] h-[100%] bg-[#EBDFD7] ' >
    <div className='flex flex-col gap-y-4'>
      <div className='' >
        <div className="flex flex-col w-full justify-end sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 ml-auto">
          {/* Search Input */}
          <div className="flex items-center rounded-full px-4 py-2 w-[446px] border-gray-300 border focus-within:border-blue-700">
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



          {/* Add Client Button */}
          <button
            className="flex items-center justify-center space-x-2 bg-[#007AFF] text-white px-4 py-2 rounded-full text-sm font-medium w-full sm:w-auto shadow-[2px_4px_15px_rgba(5,109,220,0.5)]"
            onClick={() => navigate(`${location.pathname}/addcandidate`)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span> Add Job</span>
          </button>
        </div>
      </div>







      <div className=' w-[100%] bg-[] border rounded-lg ' > 
        <div>
          <div className='font-bold text-[18px] ' >Details</div>
          <div>
            <table className='w-[100%] h-[100%] ' >
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-4 max-w-max text-start font-medium text-black ">Jobs</th>
                <th className="py-2 px-4 max-w-max font-medium text-black whitespace-nowrap ">Active Candidates</th>
                
              </tr>
            </thead>
            <tbody>
              {jobData.map((job, index) => (
                <tr key={index} className="border-b">
                  <td className=" py-2 px-4 max-w-max text-start ">{job.title}</td>
                  <td className=" py-2 px-4 max-w-max text-center ">{job.candidates}</td>
                  <td className=" py-2 px-4 max-w-max flex gap-32 ml-40 ">
                    <button >
                      <div className='bg-white px-2 py-1 border rounded-full text-[15px] text-gray-500 ' >
                      View↗
                      </div>
                    </button>
                    <button > <div className='bg-white px-2 py-1 border rounded-full text-[15px] text-gray-500 whitespace-nowrap ' > + Add Candidates </div></button>
                  </td>
                  <td className='py-2 px-4 max-w-max text-center ml-[50%] ' >
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Glyph" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"></path><path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"></path><path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"></path></g></svg>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>

      </div>




     
     




    </div>
    </div>
  )
}


export default Jobs;
