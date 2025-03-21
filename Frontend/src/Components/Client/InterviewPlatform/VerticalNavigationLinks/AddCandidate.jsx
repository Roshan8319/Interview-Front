import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Basic Details", "Upload Resume"];

function BasicDetailsForm({ formData, setFormData, nextStep }) {
  return (
    <div className="w-full ">
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

        <div className="w-[90%] pl-8  grid grid-cols-2 gap-x-16 gap-y-7 justify-center items-center mx-auto">


          <div className=" flex items-center justify-center">
          <div className="w-full flex flex-col space-y-[1px] max-w-md">
            <label htmlFor="name" className=" ml-[2px] font-medium text-gray-700 text-sm">
              Enter First Name
            </label>
            <div className="relative group">
              <input
                id="name"
                type="text"
                className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-white shadow-sm border-gray-300
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Candidate first name"
              />
            </div>
          </div>
          </div>


          <div className=" flex items-center justify-center">
          <div className="w-full flex flex-col space-y-[1px] max-w-md">
            <label htmlFor="name" className=" ml-[2px] font-medium text-gray-700 text-sm">
              Enter Last Name
            </label>
            <div className="relative group">
              <input
                id="name"
                type="text"
                className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-white shadow-sm border-gray-300
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Candidate last name"
              />
            </div>
          </div>
          </div>






          <div className=" flex items-center justify-center">
          <div className="w-full flex flex-col space-y-[1px] max-w-md">
            <label htmlFor="name" className=" ml-[2px] font-medium text-gray-700 text-sm">
              Enter Email 
            </label>
            <div className="relative group">
              <input
                id="name"
                type="text"
                className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-white shadow-sm border-gray-300
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Candidate Email"
              />
            </div>
          </div>
          </div>


          
          <div className=" flex items-center justify-center">
          <div className="w-full flex flex-col space-y-[1px] max-w-md">
            <label htmlFor="name" className=" ml-[2px] font-medium text-gray-700 text-sm">
              Enter Phone Number
            </label>
            <div className="relative group">
              <input
                id="name"
                type="text"
                className="w-[80%] py-2 px-4 border-2 rounded-xl outline-none transition-all duration-200
                    bg-white shadow-sm border-gray-300
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Candidate Phone Number"
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 mr-14">
        <button
          type="button"
          onClick={nextStep}
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

function ResumeUploadForm({ formData, setFormData, prevStep, submitForm }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className=" text-center mb-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Upload Your Resume
        </h2>
        <p className="text-gray-600">Supported formats: PDF, DOC, DOCX</p>
      </div>

      <div className="border-2 w-[60%] border-dashed border-gray-300 rounded-lg p-10 text-center mb-8">
        {file ? (
          <div>
            <div className="mb-4 text-green-600 font-medium">
              File uploaded successfully!
            </div>
            <div className="flex items-center justify-center">
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
              onClick={() => setFile(null)}
              className="mt-4 text-orange-500 underline"
            >
              Remove and upload another
            </button>
          </div>
        ) : (
          <div>
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 mb-4">
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
          onClick={submitForm}
          className={`flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 ${
            file ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!file}
        >
          <span>Submit Application</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function AddCandidate() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "Charlene Reed",
    phone: "+91 XXXXX YYYYY",
    email: "charlenereed@gmail.com",
    dateOfBirth: "25 January 1990",
    permanentAddress: "San Jose, California, USA",
    presentAddress: "San Jose, California, USA",
    sameAsPermAddress: true,
  });

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const submitForm = () => {
    // Here you would handle the form submission with the complete data
    console.log("Form submitted with data:", formData);
    // Typically you'd make an API call here
    alert("Application submitted successfully!");
    // Optionally reset the form or redirect
  };

  return (
    <div className="">
      <div className="mt-5 mx-auto p-4">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === 0 ? (
          <BasicDetailsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        ) : (
          <ResumeUploadForm
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            submitForm={submitForm}
          />
        )}
      </div>
    </div>
  );
}

export { AddCandidate as ClientAddCandidate };
