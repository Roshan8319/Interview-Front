import { useState } from 'react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function ViewJob() {
    
        const [isVisible, setIsVisible] = useState(false);
      
        const handleToggle = () => {
          setIsVisible(!isVisible);
        };
     
  return (
      <div className='min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7]  items-center' >
          <div className='p-5 flex ' >
              <div className="w-[30%] p-5  ">
                  
                  <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Job Role</label>
                      <input
                          type="text"
                          value="SDE III"
                          readOnly
                          className="w-[60%] mt-1 p-2 border border-gray-300 rounded-md"
                      />
                  </div>

                  <div className="mb-4 ">
                      <label className="block text-sm font-medium text-gray-700">Interview Time</label>
                      <input
                          type="text"
                          value="60 Minutes"
                          readOnly
                          className="w-[60%] mt-1 p-2 border border-gray-300 rounded-md"
                      />
                  </div>




              </div>
              <div className='w-[70%] p-5 border border-gray-300 rounded-lg shadow ' >
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-[#000000]">Job Description</label>
                      <div className='w-[80%] ' >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis labore adipisci consequatur obcaecati eum mollitia ipsa explicabo, saepe voluptatem voluptatibus asperiores illum magnam consectetur unde vero nemo amet rem repellendus?
                      </div>
                  </div>
              </div>
          </div>
          <div className='w-full p-5 bg-red-300' >
            
          </div>
      </div>   
  )
}

export default ViewJob
