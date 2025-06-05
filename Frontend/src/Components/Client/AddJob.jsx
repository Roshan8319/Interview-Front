import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [employment, setEmployment] = useState('FT');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobRole: "",
    jobDescription: "",
    employmentType: "FT",
    hiringManagerEmail: "",
    totalPositions: ""
  });

  const essentialOptions = ['Java', 'OOPS', 'Springboot', 'React.js', 'AWS', 'Kafka'];
  const focusAreaOptions = ['Frontend', 'Backend', 'DevOps', 'Full Stack', 'Mobile', 'AI/ML', 'Cloud'];
  const [selectedEssentials, setSelectedEssentials] = useState([]);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value) || 0;
    if (numValue < 0) {
      toast.error("Number of positions cannot be negative");
      return;
    }
    setFormData(prev => ({
      ...prev,
      totalPositions: value
    }));
  };

  const handleEmailInput = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData(prev => ({
      ...prev,
      hiringManagerEmail: email
    }));

    if (email && !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
    }
  };

  const handleAddEssential = (event) => {
    const value = event.target.value;
    if (!value) return;

    if (selectedEssentials.includes(value)) {
      toast.error("This skill is already added");
      return;
    }

    setSelectedEssentials(prev => [...prev, value]);
    event.target.value = '';
  };

  const handleAddFocusArea = (event) => {
    const value = event.target.value;
    if (!value) return;

    if (selectedFocusAreas.includes(value)) {
      toast.error("This focus area is already added");
      return;
    }

    setSelectedFocusAreas(prev => [...prev, value]);
    event.target.value = '';
  };

  const handleRemoveEssential = (essential) => {
    setSelectedEssentials(prev => prev.filter(item => item !== essential));
    toast.success(`Removed ${essential} from essential skills`);
  };

  const handleRemoveFocusArea = (area) => {
    setSelectedFocusAreas(prev => prev.filter(item => item !== area));
    toast.success(`Removed ${area} from focus areas`);
  };

  const resetForm = () => {
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
    setEmployment('FT');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.jobTitle) {
      toast.error("Please enter a job title");
      return;
    }
    if (!formData.jobRole) {
      toast.error("Please enter a job role");
      return;
    }
    if (!formData.jobDescription) {
      toast.error("Please enter a job description");
      return;
    }
    if (!formData.hiringManagerEmail) {
      toast.error("Please enter hiring manager's email");
      return;
    }
    if (!formData.totalPositions) {
      toast.error("Please enter number of positions");
      return;
    }
    if (selectedEssentials.length === 0) {
      toast.error("Please select at least one essential skill");
      return;
    }
    if (selectedFocusAreas.length === 0) {
      toast.error("Please select at least one focus area");
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

      const response = await axios.post(`${baseUrl}/api/v1/client/add-job`, dataToSend, {
        withCredentials: true,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Job added successfully!");
        resetForm();
        navigate('/client/jobs');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add job. Please try again.";
      toast.error(errorMessage);
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col p-4 bg-[#EBDFD7] items-center'>
      <Toaster 
        position="bottom-right" 
        closeButton
        richColors
        theme="light"
        duration={3000}
        className="toast-container"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#374151',
            border: '2px solid #e5e7eb',
          },
          success: {
            style: {
              border: '2px solid #359E45',
            },
          },
          error: {
            style: {
              border: '2px solid #EF4444',
            },
          },
        }}
      />
      <form className='w-full sm:w-[90%] md:w-[85%] lg:w-[75%] flex items-center mt-4 sm:mt-10 mb-4' action="">
        <div className="w-full bg-[rgba(255,255,255,0.34)] grid grid-cols-1 md:grid-cols-2 p-4 sm:p-6 md:p-8 rounded-2xl gap-y-4 md:gap-x-10">
          {/* Left Column */}
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-col justify-between'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Job Title</label>
              <input
                type="text"
                name='jobTitle'
                placeholder="Enter Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
              />
            </div>

            <div className='flex flex-col'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Hiring Manager Email</label>
              <input
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                name='hiringManagerEmail'
                type="email"
                value={formData.hiringManagerEmail}
                onChange={handleEmailInput}
                placeholder='Enter Email'
              />
            </div>

            <div className='relative flex flex-col'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Employment Type</label>
              <select
                name='employmentType'
                value={employment}
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200 appearance-none cursor-pointer"
                onChange={(e) => setEmployment(e.target.value)}
              >
                <option value="FullTime">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
              <div className='absolute right-[5%] top-[60%]'>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className='flex flex-col'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Job Description</label>
              <div className='w-full'>
                <textarea
                  placeholder="Paste Job Description Here"
                  rows="4"
                  name='jobDescription'
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                ></textarea>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-col'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Job Role</label>
              <input
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                name='jobRole'
                type="text"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder='Enter Job Role'
              />
            </div>

            <div className='flex flex-col'>
              <label className='whitespace-nowrap text-[15px] mb-1'>Total Positions</label>
              <input
                type="number"
                className="py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                name='totalPositions'
                value={formData.totalPositions}
                onChange={handleNumberInput}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0; // Prevent negative numbers
                  // Remove non-numeric characters
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
                placeholder='Enter No. of Positions'
              />
            </div>
            <div className='col-span-1 md:col-span-2'>
              <div className='flex flex-col'>
                <label className='whitespace-nowrap text-[15px] mb-1'>Focus Areas</label>
                <div className="flex flex-col">
                  <div className='w-full sm:w-64 relative'>
                    <select
                      className="w-full sm:w-64 py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200 appearance-none cursor-pointer"
                      onChange={handleAddFocusArea}
                    >
                      <option value="">Select a Focus Area</option>
                      {focusAreaOptions.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-[8%] top-[50%] transform -translate-y-1/2'>
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFocusAreas.map((area) => (
                      <div key={area} className="flex items-center py-1 px-2 inline-block border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200">
                        <span>{area}</span>
                        <button
                          type="button"
                          className="ml-2 text-red-500 text-[14px]"
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
            <div className='col-span-1 md:col-span-2'>
              <div className='flex flex-col'>
                <label className='whitespace-nowrap text-[15px] mb-1'>Essentials</label>
                <div className="flex flex-col">
                  <div className='w-full sm:w-64 relative'>
                    <select
                      className="w-full sm:w-64 py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200 appearance-none cursor-pointer"
                      onChange={handleAddEssential}
                    >
                      <option value="">Select an Essential</option>
                      {essentialOptions.map((essential) => (
                        <option key={essential} value={essential}>
                          {essential}
                        </option>
                      ))}
                    </select>
                    <div className='absolute right-[8%] top-[50%] transform -translate-y-1/2'>
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedEssentials.map((essential) => (
                      <div key={essential} className="flex items-center py-1 px-2 inline-block border-2 rounded-xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 focus:ring-orange-200">
                        <span>{essential}</span>
                        <button
                          type="button"
                          className="ml-2 text-red-500 text-[14px]"
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
          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end mt-6">
            <button
              onClick={handleSubmit}
              type="button"
              className="h-[40px] flex items-center gap-2 text-[#E65F2B] bg-white px-6 py-3 rounded-full text-[16px] sm:text-[18px] font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md"
            >
              Add Job
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.7179 10.8489C20.8466 10.9778 20.9189 11.1525 20.9189 11.3347C20.9189 11.5169 20.8466 11.6916 20.7179 11.8206L14.3131 18.2372C14.2497 18.3029 14.1739 18.3553 14.09 18.3914C14.0062 18.4275 13.916 18.4465 13.8247 18.4473C13.7334 18.4481 13.6429 18.4308 13.5584 18.3963C13.4739 18.3617 13.3971 18.3107 13.3325 18.2462C13.2679 18.1817 13.2168 18.1049 13.1822 18.0205C13.1476 17.936 13.1302 17.8455 13.1309 17.7542C13.1317 17.6629 13.1506 17.5727 13.1866 17.4888C13.2226 17.4049 13.2749 17.329 13.3406 17.2656L18.5729 12.0231L3.73205 12.0332C3.54972 12.0335 3.37475 11.9613 3.24565 11.8325C3.11654 11.7037 3.04388 11.529 3.04363 11.3466C3.04339 11.1643 3.11559 10.9893 3.24435 10.8602C3.37311 10.7311 3.54788 10.6585 3.73022 10.6582L18.5747 10.6491L13.3396 5.40389C13.274 5.34044 13.2217 5.26455 13.1857 5.18066C13.1497 5.09676 13.1308 5.00654 13.13 4.91525C13.1293 4.82397 13.1467 4.73345 13.1813 4.64897C13.2159 4.5645 13.267 4.48776 13.3316 4.42324C13.3962 4.35872 13.4729 4.30771 13.5575 4.27318C13.642 4.23865 13.7325 4.2213 13.8238 4.22214C13.9151 4.22297 14.0053 4.24198 14.0891 4.27805C14.173 4.31412 14.2488 4.36653 14.3122 4.43222L20.7179 10.8489Z" fill="#E65F2B" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;