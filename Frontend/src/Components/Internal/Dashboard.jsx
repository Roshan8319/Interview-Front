import React from 'react'
import { useEffect } from 'react';
import {motion, useAnimation} from 'framer-motion';

//variants

import { useInView } from 'react-intersection-observer';

function Dashboard() {

   function fadeIn(direction, delay) {
      let hidden = { opacity: 0 };
      
      if (direction === 'up') hidden.y = 20;
      else if (direction === 'down') hidden.y = -20;
      else if (direction === 'left') hidden.x = 80;
      else if (direction === 'right') hidden.x = -80;
      else {
          hidden.y = 0;
          hidden.x = 0;
      }
  
      const show = {
          y: 0,
          x: 0,
          opacity: 1,
          transition: {
              type: 'tween',
              duration: 1.2,
              delay: delay,
              ease: [0.25, 0.25, 0.25, 0.75],
          },
      };
  
      return { hidden, show };
  }
  
  //Animation
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

     const [ref1, inView1] = useInView({
        triggerOnce: true, 
      });
      const [ref2, inView2] = useInView({
        triggerOnce: true, 
      });
      const [ref3, inView3] = useInView({
        triggerOnce: true, 
      });

      useEffect(() => {
          if (inView1) {
            controls1.start("show"); 
          }
          if (inView2) {
            controls2.start("show"); 
          }
          if (inView3) {
            controls3.start("show"); 
          }
        }, [controls1, inView1, controls2, inView2, controls3, inView3]);

  return (
    <div className='flex h-full overflow-hidden px-4 min-h-[calc(100vh-64px)] bg-[#EBDFD7]  p-1 pt-4 '>
      <div class="flex flex-col w-1/2 p-4 ml-4 h-full ">
        <motion.div
                   ref={ref1} 
                   variants={fadeIn('right', 0.2)} 
                   initial="hidden"
                   animate={controls1} 
                className='' >
        <div className='text-black'>
          <div className='pendingTaskHeading  '>
            <h1 className='text-[16px] text-[#E65F2B] font-bold'>
              Interviewers
              <span className='text-white text-sm font-normal bg-[#E65F2B] ml-2 px-2 py-2 rounded-full'>38</span>
            </h1>
          </div>
          <div className='pendingTaskBox mt-4'>
            <div className="p-3 shadow bg-[#ffffff57] text-black  rounded-lg w-[90%]">
              <div className="grid grid-cols-2 gap-2 text-center overflow-auto">
                <div>
                  <p className="text-sm">Pending Acceptance</p>
                  <p className="text-base font-semibold">12</p>
                </div>
                <div>
                  <p className="text-sm">Interview Decline</p>
                  <p className="text-base font-semibold">8</p>
                </div>
                <div>
                  <p className="text-sm">Recommended</p>
                  <p className="text-base font-semibold">25</p>
                </div>
                <div>
                  <p className="text-sm">Rejected</p>
                  <p className="text-base font-semibold">6</p>
                </div>
                <div>
                  <p className="text-sm">Strong Candidates</p>
                  <p className="text-base font-semibold">10</p>
                </div>
                <div>
                  <p className="text-sm">Scheduled</p>
                  <p className="text-base font-semibold">34</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>

        <motion.div
           ref={ref2}
           variants={fadeIn('right',0.2)}
           initial="hidden"
           animate={controls2}
           
           className='' >
        <div className=' mt-8'>
          <div className='pendingTaskHeading'>
            <h1 className='text-[16px] text-[#E65F2B] font-bold'>
              Clients
            </h1>
          </div>
          <div className='pendingTaskBox mt-2'>
            <div className="p-3 shadow bg-[#ffffff57] rounded-lg w-[90%]">
              <div className="grid grid-cols-2 gap-2 text-center text-black overflow-auto">
                <div>
                  <p className="text-sm">Active Clients</p>
                  <p className="text-base font-semibold">12</p>
                </div>
                <div>
                  <p className="text-sm">Passive Clients</p>
                  <p className="text-base font-semibold">8</p>
                </div>
                <div>
                  <p className="text-sm">Pending Onboardings</p>
                  <p className="text-base font-semibold">25</p>
                </div>
                <div>
                  <p className="text-sm">Client Users</p>
                  <p className="text-base font-semibold">6</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>

         <motion.div 
                      ref={ref3}
                      variants={fadeIn('right',0.2)}
                      initial="hidden"
                      animate={controls3}
        
                className='' > 
        <div className=' mt-8'>
          <div className='pendingTaskHeading'>
            <h1 className='text-[16px] text-[#E65F2B] font-bold'>
              Details
            </h1>
          </div>
          <div className='pendingTaskBox mt-2'>
            <div className="p-3 shadow bg-[#ffffff57] rounded-lg w-[90%]">
              <div className="grid grid-cols-2 gap-2 text-center text-black overflow-auto">
                <div>
                  <p className="text-sm">Total Interviews</p>
                  <p className="text-base font-semibold">12</p>
                </div>
                <div>
                  <p className="text-sm">New Interviews</p>
                  <p className="text-base font-semibold">8</p>
                </div>
                <div>
                  <p className="text-sm">Active Jobs</p>
                  <p className="text-base font-semibold">25</p>
                </div>
                <div>
                  <p className="text-sm">Total Candidates</p>
                  <p className="text-base font-semibold">6</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>






      {/* <div class="w-1/2 p-4 h-full">
        <div className='w-[90%]'>
          <div className='pendingTaskHeading'>
            <h1 className='text-[16px] text-white font-medium'>
              Messages
              <span className='ml-2 text-black bg-[#f0ad4e] px-2 py-0.5 rounded-full text-[12px]'>38</span>
            </h1>
          </div>
          <div className='pendingTaskBox mt-4'>
            <div className="p-3 bg-gradient-to-r from-[#3d4248] to-[#505860]  h-full rounded-lg flex flex-col items-center justify-center gap-y-2">
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
              <div className='w-11/12 h-14 bg-[#2a2e31] rounded-xl'></div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export { Dashboard as InternalDashboard }
