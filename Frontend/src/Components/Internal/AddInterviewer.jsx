import React, { useEffect, useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle } from "lucide-react";
import axios from "axios";

function AddInterviewer() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [itemsSkills, setItemsSkills] = useState([]);

  const handleSelection = (e) => {
    const selectedRole = e.target.value;

    if (selectedRole && !items.includes(selectedRole)) {
      setItems([...items, selectedRole]);
      setSelectedOption("");
    }
  };

  const removeItem = (ItemToRemove) => {
    console.log("hii remove clicked");

    setItems(items.filter((item) => item !== ItemToRemove));
  };

  const handleSkillSelection = (e) => {
    const newSkillOption = e.target.value;

    if (newSkillOption && !itemsSkills.includes(newSkillOption)) {
      setItemsSkills([...itemsSkills, newSkillOption]);
      setSelectedSkill("");
    }
  };
  const removeSkill = (ItemToRemove) => {
    setItemsSkills(itemsSkills.filter((item) => item !== ItemToRemove));
  };

  const handleStrengthSelection = (e) => {
    setSelectedStrength(e.target.value);
  };
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
    currentCompanyLogo: "",
    experienceInYears: "",
    technicalSkills: "",
    profilePhoto: "",
    currentDesignation: "",
    interviewExperience: "",
    strength: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      console.log(baseUrl);

      const response = await axios.post(
        `${baseUrl}/api/v1/internal/add-interviewer`,
        formData
      );
      console.log(response);

      console.log("Interviewer added");
    } catch (error) {
      console.log(error, "something error in submit");
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (validTypes.includes(file.type) && file.size <= maxSize) {
        setSelectedFile(file);

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
  return (
    <div className=" min-h-[calc(100vh-64px)] text-[14px] bg-[#EBDFD7]">
      <form>
        <div className=" ">
          <div className="pt-4">
            <ul className="grid grid-cols-2 gap-2 ">
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-full max-w-md mx-auto p-4">
                  <div
                    className="relative w-[150px] h-[150px] mx-auto rounded-full border-2 border-dashed border-[#E65F2B] hover:border-[#E65F2B] transition-all duration-300 group"
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
                        <Camera className="w-[40px] h-[40px] mb-2" />
                        <span className="text-sm">Upload Profile Photo</span>
                      </div>
                    )}

                    {/* Overlay for hover and file actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Upload className="w-8 h-8 text-white" />
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
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {/* Success Indicator */}
                    {selectedFile && (
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-5 h-5" />
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
          <hr className=" h-[2px] rounded-full bg-[#f0ad4e] mb-2" />

          {/* MAIN 1 */}

          <div className="">
            <ul className="grid grid-cols-2 grid-rows-2 gap-2 pl-0 ">
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label className=" w-full  text-right "> First Name</label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Interviewer Name"
                    className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Last Name
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    id=""
                    placeholder="Last Name"
                     className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Email Id
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id=""
                     className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>

              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Phone Number
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    id=""
                     className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Password
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="password"
                    placeholder=" Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    id=""
                     className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Confirm Password
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="password"
                    placeholder="Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id=""
                   className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
            </ul>
          </div>
          <hr className=" h-[2px] rounded-full bg-[#f0ad4e] my-4" />

          {/* MAIN 2 */}
          <div className="">
            <ul className="grid grid-cols-2 grid-rows-2 gap-2 ">
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%] flex items-end justify-end">
                  <label className=" w-full  text-right ">
                    Current Company
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder="Current Company"
                    className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>

              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Current Designation
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="currentDesignation"
                    value={formData.currentDesignation}
                    onChange={handleChange}
                    id=""
                    placeholder="Current Designation"
                    className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    Job Title
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    id=""
                    placeholder="Job Title"
                   className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label for="" className=" w-full  text-right ">
                    LinkedIn URL
                  </label>
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    id=""
                    placeholder="LinkedIn url"
                    className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
            </ul>
          </div>
          <hr className=" h-[2px] rounded-full bg-[#f0ad4e] my-4" />

          {/* MAIN 3 */}

          <div className="">
            <ul className="grid grid-cols-2 gap-2   ">
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label className=" w-full  text-right ">
                    Work Experience
                  </label>
                </div>
                <div className="flex-col justify-start items-center w-1/2  ">
                  <input
                    type="number"
                    name="experienceInYears"
                    value={formData.experienceInYears}
                    onChange={handleChange}
                    placeholder="Years"
                  className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>

              <li className="flex items-center justify-start gap-x-4  ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label className=" w-full  text-right ">
                    Interview Experience
                  </label>
                </div>
                <div className="flex-col justify-center items-center w-1/2  ">
                  <input
                    type="number"
                    placeholder="Years"
                    name="interviewExperience"
                    value={formData.interviewExperience}
                    onChange={handleChange}
                   className=" 2xl:w-[360px] xl:w-[300px]  h-[32px] bg-[#F6F1EE] md: border border-gray-300  text-center rounded-lg py-2 px-4  focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  />
                </div>
              </li>
            </ul>
          </div>
          <hr className=" h-[2px] rounded-full bg-[#f0ad4e] my-4" />

          {/* main 4 single div use */}

          <div className="">
            <ul className="grid grid-cols-2 gap-2  pb-0 ">
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-end justify-end">
                  <label className=" w-full  text-right ">Strength</label>
                </div>
                <div className="w-1/2">
                  <select
                    value={selectedStrength}
                    onChange={handleStrengthSelection}
                    className={`w-[134px] h-[32px] bg-[#F6F1EE] text-center text-black border rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65F2B] border-[#CAC4D0] ${
                      selectedStrength == "" ? "text-gray-500" : "text-black"
                    } `}
                  >
                    <option value="" selected disabled>
                      Select Strength
                    </option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Testing">Testing</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data Engineering">Data Engineering</option>
                  </select>
                </div>
              </li>

              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-center justify-center">
                  <label className=" w-full  text-right ">Skills</label>
                </div>
                <div className="w-1/2  flex justify-start items-center ">
                  <select
                    onChange={handleSkillSelection}
                    value={selectedSkill}
                    className={`w-[134px] h-[32px] bg-[#F6F1EE] text-center text-black border rounded-md focus:outline-none focus:ring-1 focus:ring-[#E65F2B] border-[#CAC4D0] ${
                      itemsSkills.length == 0 ? "text-gray-500" : "text-black"
                    } `}
                  >
                    <option value="" disabled>
                      Select Skills{" "}
                    </option>
                    <option value="Python">Python</option>
                    <option value="Kafka">Kafka</option>
                    <option value="Java">Java</option>
                    <option value="DSA">DSA</option>
                    <option value="OOPS">OOPS</option>
                  </select>
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4  ">
                <div className="w-[30%]  flex items-center justify-center">
                  <label for="" className=" w-full "></label>
                </div>
                <div className="w-1/2 flex items-center justify-start ">
                  <div className="w-[300px]  gap-x-4">
                    <ul className="flex flex-wrap justify-start gap-2 items-center ">
                      {" "}
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className=" flex justify-center items-center h-[32px] border border-[#49454F] pl-1 pr-1 rounded-lg  text-[#49454F]  "
                        >
                          {" "}
                          {item}{" "}
                          <button
                            onClick={() => removeItem(item)}
                            className="pl-2"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.8 11.25L0.75 10.2L4.95 6L0.75 1.8L1.8 0.75L6 4.95L10.2 0.75L11.25 1.8L7.05 6L11.25 10.2L10.2 11.25L6 7.05L1.8 11.25Z"
                                fill="#49454F"
                              />
                            </svg>
                          </button>{" "}
                        </li>
                      ))}{" "}
                    </ul>
                  </div>
                </div>
              </li>
              <li className="flex items-center justify-start gap-x-4 ">
                <div className="w-[30%]  flex items-center justify-center">
                  <label for="" className=" w-full "></label>
                </div>
                <div className="w-1/2 flex items-center justify-start ">
                  <div className="w-[300px]   gap-x-4   ">
                    <ul className="flex flex-wrap justify-start gap-2 items-center ">
                      {" "}
                      {itemsSkills.map((item, index) => (
                        <li
                          key={index}
                          className=" flex justify-center items-center h-[32px] border border-[#49454F] pl-1 pr-1 rounded-lg  text-[#49454F]  "
                        >
                          {" "}
                          {item}{" "}
                          <button
                            onClick={() => removeSkill(item)}
                            className="pl-2"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.8 11.25L0.75 10.2L4.95 6L0.75 1.8L1.8 0.75L6 4.95L10.2 0.75L11.25 1.8L7.05 6L11.25 10.2L10.2 11.25L6 7.05L1.8 11.25Z"
                                fill="#49454F"
                              />
                            </svg>
                          </button>{" "}
                        </li>
                      ))}{" "}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* main 5 */}

          {/* MAIN 6 */}

          <div className="flex justify-end mr-10">
            <button onClick={handleSubmit}>
              <div className=" w-[79px] h-[40px] p-2 flex justify-center items-center text-lg font-bold bg-[#E65F2B] text-white rounded-lg ">
                Save
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AddInterviewer as InternalAddInterviewer };
