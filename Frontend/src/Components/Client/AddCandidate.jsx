import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add this import
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import UploadResume from "../../assets/UploadResume.png";

const steps = ["Basic Details", "Upload Resume"];

function BasicDetailsForm({ formData, setFormData, nextStep, errorMessage, isSuccess }) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleNextStep = () => {
    // Validate required fields
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phoneNumber: "Phone Number"
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }

    toast.success('Information saved! Moving to resume upload');
    nextStep();
  };

  return (
    <div className="w-full">
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#FFFFFF',
            color: '#374151',
            border: '2px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
          },
          success: {
            style: {
              border: '2px solid #359E45',
            },
            iconTheme: {
              primary: '#359E45',
              secondary: 'white',
            },
          },
          error: {
            style: {
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
        gutter={-80}
        containerStyle={{
          bottom: '40px',
          right: '30px',
        }}
      />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-[90%] flex items-center justify-center">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <img
              src="https://images.sftcdn.net/images/t_app-icon-m/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo"
              alt="DP"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-[90%] pl-8 grid grid-cols-2 gap-x-16 gap-y-7 justify-center items-center mx-auto">
          <div className=" flex items-center justify-center">
            <div className="w-full flex flex-col space-y-[1px] max-w-md">
              <label
                htmlFor="firstName"
                className=" ml-[2px] font-medium text-gray-700 text-sm"
              >
                Enter First Name
              </label>
              <div className="relative group">
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-[#F6F1EE] shadow-sm border-gray-300
                    focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  placeholder="Candidate first name"
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center">
            <div className="w-full flex flex-col space-y-[1px] max-w-md">
              <label
                htmlFor="lastName"
                className=" ml-[2px] font-medium text-gray-700 text-sm"
              >
                Enter Last Name
              </label>
              <div className="relative group">
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-[#F6F1EE] shadow-sm border-gray-300
                    focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  placeholder="Candidate last name"
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center">
            <div className="w-full flex flex-col space-y-[1px] max-w-md">
              <label
                htmlFor="email"
                className=" ml-[2px] font-medium text-gray-700 text-sm"
              >
                Enter Email
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                bg-[#F6F1EE] shadow-sm border-gray-300
                focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  placeholder="Candidate Email"
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center">
            <div className="w-full flex flex-col space-y-[1px] max-w-md">
              <label
                htmlFor="phoneNumber"
                className=" ml-[2px] font-medium text-gray-700 text-sm"
              >
                Enter Phone Number
              </label>
              <div className="relative group">
                <input
                  id="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-[#F6F1EE] shadow-sm border-gray-300
                    focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  placeholder="Candidate Phone Number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}

      {isSuccess && (
        <div className="text-green-500 text-center mt-4">Candidate information saved successfully!</div>
      )}

      <div className="flex justify-end mt-8 mr-14">
        <button
          type="button"
          onClick={handleNextStep}
          className="flex items-center space-x-2 bg-white hover:bg-orange-50 text-orange-500 font-medium py-2 px-6 rounded-full border border-orange-200 transition-colors duration-200"
        >
          <span>Next</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ResumeUploadForm({ formData, setFormData, prevStep, handleSubmit }) {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormData(prev => ({
        ...prev,
        resume: selectedFile
      }));
    }
  };

  const onSubmit = async () => {
    if (!file) {
      toast.error('Please upload a resume');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="mt-8 w-full">
        <div className=" text-center mb-4">
          <h2 className="text-2xl font-medium text-gray-800">
            Upload Your Resume
          </h2>
          <p className="text-gray-600">Supported formats: PDF, DOC, DOCX</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="border-2 w-[48%] py-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-100">
            {file ? (
              <div>
                <div className="mb-4 text-green-600 font-medium">
                  File uploaded successfully!
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="border-2 w-[48%] py-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-100 flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{file.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setFormData(prev => ({
                        ...prev,
                        resume: null
                      }));
                    }}
                    className="p-2 text-orange-500 underline"
                  >
                    Remove and upload another
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-2 ">
                <img
                  src={UploadResume}
                  alt="Resume Upload"
                  style={{ width: "147px", height: "121px" }}
                />
                <p className="text-gray-600">
                  Drag and drop your file here, or
                </p>
                <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <div className="w-[60%] flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-full border border-gray-200 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 transform rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!file || isSubmitting}
              className={`flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 
                ${(!file || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              {!isSubmitting && (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCandidate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    jobId: location.state?.jobId || sessionStorage.getItem('jobId') // Get jobId from location state or session storage
  });

  const submitForm = async () => {
    try {
      setErrorMessage('');
      setIsSuccess(false);
  
      if (!formData.jobId) {
        toast.error('Job ID is missing');
        return false;
      }
  
      if (!formData.resume) {
        toast.error('Please upload a resume');
        return false;
      }
  
      // Create FormData and append files
      const formDataToSend = new FormData();
  
      // Append basic details
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('jobId', formData.jobId);
      formDataToSend.append('interviewerId', null); // Add this line to explicitly set interviewer as null
  
      // Append resume with specific filename
      const resumeFile = formData.resume;
      const fileExtension = resumeFile.name.split('.').pop();
      const newFileName = `${formData.firstName}_${formData.lastName}_resume.${fileExtension}`;
      formDataToSend.append('resume', resumeFile, newFileName);
  
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(
        `${baseUrl}/api/v1/client/add-candidate`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload Progress:', percentCompleted);
          }
        }
      );
  
      console.log("Response:", response);
  
      if (response.data.success) {
        setIsSuccess(true);
        setShowSuccess(true);
        toast.success('Application submitted successfully!');
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to submit application');
      }
  
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit application";
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      resume: null,
      jobId: formData.jobId // Preserve jobId
    });
    setActiveStep(0);
    setShowSuccess(false);
    navigate('/client/jobs');
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#EBDFD7] flex items-center justify-center">
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <div className="p-4 w-[80%] bg-[#F2EAE5] flex flex-col items-center justify-center rounded-2xl">
          <Box sx={{ width: "60%" }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                "& .MuiStepConnector-line": {
                  borderColor: activeStep === 0 ? "#B0B0B0" : "#FFA500",
                },
                "& .MuiStepIcon-root": {
                  color: "#B0B0B0", // Default gray for inactive steps
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#FF8C00", // Active step color
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#FFA500", // Completed steps color
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {showSuccess ? (
            <SuccessScreen resetForm={resetForm} />
          ) : activeStep === 0 ? (
            <BasicDetailsForm
              formData={formData}
              setFormData={setFormData}
              nextStep={() => setActiveStep(1)}
              errorMessage={errorMessage}
              isSuccess={isSuccess}
            />
          ) : (
            <ResumeUploadForm
              formData={formData}
              setFormData={setFormData}
              prevStep={() => setActiveStep(0)}
              handleSubmit={submitForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ resetForm }) {
  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="mt-8 w-full">
        <div className="flex items-center justify-center">
          <div className="border-2 w-[48%] py-8 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-y-6">
              <div className="w-32 h-32 flex items-center justify-center">
                <iframe src="https://lottie.host/embed/753450eb-ca02-49c3-b805-5b844db25388/PLesBd5L2c.lottie"></iframe>
              </div>
              <h2 className="text-xl font-medium text-gray-800">
                Candidate Details Created Successfully
              </h2>
              <button
                onClick={resetForm}
                className="mt-4 flex items-center space-x-2 bg-[#E65F2B] hover:bg-orange-600 hover:shadow-md text-white font-medium py-2 px-6 rounded-full transition-all duration-200 group"
              >
                <span>Back to Dashboard</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:rotate-[-45deg]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddCandidate as ClientAddCandidate };