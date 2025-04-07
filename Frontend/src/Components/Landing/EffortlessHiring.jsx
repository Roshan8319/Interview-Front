import React from 'react'
import Blob from '../../assets/Blob.png'
import stars from '../../assets/stars.png'
import video from '../../assets/Video.mp4'

function EffortlessHiring() {
  return (
    <div className='relative p-4 min-h-screen w-full font-[Montserrat] flex flex-col lg:flex-row items-center justify-center overflow-hidden'>
      {/* Background blobs */}
      <div className='w-[30%] absolute inset-0 z-[-10] top-[10%] left-[50%] hidden sm:block'>
        <img src={Blob} alt="" />
      </div>
      <div className='w-[10%] absolute inset-0 z-[-10] top-[10%] left-[40%]'>
        <img src={stars} alt="" />
      </div>

      <div className='w-full h-full flex flex-col lg:flex-row justify-center items-center p-4 lg:p-10'>
        {/* Content Section */}
        <div className='w-full lg:w-[50%] h-full flex-1 flex flex-col justify-center items-start gap-y-4 lg:gap-y-8'>
          <div className='text-[#0F172A] font-bold text-center lg:text-left'>
            <p className='text-[24px] sm:text-[32px] lg:text-[44px]'>
              <span className='text-[#E0470C]'>Effortless</span> Hiring,</p>
            <p className='text-[20px] sm:text-[28px] lg:text-[38px]'>All in One Powerful Platform.</p>
          </div>
          {/* Vector */}
          {/* <div className="hidden lg:block absolute z-[-10] top-[35%] left-[4%]">
            <svg width="252" height="23" viewBox="0 0 252 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8.96207C33.2835 6.54298 150.795 1.83804 247 8.96209C197.061 8.96209 131.996 9.68245 90.1024 17.187" stroke="#E65F2B" stroke-width="10" stroke-linejoin="round" />
            </svg>
          </div> */}
          <div>
            <ul className='text-[14px] sm:text-[16px] lg:text-[20px] font-normal space-y-2 sm:space-y-4'>
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">Streamline your hiring process from start to finish.</li>
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">Save time, reduce costs, and hire top talent seamlessly.</li>
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">A complete solution for efficient, data-driven recruitment.</li>
            </ul>
          </div>
          <div className='flex gap-x-2 text-[#E65F2B] text-[16px] sm:text-[20px] font-medium'>
            <p>Find more about the platform</p>
            <div className='flex items-center justify-center'>
              <svg width="25" height="25" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full lg:w-[50%] h-full flex-1 flex flex-col justify-center items-center mt-8 lg:mt-0">
          {/* Video and SVG Wrapper */}
          <div className="relative w-full lg:w-[595px] h-auto flex flex-col items-center bg-[#FFFFFF] rounded-[20px] shadow-lg">
            {/* Browser-like SVG (Red, Yellow, Green buttons) */}
            <div className="flex justify-start items-center w-full px-3 sm:px-5 py-1 sm:py-2 bg-[#F3F4F6] rounded-t-[20px]">
              <div className="flex gap-1 sm:gap-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#E11D48]"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FBBF24]"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#22C55E]"></div>
              </div>
            </div>

            {/* Video */}
            <video
              src={video}
              loop
              muted
              autoPlay
              className="w-full h-auto object-cover p-2 rounded-b-[20px] shadow-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col lg:flex-row justify-center w-full h-auto gap-4 lg:gap-x-5 mt-8 lg:mt-[-10%] z-10">
            <div className="w-full lg:w-[25%] py-3 px-3 border flex flex-col gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#6B21A8] bg-[#F3E8FF] rounded-md">Featured</div>
              <div className="text-[14px] sm:text-[16px] font-medium">The Map of Efficient Tech Hiring with AI</div>
              <div className="text-[12px] sm:text-[14px] text-[#475569] font-normal">
                Navigate seamless hiring with AI-driven assessments, expert interviews, and data insights.
              </div>
            </div>
            <div className="w-full lg:w-[25%] py-3 px-3 border flex flex-col gap-y-2 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#1E40AF] bg-[#DBEAFE] rounded-md">Popular</div>
              <div className="text-[14px] sm:text-[16px] font-medium">Smart Screening</div>
              <div className="text-[12px] sm:text-[14px] text-[#475569] font-normal">
                Effortlessly filter top talent with intelligent, data-driven assessments. Optimize candidate selection and save valuable time in the hiring process.              </div>
            </div>
            <div className="w-full lg:w-[25%] py-3 px-3 border flex flex-col gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#166534] bg-[#DCFCE7] rounded-md">Featured</div>
              <div className="text-[14px] sm:text-[16px] font-medium">Global Talent Acquisition</div>
              <div className="text-[12px] sm:text-[14px] text-[#475569] font-normal">
                Hire the best talent worldwide with seamless, efficient, and scalable recruitment solutions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EffortlessHiring