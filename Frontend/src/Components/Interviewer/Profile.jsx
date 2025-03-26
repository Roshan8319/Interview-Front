import React, { useState, useRef } from "react";

const ProfilePage = () => {
  // Initial state to store original values for discarding changes
  const initialProfileData = {
    name: "Rajhav Kholi",
    phone: "+91 98765 43210",
    email: "rajhav@gmail.com",
    linkedInUrl: "https://www.linkedin.com/in/rajhavkholi",
    currentCompany: "JP Morgan Chase & Co.",
    strength: "Backend, API Integration",
    currentDesignation: "SDE-II",
    experience: 10,
    interviewExperience: "10+ Years",
    accountHolderName: "Rajhav Kholi",
    accountNumber: "4569-8975-1256-6582",
    ifscCode: "SBINXXX45",
  };

  const initialProfilePhoto =
    "https://i.pinimg.com/736x/7c/e2/4d/7ce24d5a7e3759a1a819649d65a9da2e.jpg";

  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto);
  const [profileData, setProfileData] = useState(initialProfileData);

  const fileInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input when edit photo button is clicked
  const triggerFileInput = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Discard changes
  const handleDiscardChanges = () => {
    // Reset to initial values
    setProfileData(initialProfileData);
    setProfilePhoto(initialProfilePhoto);
    setIsEditing(false);
  };

  // Define fields that should always be disabled
  const alwaysDisabledFields = ["name", "email", "phone"];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center">
      <div className="m-2 p-4 w-[95%] h-[95%] bg-[#F2EAE5] rounded-lg">
        <div>
          <p className="text-[20px] font-semibold">Profile</p>
        </div>

        {/* Profile Photo Section */}
        <div className="relative ">
          <div className="flex items-center justify-center">
            <div className="relative h-[130px] w-[130px] rounded-full overflow-hidden group border border-[#E65F2B]">
              <img
                src={profilePhoto}
                alt="profile Photo"
                className={`w-full h-full object-cover ${
                  isEditing ? "opacity-50" : ""
                }`}
              />
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />

              {/* Edit Photo Overlay */}
              {isEditing && (
                <div
                  onClick={triggerFileInput}
                  className="absolute pl-5 inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffffff"
                    className="mr-2"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Change Photo
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Grid */}
        <div className="p-2 w-full grid grid-cols-3 gap-x-12 gap-y-3">
          {[
            { id: "name", label: "Your Name", type: "text" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "email", label: "Email", type: "email" },
            { id: "linkedInUrl", label: "LinkedIn Url", type: "text" },
            { id: "currentCompany", label: "Current Company", type: "text" },
            { id: "strength", label: "Strength", type: "text" },
            {
              id: "currentDesignation",
              label: "Current Designation",
              type: "text",
            },
            { id: "experience", label: "Experience In Years", type: "number" },
            {
              id: "interviewExperience",
              label: "Interview Experience",
              type: "text",
            },
          ].map(({ id, label, type }) => (
            <div key={id} className="flex items-center justify-center">
              <div className="w-full flex flex-col gap-y-[1px] max-w-md">
                <label
                  htmlFor={id}
                  className="ml-[2px] font-medium text-gray-700 text-sm"
                >
                  {label}
                </label>
                <div className="relative group mt-[-6px]">
                  <input
                    id={id}
                    type={type}
                    value={profileData[id]}
                    onChange={handleInputChange}
                    disabled={!isEditing || alwaysDisabledFields.includes(id)}
                    className={`w-[90%] py-2 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px]
                      bg-[#F6F1EE] shadow-sm border-gray-300
                      ${
                        !isEditing || alwaysDisabledFields.includes(id)
                          ? "opacity-50 cursor-not-allowed"
                          : "focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      }`}
                    placeholder={profileData[id]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Account Details Section */}
        <div className="mt-5">
          <div>
            <p className="text-[20px] font-semibold">Bank Account Details</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-x-12">
            {[
              {
                id: "accountHolderName",
                label: "Account Holder Name",
                type: "text",
              },
              { id: "accountNumber", label: "Account Number", type: "text" },
              { id: "ifscCode", label: "IFSC Code", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id} className="flex items-center justify-center">
                <div className="w-full flex flex-col gap-y-[1px] max-w-md">
                  <label
                    htmlFor={id}
                    className="ml-[2px] font-medium text-gray-700 text-sm"
                  >
                    {label}
                  </label>
                  <div className="relative group mt-[-6px]">
                    <input
                      id={id}
                      type={type}
                      value={profileData[id]}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-[90%] py-2 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px]
                        bg-[#F6F1EE] shadow-sm border-gray-300
                        ${
                          !isEditing
                            ? "opacity-50 cursor-not-allowed"
                            : "focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                        }`}
                      placeholder={profileData[id]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit/Discard Buttons */}
        <div>
          <div className="mt-7 px-20 flex items-center justify-end ">
            {/* Edit Button */}

            {!isEditing && (
              <div>
                <button
                  onClick={handleEditToggle}
                  className="bg-[#E65F2B] text-white font-semibold text-lg flex items-center justify-center px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffffff"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Edit
                </button>
              </div>
            )}

            {/* Discard Button (Only visible when editing) */}
            {isEditing && (
              <div className="flex gap-x-5">
                <button
                  onClick={handleDiscardChanges}
                  className="bg-gray-200 text-gray-800 border border-gray-800 font-semibold text-lg flex items-center justify-center px-5 py-2 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                  Discard
                </button>
                <button className="bg-[#E65F2B] text-white font-semibold text-lg flex items-center justify-center px-5 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffffff"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
