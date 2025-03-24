import React from "react";

import Lottie from "lottie-react"; 
import loaderAnimation from "../assets/Recrumeta-2Loader.json"; 

function Load() {
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie
        animationData={loaderAnimation} 
        loop={true}
        
        style={{width:"1080", height:"1080" }}
      />
    </div>
  );
}

export default Load;
