import React from 'react';
import { useEffect } from 'react';
import {motion, useAnimation} from 'framer-motion';

//variants

import { useInView } from 'react-intersection-observer';

const styles = {
  shadow1: {
    boxShadow: '0 0px 6px #c1c1c1, 0 -0px 0px #c1c1c1, 0px 0 0px #c1c1c1, -0px 0 6px #c1c1c1'
  }
};


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
  const controls4 = useAnimation();

  const [ref1, inView1] = useInView({
    triggerOnce: true, 
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true, 
  });
  const [ref3, inView3] = useInView({
    triggerOnce: true, 
  });
  const [ref4, inView4] = useInView({
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
    if (inView4) {
      controls4.start("show"); 
    }
  }, [controls1, inView1, controls2, inView2, controls3, inView3, controls4, inView4]);

  return (
    <div className=' min-h-[calc(100vh-64px)] bg-[#EBDFD7]  p-1 pt-4 grid grid-cols-2'>
      {/* Pending Task */}

      <div className='pendingTaskContainer p-4 w-full flex flex-col items-center'>
      <motion.div
           ref={ref1} 
           variants={fadeIn('right', 0.2)} 
           initial="hidden"
           animate={controls1} 
        className='flex ' >
        <div className='ml-[5%]'>
          <div className='pendingTaskHeading'>
            <h1 className='text-[18px] font-semibold text-[#E65F2B]'>Pending Task <span className='text-white text-sm font-normal bg-[#E65F2B] px-2 py-2 rounded-full'>38</span></h1>
          </div>
          <div className='pendingTaskBox mt-5'>
            <div className="p-6 bg-[#ffffff57] rounded-xl w-[400px] h-[246px] transition ease-linear delay-150 hover:-translate-y-0 hover:scale-110 shadow "  >
              <div className="grid grid-cols-2 gap-2 md:gap-4 gap-y-4 md:gap-y-6 text-center overflow-auto">
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">SDE II</p>
                  <p className="text-lg md:text-sm font-bold">12</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">SDE III</p>
                  <p className="text-lg md:text-sm font-bold">8</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">SDET I</p>
                  <p className="text-lg md:text-sm font-bold">25</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">EM</p>
                  <p className="text-lg md:text-sm font-bold">6</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">SDE I (Frontend)</p>
                  <p className="text-lg md:text-sm font-bold">10</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">SDE II (Frontend)</p>
                  <p className="text-lg md:text-sm font-bold">34</p>
                </div>
              </div>

            </div>
          </div>
        </div>
    </motion.div>

      </div>

      {/* All Task */}
      <div className='pendingTaskContainer p-4 w-full flex flex-col items-center'>
      <motion.div
             ref={ref2}
             variants={fadeIn('left',0.1)}
             initial="hidden"
             animate={controls2}
             
             className='flex ' >
        <div className='ml-[5%] flex-grow flex flex-col'>
          <div className='pendingTaskHeading'>
          <h1 className='text-[18px] font-semibold text-[#E65F2B]'>All Task <span className='text-white text-sm font-normal  bg-[#E65F2B] px-2 py-2 rounded-full'>38</span></h1>
          </div>
          <div className='pendingTaskBox mt-5 '>
            <div className="p-6 bg-[#FFFFFF57] shadow rounded-xl w-[400px] h-[246px] transition ease-linear delay-150 hover:-translate-y-0 hover:scale-110 " >
              <div className="grid grid-cols-2 gap-2 md:gap-4 gap-y-4 md:gap-y-6 text-center overflow-auto">
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Total Interviews</p>
                  <p className="text-lg md:text-sm font-bold">12</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Pending Schedule</p>
                  <p className="text-lg md:text-sm font-bold">8</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Selects</p>
                  <p className="text-lg md:text-sm font-bold">25</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Joined</p>
                  <p className="text-lg md:text-sm font-bold">6</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        </motion.div>

      </div>


      {/* My Jobs */}
      <div className='pendingTaskContainer p-4 w-full flex flex-col items-center'>
      <motion.div 
              ref={ref3}
              variants={fadeIn('right',0.1)}
              initial="hidden"
              animate={controls3}

        className='flex' > 
        <div className='ml-[5%] flex-grow flex flex-col  '>
          <div className='pendingTaskHeading'>
            <h1 className='text-[18px] font-semibold text-[#E65F2B]'>My Jobs </h1>
          </div>
          <div className='pendingTaskBox mt-5 '>
            <div  className="p-6 bg-[#FFFFFF57] shadow rounded-xl w-[400px] h-[170px] transition ease-linear delay-150 hover:-translate-y-0 hover:scale-110" >
              <div className="grid grid-cols-2 gap-2 md:gap-4 gap-y-4  md:gap-y-6 text-center overflow-auto">
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">My Jobs</p>
                  <p className="text-lg md:text-sm font-bold">50</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Total Candidates</p>
                  <p className="text-lg md:text-sm font-bold">650</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Selected Candidates</p>
                  <p className="text-lg md:text-sm font-bold">340</p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Rejected Candidates</p>
                  <p className="text-lg md:text-sm font-bold">244</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
      </div>


      {/* Analytics */}
      <div className='pendingTaskContainer p-4 w-full flex flex-col items-center'>
      <motion.div 
             ref={ref4}
             variants={fadeIn('left',0.1)}
             initial="hidden"
             animate={controls4}
            className='flex' >
        <div className='ml-[5%] flex-grow flex flex-col '>
          <div className='pendingTaskHeading text-start '>
            <h1 className='text-[18px] font-semibold text-[#E65F2B]'>Analytics</h1>
          </div>
          <div className='pendingTaskBox mt-5 '>
            <div  className="p-6 bg-[#FFFFFF57] shadow rounded-xl w-[400px] h-[170px] transition ease-linear delay-150 hover:-translate-y-0 hover:scale-110">
              <div className="grid grid-cols-2 gap-2 md:gap-4 gap-y-4  md:gap-y-6 text-left overflow-auto">
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Companies with More Selects</p>
                  <p className="text-lg md:text-sm font-bold"></p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Diversity Ratio</p>
                  <p className="text-lg md:text-sm font-bold"></p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Role Wise Company Selects</p>
                  <p className="text-lg md:text-sm font-bold"></p>
                </div>
                <div className='p-1 flex flex-col items-start '>
                  <p className="text-base md:text-sm">Interview Declined</p>
                  <p className="text-lg md:text-sm font-bold"></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
      </div>



    </div>
  )
}

export default Dashboard
