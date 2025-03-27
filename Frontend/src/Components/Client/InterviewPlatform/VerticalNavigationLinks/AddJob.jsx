import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {

  const baseUrl = import.meta.env.VITE_BASE_URL


  const [employment,setEmployment] = useState('FT');
  const [formData, setFormData] = useState({jobTitle:"", jobRole:"",jobDescription:"", employmentType:"FT", hiringManagerEmail:"", totalPositions:"", essentials:[]})
  const handleChange =(e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      
      console.log(baseUrl);
      const dataToSend = {
        ...formData,
        essentials: selectedEssentials.join(','), 
        totalPositions: Number(formData.totalPositions), 
        employmentType: employment,
      }
      console.log(dataToSend);
      const response = await axios.post(`${baseUrl}/api/v1/client/add-job`, dataToSend, {
        withCredentials: true, // Ensures cookies are sent
        
      });
      console.log(response);
      
      console.log("job added");
      
    } catch (error) {
      console.log(error,"something error in submit");
      
    }

   

  }


  const [selectedEssentials, setSelectedEssentials] = useState([]);
  const essentialOptions = ['Java', 'OOPS', 'Springboot', 'React.js', 'AWS', 'Kafka'];

  const handleAddEssential = (event) => {
    const value = event.target.value;
    if (value && !selectedEssentials.includes(value)) {
      setSelectedEssentials([...selectedEssentials, value]);
    }
    event.target.value = ''; // Reset the dropdown to the default option
  };

  const handleRemoveEssential = (essential) => {
    setSelectedEssentials(selectedEssentials.filter((item) => item !== essential));
  };

  

  

  return (
    <div className=' min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7]  items-center  ' >
        
    
      <form className='w-[80%] flex items-center  mt-10 ' action="">
      <div className=" w-[100%] bg-[rgba(255,255,255,0.34)]   grid grid-cols-2  p-8 rounded-2xl ">
        <div className=' w-[100%] flex flex-col gap-y-4' >
            <div className='flex flex-col justify-between w-[90%] '  >
            <label  className='whitespace-nowrap text-[15px] ' >Job Title</label>
            <input type="text" name='jobTitle' placeholder="Enter Job Title" value={formData.jobTitle} onChange={handleChange}    
            className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" />
          </div>
          <div className='flex flex-col w-[90%]' >
          <label  className='whitespace-nowrap text-[15px] ' >Hiring Manager Email</label>
          <input  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" name='hiringManagerEmail' type="email" value={formData.hiringManagerEmail} onChange={handleChange} placeholder='Enter Email'    />
          </div>
          <div className='flex flex-col w-[90%] h-fit '>
        <label className='whitespace-nowrap text-[15px]' >Employment Type</label>
        <select  name='employmentType' value={formData.employment}  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" onChange={(e)=>setEmployment(e.target.value)} >
          <option value="FT">Full Time</option>
          <option value="INT">Internship</option>
        </select>
      </div>
          

        </div>



{/* //kjhsfjhjshkfhkjsh */}
        <div className=' w-[100%] flex flex-col gap-y-4' >
        <div className='flex flex-col w-[90%]  '  >
        <label  className='whitespace-nowrap text-[15px]' >Job Role</label>
        <input  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" name='jobRole' type="text" value={formData.jobRole} onChange={handleChange} placeholder='Enter Job Role'   />
      </div>
      <div className='flex flex-col w-[90%]'>
        <label className='whitespace-nowrap text-[15px]' >Total Positions</label>
        <input type="number"  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" name='totalPositions' value={formData.totalPositions} onChange={handleChange} placeholder='Enter No. of Positions'  />
      </div>
      
      <div className='flex flex-col w-[90%]' >
  <label className='whitespace-nowrap text-[15px]' >Job Description</label>
  <div className='w-[100%]  ' >
    <textarea
      placeholder="Paste Job Description Here"
      rows="4"
      name='jobDescription'
      value={formData.jobDescription}
      onChange={handleChange}
       className="w-[100%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
    ></textarea>
  </div>
</div>
          

        </div>
      
     <div className= '' >
     <div className='flex flex-col w-[90%]'>
        <label className='whitespace-nowrap text-[15px]' >Essentials</label>
        <div style={{ width: '60%' }}>
          <select  name='essentials'  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" onChange={handleAddEssential}>
            <option value="">Select an Essential</option>
            {essentialOptions.map((essential) => (
              <option key={essential} value={essential}>
                {essential}
              </option>
            ))}
          </select>
          <div>
            {selectedEssentials.map((essential) => (
              <div key={essential} >
                {essential}
                <button
                  
                  onClick={() => handleRemoveEssential(essential)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <div>
      <div className='flex flex-col w-[90%]'>
        <label className='whitespace-nowrap text-[15px]' >Essentials</label>
        <div style={{ width: '60%' }}>
          <select  name='essentials'  className=" py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" onChange={handleAddEssential}>
            <option value="">Select an Essential</option>
            {essentialOptions.map((essential) => (
              <option key={essential} value={essential}>
                {essential}
              </option>
            ))}
          </select>
          <div>
            {selectedEssentials.map((essential) => (
              <div key={essential} >
                {essential}
                <button
                  
                  onClick={() => handleRemoveEssential(essential)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
     </div>
     <div></div>
     <div className="flex justify-end mt-3">
          <button className="flex items-center gap-2 text-[#ff7043] bg-white px-6 py-3 rounded-full text-sm font-medium shadow-md">
            Next →
          </button>
        </div>

      
      

      
      
   

      
      
            
            </div>
      </form>
   
    <div className=' '   >
              
        

    </div>
    </div>
  );
};

export default AddJob;
