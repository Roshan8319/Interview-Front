import React from 'react'
import Blob from '../../assets/Blob.png'
import stars from '../../assets/stars.png'
import video from '../../assets/Video.mp4'

function EffortlessHiring() {
  return (
    <div className='relative p-4 h-screen w-full font-[Montserrat] flex items-center justify-center overflow-hidden' >
        <div className='w-[30%] absolute inset-0 z-[-10] top-[10%] left-[50%]  ' >
            <img src={Blob} alt="" />
        </div>
        <div className='w-[10%] absolute inset-0 z-[-10] top-[10%] left-[40%]  ' >
            <img src={stars} alt="" />
        </div>
        <div className='w-full h-full flex justify-center items-center ' >
            <div className='W-[100%] h-full flex-1 flex flex-col justify-center items-center gap-y-8' >
                <div className='text-[#0F172A] font-bold' >
                    <p className='text-[44px]' >Effortless Hiring,</p>
                    <p className='text-[38px]' >All in One Powerful Platform.</p>
                </div>
                <div>
                    <ul className='text-[20px] font-normal' >
                        <li class="before:content-['✔'] before:mr-2">Est et in pharetra magna adipiscing ornare aliquam.</li>
                        <li class="before:content-['✔'] before:mr-2">Tellus arcu sed consequat ac velit ut eu blandit.</li>
                        <li class="before:content-['✔'] before:mr-2">Ullamcorper ornare in et egestas dolor orci.</li>
                        
                    </ul>
                </div>
                  <div className=' flex gap-x-2 text-[#2563EB] text-[20px] font-medium ' >
                      <p>Find more about the platform</p>
                     <p><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.586 11.6408L11.636 7.69081C11.4538 7.5022 11.353 7.2496 11.3553 6.9874C11.3576 6.72521 11.4628 6.4744 11.6482 6.28899C11.8336 6.10358 12.0844 5.99841 12.3466 5.99613C12.6088 5.99385 12.8614 6.09465 13.05 6.27681L18.707 11.9338C18.8002 12.0265 18.8741 12.1366 18.9246 12.258C18.9751 12.3793 19.001 12.5094 19.001 12.6408C19.001 12.7722 18.9751 12.9023 18.9246 13.0237C18.8741 13.145 18.8002 13.2552 18.707 13.3478L13.05 19.0048C12.9578 19.1003 12.8474 19.1765 12.7254 19.2289C12.6034 19.2813 12.4722 19.3089 12.3394 19.3101C12.2066 19.3112 12.0749 19.2859 11.952 19.2356C11.8291 19.1853 11.7175 19.1111 11.6236 19.0172C11.5297 18.9233 11.4555 18.8117 11.4052 18.6888C11.3549 18.5659 11.3296 18.4342 11.3307 18.3014C11.3319 18.1686 11.3595 18.0374 11.4119 17.9154C11.4643 17.7934 11.5405 17.6831 11.636 17.5908L15.586 13.6408H6C5.73478 13.6408 5.48043 13.5354 5.29289 13.3479C5.10536 13.1604 5 12.906 5 12.6408C5 12.3756 5.10536 12.1212 5.29289 11.9337C5.48043 11.7462 5.73478 11.6408 6 11.6408H15.586Z" fill="#2563EB" />
                      </svg></p> 

                  </div>
            </div>
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center relative">
  {/* Video Div */}
  <div className="w-[550px] h-[50%] border border-[#000] absolute z-[-2] top-9">
    <video 
      src={video} 
      loop 
      muted 
      autoPlay
      className="w-full h-full object-cover"
    >
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Downward Divs */}
  <div className="flex justify-center w-full h-auto gap-x-5 z-0">
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
</div>
        </div>
        
    </div>
  )
}

export default EffortlessHiring
    