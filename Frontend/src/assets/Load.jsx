import React from 'react'
import loadingAnim from "../assets/loading.webp"

function Load() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center ' >
            <img className='flex items-center justify-center  ' src={loadingAnim} alt='Loading Animation' />
    </div>
  )
}

export default Load;
