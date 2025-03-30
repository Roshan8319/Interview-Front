import React from "react";

import Lottie from "lottie-react"; 
import loaderAnimation from "../assets/Recrumeta-2loader.json"; 

function Load() {
  
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <Lottie
        animationData={loaderAnimation} 
        loop={true}
        
        style={{width:"1080", height:"1080" }}
      />
    </div>
  );
}

export default Load;
