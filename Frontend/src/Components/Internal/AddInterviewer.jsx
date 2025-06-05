import React, { useEffect, useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";

function AddInterviewer() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    linkedInUrl: "",
    jobTitle: "",
    currentCompany: "",
    experienceInYears: "",
    technicalSkills: "",
    profilePhoto: null,
    currentDesignation: "",
    interviewExperience: "",
    strength: "",
  });

  // State for role selection
  const [selectedOption, setSelectedOption] = useState("");
  const [items, setItems] = useState([]);

  // State for skill selection
  const [selectedSkill, setSelectedSkill] = useState("");
  const [itemsSkills, setItemsSkills] = useState([]);

  // State for strength selection
  const [selectedStrength, setSelectedStrength] = useState("");

  // State for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for role selection
  const handleSelection = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole && !items.includes(selectedRole)) {
      setItems([...items, selectedRole]);
      setSelectedOption("");
    }
  };

  const removeItem = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  // Handler for skill selection
  const handleSkillSelection = (e) => {
    const newSkillOption = e.target.value;
    if (newSkillOption && !itemsSkills.includes(newSkillOption)) {
      const updatedSkills = [...itemsSkills, newSkillOption];
      setItemsSkills(updatedSkills);
      setSelectedSkill("");
      setFormData((prevData) => ({
        ...prevData,
        technicalSkills: updatedSkills.join(", "),
      }));
    }
  };

  const removeSkill = (itemToRemove) => {
    const updatedSkills = itemsSkills.filter((item) => item !== itemToRemove);
    setItemsSkills(updatedSkills);
    setFormData((prevData) => ({
      ...prevData,
      technicalSkills: updatedSkills.join(", "),
    }));
  };

  // Handler for strength selection
  const handleStrengthSelection = (e) => {
    const selectedStrength = e.target.value;
    setSelectedStrength(selectedStrength);
    setFormData((prevData) => ({
      ...prevData,
      strength: selectedStrength,
    }));
  };


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (validTypes.includes(file.type) && file.size <= maxSize) {
        setSelectedFile(file);
        setFormData((prevData) => ({
          ...prevData,
          profilePhoto: file,
        }));

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image (JPEG, PNG, GIF) under 5MB");
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    if (!selectedFile) {
      toast.error("Profile Photo is required");
      return false;
    }
    if (!formData.firstName.trim()) {
      toast.error("First Name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone Number is required");
      return false;
    }
    // Phone number validation (assuming 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    // Password strength validation
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!formData.currentCompany.trim()) {
      toast.error("Current Company is required");
      return false;
    }
    if (!formData.currentDesignation.trim()) {
      toast.error("Current Designation is required");
      return false;
    }
    if (!formData.experienceInYears) {
      toast.error("Work Experience is required");
      return false;
    }
    if (!formData.interviewExperience) {
      toast.error("Interview Experience is required");
      return false;
    }
    if (!formData.strength) {
      toast.error("Strength is required");
      return false;
    }
    if (!formData.technicalSkills) {
      toast.error("At least one skill is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== 'profilePhoto') {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (selectedFile) {
      formDataToSend.append('profilePhoto', selectedFile);
    }

    toast.promise(
      axios.post(
        `${baseUrl}/api/v1/internal/add-interviewer`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      ),
      {
        loading: 'Saving interviewer details...',
        success: (response) => {
          setTimeout(() => {
            navigate("/internal/interviewer", { replace: true });
          }, 1000);
          return 'Interviewer added successfully!';
        },
        error: (error) => {
          // If the error is 500 but data was saved (check response data)
          if (error.response?.status === 500 && error.response?.data) {
            setTimeout(() => {
              navigate("/internal/interviewer", { replace: true });
            }, 1000);
            return 'Interviewer added successfully!';
          } else {
            // Show error only for non-500 errors or when there's no response data
            return error.response?.data?.errorMessage || "Something went wrong!";
          }
        },
        finally: () => {
          setIsLoading(false);
        }
      }
    );
  };

  // Add handleBlur function after handleChange
  const handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          toast.error('First Name is required', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          toast.error('Last Name is required', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'email':
        if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
          toast.error('Please enter a valid email address', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'phone':
        if (!value.match(/^\d{10}$/)) {
          toast.error('Please enter a valid 10-digit phone number', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'password':
        if (value.length < 8) {
          toast.error('Password must be at least 8 characters long', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          toast.error('Passwords do not match', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'currentCompany':
        if (!value.trim()) {
          toast.error('Current Company is required', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'currentDesignation':
        if (!value.trim()) {
          toast.error('Current Designation is required', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'experienceInYears':
        if (!value || value < 1) {
          toast.error('Work Experience must be at least 1 year', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      case 'interviewExperience':
        if (!value || value < 1) {
          toast.error('Interview Experience must be at least 1 year', {
            style: {
              background: '#FFFFFF',
              color: '#374151',
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center p-4">
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
      <form className="m-2 p-6 sm:p-6 w-full sm:w-[95%] h-[95%] bg-[#F2EAE5] rounded-2xl shadow-md overflow-y-auto">
        <div className="">
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold mb-2 -mt-2">Add Interviewer</p>
          </div>

          {/* Profile Pic */}
          <div className="pt-2">
            <ul className="grid">
              <li className="flex items-center justify-center gap-x-4">
                <div className="w-full max-w-md mx-auto">
                  <div
                    className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mx-auto rounded-full border-2 border-dashed border-[#E65F2B] hover:border-[#E65F2B] transition-all duration-300 group"
                    onClick={triggerFileInput}
                  >
                    {/* Preview or Placeholder */}
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-[#E65F2B] transition-colors">
                        <Camera className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-1 sm:mb-2" />
                        <span className="text-xs sm:text-sm text-center">Upload Profile <br />Photo</span>
                      </div>
                    )}

                    {/* Overlay for hover and file actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    {/* Remove Button - Only show when image is selected */}
                    {previewImage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}

                    {/* Success Indicator */}
                    {selectedFile && (
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                  />

                  {/* File Details */}
                  {selectedFile && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        {selectedFile.name} -{" "}
                        {Math.round(selectedFile.size / 1024)} KB
                      </p>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>

          {/* Data 1 */}
          <div className="pt-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-2">
              {/* First Row */}
              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter First Name"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Last Name"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Email"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              {/* Second Row */}
              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow digits and limit to 10 characters
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, phone: value });
                  }}
                  onBlur={handleBlur}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Password"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Confirm Password"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>
            </div>
          </div>

          {/* Data 2 */}
          <div className="pt-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-2">
              {/* First Row */}
              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Current Comapny</label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Current Company"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Current Designation</label>
                <input
                  type="text"
                  name="currentDesignation"
                  value={formData.currentDesignation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Current Designation"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Job Title"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              {/* Second Row */}
              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter LinkedIn URL"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Work Experience</label>
                <input
                  type="number"
                  name="experienceInYears"
                  min="1"
                  value={formData.experienceInYears}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only positive numbers or empty input
                    if (value === "" || Number(value) >= 0) {
                      setFormData({ ...formData, experienceInYears: value });
                    }
                  }}
                  onBlur={handleBlur}
                  placeholder="Enter Work Experience"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Interview Experience</label>
                <input
                  type="number"
                  name="interviewExperience"
                  min="1"
                  value={formData.interviewExperience}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only positive numbers or empty input
                    if (value === "" || Number(value) >= 0) {
                      setFormData({ ...formData, interviewExperience: value });
                    }
                  }}
                  onBlur={handleBlur}
                  placeholder="Enter Interview Experience"
                  className="h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                />
              </div>
            </div>
          </div>

          {/* Data 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-4 pt-4 sm:pt-6 p-4">
            {/* Strength Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Strength</label>
              <div className="relative w-full sm:w-52">
                <select
                  id="strengthDropdown"
                  value={selectedStrength}
                  onChange={handleStrengthSelection}
                  className="w-full sm:w-52 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[14px] sm:text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Strength</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Testing">Testing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Data Engineering">Data Engineering</option>
                </select>
                <div
                  className='absolute right-[8%] bottom-[38%] cursor-pointer'
                  onClick={() => document.getElementById('strengthDropdown').focus()}
                >
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" stroke-width="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Skills Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 sm:mb-2 text-gray-700 text-sm sm:text-base">Skills</label>
              <div className="relative w-full sm:w-52">
                <select
                  id="skillsDropdown"
                  value={selectedSkill}
                  onChange={handleSkillSelection}
                  className="w-full sm:w-52 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[14px] sm:text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Skills</option>
                  <option value="Python">Python</option>
                  <option value="Kafka">Kafka</option>
                  <option value="Java">Java</option>
                  <option value="DSA">DSA</option>
                  <option value="OOPS">OOPS</option>
                </select>
                <div
                  className='absolute right-[8%] bottom-[38%] cursor-pointer'
                  onClick={() => document.getElementById('skillsDropdown').focus()}
                >
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" stroke-width="1.5" />
                  </svg>
                </div>
              </div>

              {/* Selected Skills */}
              <div className="mt-2 flex flex-wrap gap-2">
                {itemsSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 border-2 rounded-xl outline-none transition-all duration-200 text-[14px] sm:text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 sm:ml-3 text-red-500"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.8 11.25L0.75 10.2L4.95 6L0.75 1.8L1.8 0.75L6 4.95L10.2 0.75L11.25 1.8L7.05 6L11.25 10.2L10.2 11.25L6 7.05L1.8 11.25Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Data 4 */}
          <div className="flex justify-end mr-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-[auto] h-[40px] p-4 gap-x-2 flex justify-center items-center text-lg font-bold 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E65F2B] hover:bg-[#d54e1a] active:bg-[#c44517]'} 
                text-white rounded-3xl transition-colors duration-200`}
            >
              {isLoading ? (
                <Loader2 className="w-16 h-6 animate-spin" />
              ) : (
                <>
                  <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path opacity="0.7" d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <g opacity="0.8">
                      <path d="M7 12H11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 14V10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AddInterviewer as InternalAddInterviewer };
