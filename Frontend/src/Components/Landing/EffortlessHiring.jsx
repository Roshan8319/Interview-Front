import React from 'react'
import Blob from '../../assets/Blob.png'
import stars from '../../assets/stars.png'
import video from '../../assets/Video.mp4'

function EffortlessHiring() {
  return (
    <div className='relative p-4 h-screen w-full font-[Montserrat] flex items-center justify-center overflow-hidden' >
      {/* Background blobs */}
      <div className='w-[30%] absolute inset-0 z-[-10] top-[10%] left-[50%]' >
        <img src={Blob} alt="" />
      </div>
      <div className='w-[10%] absolute inset-0 z-[-10] top-[10%] left-[40%]' >
        <img src={stars} alt="" />
      </div>

      <div className='w-full h-full flex justify-center items-start p-10' >
        {/* Content Section */}
        <div className='W-[100%] h-full flex-1 flex flex-col justify-center items-start gap-y-8' >
          <div className='text-[#0F172A] font-bold text-center lg:text-left' >
            <p className='text-[32px] sm:text-[38px] lg:text-[44px]' >Effortless Hiring,</p>
            <p className='text-[28px] sm:text-[32px] lg:text-[38px]' >All in One Powerful Platform.</p>
          </div>
          <div>
            <ul className='text-[16px] sm:text-[18px] lg:text-[20px] font-normal space-y-4' >
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">Est et in pharetra magna adipiscing ornare aliquam.</li>
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">Tellus arcu sed consequat ac velit ut eu blandit.</li>
              <li className="before:content-['✔'] before:mr-2 before:text-[#E65F2B]">Ullamcorper ornare in et egestas dolor orci.</li>
            </ul>
          </div>
          <div className='flex gap-x-2 text-[#E65F2B] text-[20px] font-medium' >
            <p>Find more about the platform</p>
            <div className='flex items-center justify-center'>
              <svg width="25" height="25" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section - Keeping original code untouched */}
        <div className="relative w-full h-full flex-1 flex flex-col justify-center items-center  ">
          <div className="w-full lg:w-[595px] h-[50%] absolute z-[-2] top-9">
            <video
              src={video}
              loop
              muted
              autoPlay
              className="w-full h-full object-cover p-3 rounded-b-[20px]"
            >
              Your browser does not support the video tag.
            </video>
            <div className='absolute flex z-[-10] top-9 translate-x-[-6%] translate-y-[-16%]'>
              <svg width="676" height="469" viewBox="0 0 676 469" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd_576_1625)">
                  <rect x="38" y="15" width="600" height="391" rx="20" fill="white" />
                  <rect x="40.5" y="17.5" width="595" height="386" rx="17.5" stroke="white" stroke-width="5" />
                  <path d="M59 39.6937C56.6987 39.6937 54.8333 37.8283 54.8333 35.527C54.8333 33.2258 56.6987 31.3604 59 31.3604C61.3012 31.3604 63.1666 33.2258 63.1666 35.527C63.1666 37.8283 61.3012 39.6937 59 39.6937Z" fill="#E11D48" />
                  <path d="M74 39.6937C71.6987 39.6937 69.8333 37.8283 69.8333 35.527C69.8333 33.2258 71.6987 31.3604 74 31.3604C76.3012 31.3604 78.1666 33.2258 78.1666 35.527C78.1666 37.8283 76.3012 39.6937 74 39.6937Z" fill="#FBBF24" />
                  <path d="M89 39.6937C86.6987 39.6937 84.8333 37.8283 84.8333 35.527C84.8333 33.2258 86.6987 31.3604 89 31.3604C91.3012 31.3604 93.1666 33.2258 93.1666 35.527C93.1666 37.8283 91.3012 39.6937 89 39.6937Z" fill="#22C55E" />
                </g>
                <defs>
                  <filter id="filter0_dd_576_1625" x="0" y="0" width="676" height="469" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_576_1625" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="12" operator="erode" in="SourceAlpha" result="effect2_dropShadow_576_1625" />
                    <feOffset dy="25" />
                    <feGaussianBlur stdDeviation="25" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_576_1625" result="effect2_dropShadow_576_1625" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_576_1625" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

          {/* Cards Section - Keep Original Position */}
          <div className="hidden lg:flex justify-center w-full h-auto gap-x-5 z-0 absolute translate-y-[30%]">
            <div className="w-[25%] py-3 px-3 border flex flex-col flex-wrap gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#6B21A8] bg-[#F3E8FF]">Featured</div>
              <div className="text-[16px] font-medium">The Map of Efficient Tech Hiring with AI</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
              </div>
            </div>
            <div className="w-[25%] py-3 px-3 border flex flex-col flex-wrap gap-y-2 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#1E40AF] bg-[#DBEAFE]">Popular</div>
              <div className="text-[16px] font-medium">Smart Screening</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Aliquam ut euismod condimentum elementum ultricies volutpat sit non.
              </div>
              <div className="text-[14px] text-[#2563EB] w-auto border flex justify-center p-1 rounded-[8px] border-[#2563EB]">
                Take Lessons
              </div>
            </div>
            <div className="w-[25%] py-3 px-3 border flex flex-col flex-wrap gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#166534] bg-[#DCFCE7]">Featured</div>
              <div className="text-[16px] font-medium">International & commercial law</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
              </div>
            </div>
          </div>

          {/* Mobile Cards - Stacked Version */}
          <div className="flex lg:hidden flex-col w-full gap-4 mt-[60%] px-4">
            <div className="w-full py-3 px-3 border flex flex-col flex-wrap gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#6B21A8] bg-[#F3E8FF]">Featured</div>
              <div className="text-[16px] font-medium">The Map of Efficient Tech Hiring with AI</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
              </div>
            </div>
            <div className="w-full py-3 px-3 border flex flex-col flex-wrap gap-y-2 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#1E40AF] bg-[#DBEAFE]">Popular</div>
              <div className="text-[16px] font-medium">Smart Screening</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Aliquam ut euismod condimentum elementum ultricies volutpat sit non.
              </div>
              <div className="text-[14px] text-[#2563EB] w-auto border flex justify-center p-1 rounded-[8px] border-[#2563EB]">
                Take Lessons
              </div>
            </div>
            <div className="w-full py-3 px-3 border flex flex-col flex-wrap gap-y-1 border-[#FFFFFF] shadow-lg rounded-[10px] bg-[#FFFFFF]">
              <div className="w-fit p-1 text-[#166534] bg-[#DCFCE7]">Featured</div>
              <div className="text-[16px] font-medium">International & commercial law</div>
              <div className="text-[14px] text-[#475569] font-normal">
                Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EffortlessHiring
