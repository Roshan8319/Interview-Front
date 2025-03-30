import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [employment, setEmployment] = useState('FT');
  const [formData, setFormData] = useState({
    jobTitle: "", 
    jobRole: "", 
    jobDescription: "", 
    employmentType: "FT", 
    hiringManagerEmail: "", 
    totalPositions: ""
  });
  
  // Error message state
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrorMessage(''); // Clear error message when user makes changes
  };

  // For Essentials
  const [selectedEssentials, setSelectedEssentials] = useState([]);
  const essentialOptions = ['Java', 'OOPS', 'Springboot', 'React.js', 'AWS', 'Kafka'];

  const handleAddEssential = (event) => {
    const value = event.target.value;
    if (value && !selectedEssentials.includes(value)) {
      setSelectedEssentials([...selectedEssentials, value]);
    }
    event.target.value = ''; // Reset the dropdown
  };

  const handleRemoveEssential = (essential) => {
    setSelectedEssentials(selectedEssentials.filter((item) => item !== essential));
  };

  // For Focus Areas
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const focusAreaOptions = ['Frontend', 'Backend', 'DevOps', 'Full Stack', 'Mobile', 'AI/ML', 'Cloud'];

  const handleAddFocusArea = (event) => {
    const value = event.target.value;
    if (value && !selectedFocusAreas.includes(value)) {
      setSelectedFocusAreas([...selectedFocusAreas, value]);
    }
    event.target.value = ''; // Reset the dropdown
  };

  const handleRemoveFocusArea = (area) => {
    setSelectedFocusAreas(selectedFocusAreas.filter((item) => item !== area));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSuccess(false);
    
    // Validate essentials and focusArea
    if (selectedEssentials.length === 0) {
      setErrorMessage("Please select at least one essential skill");
      return;
    }
    
    if (selectedFocusAreas.length === 0) {
      setErrorMessage("Please select at least one focus area");
      return;
    }
    
    // Validate other required fields
    if (!formData.jobTitle || !formData.jobRole || !formData.jobDescription || !formData.hiringManagerEmail || !formData.totalPositions) {
      setErrorMessage("Please fill in all required fields");
      return;
    }
    
    try {
      const dataToSend = {
        ...formData,
        essentials: selectedEssentials.join(','),
        focusArea: selectedFocusAreas.join(','), 
        totalPositions: Number(formData.totalPositions), 
        employmentType: employment,
      };
      
      console.log("Sending data:", dataToSend);
      
      const response = await axios.post(`${baseUrl}/api/v1/client/add-job`, dataToSend, {
        withCredentials: true,
      });
      
      console.log("Response:", response);
      setIsSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        jobTitle: "", 
        jobRole: "", 
        jobDescription: "", 
        employmentType: "FT", 
        hiringManagerEmail: "", 
        totalPositions: ""
      });
      setSelectedEssentials([]);
      setSelectedFocusAreas([]);
      
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      setErrorMessage(error.response?.data?.errorMessage || "Failed to add job. Please try again.");
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7] items-center'>
      <form className='w-[80%] flex items-center mt-10' action="">
        <div className="w-[100%] bg-[rgba(255,255,255,0.34)] grid grid-cols-2 p-8 rounded-2xl">
          
          {/* Success message */}
          {isSuccess && (
            <div className="col-span-2 mb-4 p-2 bg-green-100 text-green-700 rounded">
              Job added successfully!
            </div>
          )}
          
          {/* Error message */}
          {errorMessage && (
            <div className="col-span-2 mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
          
          {/* Left Column */}
          <div className='w-[100%] flex flex-col gap-y-4'>
            <div className='flex flex-col justify-between w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Job Title</label>
              <input 
                type="text" 
                name='jobTitle' 
                placeholder="Enter Job Title" 
                value={formData.jobTitle} 
                onChange={handleChange}    
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
              />
            </div>
            
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Hiring Manager Email</label>
              <input  
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                name='hiringManagerEmail' 
                type="email" 
                value={formData.hiringManagerEmail} 
                onChange={handleChange} 
                placeholder='Enter Email'    
              />
            </div>
            
            <div className='flex flex-col w-[90%] h-fit'>
              <label className='whitespace-nowrap text-[15px]'>Employment Type</label>
              <select  
                name='employmentType' 
                value={employment}  
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                onChange={(e) => setEmployment(e.target.value)} 
              >
                <option value="FullTime">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className='col-span-2 mt-4'>
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Focus Areas</label>
              <div className="flex flex-col">
                <select  
                  className="w-64 py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                  onChange={handleAddFocusArea}
                >
                  <option value="">Select a Focus Area</option>
                  {focusAreaOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFocusAreas.map((area) => (
                    <div key={area} className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                      <span>{area}</span>
                      <button
                        type="button"
                        className="ml-2 text-blue-500"
                        onClick={() => handleRemoveFocusArea(area)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2 mt-4'>
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Essentials</label>
              <div className="flex flex-col">
                <select  
                  className="w-64 py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                  onChange={handleAddEssential}
                >
                  <option value="">Select an Essential</option>
                  {essentialOptions.map((essential) => (
                    <option key={essential} value={essential}>
                      {essential}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEssentials.map((essential) => (
                    <div key={essential} className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                      <span>{essential}</span>
                      <button
                        type="button"
                        className="ml-2 text-orange-500"
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
          </div>

          {/* Right Column */}
          <div className='w-[100%] flex flex-col gap-y-4'>
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Job Role</label>
              <input  
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                name='jobRole' 
                type="text" 
                value={formData.jobRole} 
                onChange={handleChange} 
                placeholder='Enter Job Role'   
              />
            </div>
            
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Total Positions</label>
              <input 
                type="number"  
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200" 
                name='totalPositions' 
                value={formData.totalPositions} 
                onChange={handleChange} 
                placeholder='Enter No. of Positions'  
              />
            </div>
            
            <div className='flex flex-col w-[90%]'>
              <label className='whitespace-nowrap text-[15px]'>Job Description</label>
              <div className='w-[100%]'>
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
      <div >
          {/* Essentials Section */}
          
          
          {/* Focus Areas Section - New Addition */}
          
          </div>
          {/* Submit Button */}
          <div className="col-span-2 flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              type="button"
              className="flex items-center gap-2 text-[#ff7043] bg-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md"
            >
              Add Job →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;