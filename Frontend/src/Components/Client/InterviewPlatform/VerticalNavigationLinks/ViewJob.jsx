import { useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function ViewJob() {
    
        const [isVisible, setIsVisible] = useState(false);
      
        const handleToggle = () => {
          setIsVisible(!isVisible);
        };
     
  return (

    <div className='w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-4 flex flex-col' >
    <div className=" w-[70%] max-w-md mx-auto p-5 ">
    
    
    <div className="mb-4 flex items-center justify-center gap-4 ">
      <div className='w-[30%]' >
      <label className="text-[15px] font-medium text-gray-700 whitespace-nowrap ">Job Role</label>
      </div>
      <div className='w-[70%]' >
      <input
        type="text"
        value="SDE III"
        readOnly
        className="w-full text-[15px] p-1 border border-gray-300 rounded-md"
      />
      </div>
    </div>

    <div className="mb-4 flex items-center justify-center gap-4">
    <div className='w-[30%]' >
        <label className="text-[15px] font-medium text-gray-700 whitespace-nowrap ">Interview Time</label>
       </div>
       <div className='w-[70%]' >
      <input
        type="text"
        value="60 Minutes"
        readOnly
        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
      />
      </div>
    </div>

    <div className="mb-4 flex items-center justify-center gap-4">
    <div className='w-[30%]' >
      <label className=" text-[15px] font-medium text-gray-700 whitespace-nowrap ">Job Description</label>
      </div>
      <div className='w-[70%]' >
      <button  onClick={handleToggle}
        className="w-full mt-1 p-2 bg-[rgb(255,255,255)] text-[#ff7043] font-medium rounded-full "
      >
        Click to View
      </button>
      </div>
    </div>
    {isVisible && (
        <div className="max-w-md mx-auto p-5 border bg-[rgba(255,255,255,0.34)] border-gray-300 rounded-lg shadow mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam porro at iste. Aliquid voluptatum assumenda veritatis,
          similique quibusdam molestiae. Nesciunt quisquam facilis dolorum vitae quis at natus illo dicta neque.
        </div>
      )}

    
  </div>
  </div>
  )
}

export default ViewJob
