import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";
import ProfileIcon from "../../assets/ProfileIcon.png";
import { VisitorDisableWrapper } from "../Hooks/VisitorGuard";

const ProfilePage = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Initial state with properly defined values
  const initialProfileData = {
    firstName: "",
    phone: "",
    email: "",
    linkedInUrl: "",
    currentCompany: "",
    strength: "",
    currentDesignation: "",
    experienceInYears: "",
    interviewExperience: "",
    bankAccountHolderName: "",
    bankAccountNumber: "",
    bankIfscCode: "",
  };

  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(ProfileIcon); // Initialize with the imported default icon
  const [profileData, setProfileData] = useState(initialProfileData);
  const [data, setData] = useState(initialProfileData); // Initialize data state as well
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch interviewer data
  useEffect(() => {
    const fetchData = async () => {
      // Define the function to fetch profile data
      const getProfileData = async () => {
        const response = await axios.get(`${baseUrl}/api/v1/interviewer/getInterviewer`, {
          withCredentials: true,
        });

        const fetchedData = response.data.data.interviewer;
        setProfileData(fetchedData); // Set form data
        setData(fetchedData); // Set the original data for discard functionality
        if (fetchedData.profilePhoto) {
          setProfilePhoto(fetchedData.profilePhoto); // Set photo if available
        } else {
          setProfilePhoto(ProfileIcon); // Ensure default icon if no photo fetched
        }
        return response;
      };

      // Use toast.promise to handle the async operation
      toast.promise(getProfileData(), {
        loading: "Fetching profile data...",
        success: "Profile loaded successfully!",
        error: (error) => error.response?.data?.message || "Failed to load profile data",
        finally: () => setLoading(false)
      });
    };
    fetchData();
  }, [baseUrl]); // Add baseUrl as dependency if it could change, though unlikely with env vars

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Update state with the preview URL (Data URL)
        toast.success("Photo updated successfully");
      };
      reader.onerror = () => toast.error("Failed to read image file");
      reader.readAsDataURL(file); // Read the file for preview
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
    toast.promise(
      // Promise to discard changes
      new Promise((resolve, reject) => {
        try {
          // Reset to current server data instead of initial empty values
          setProfileData(data);
          // Also reset profile photo to current server data
          setProfilePhoto(data.profilePhoto || ProfileIcon);
          setIsEditing(false);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Discarding changes...",
        success: "Changes discarded successfully!",
        error: "Failed to discard changes"
      }
    );
  };

  // Save changes - Using axios consistently like the get request
  const handleSaveChanges = async () => {
    setIsSaving(true);

    // Define the function to handle the profile update logic
    const updateProfile = async () => {
      if (profilePhoto !== data.profilePhoto) {
        const formData = new FormData();

        try {
          const imageFile = await fetch(profilePhoto)
            .then((r) => {
              if (!r.ok) throw new Error("Failed to process image");
              return r.blob();
            });

          formData.append("profilePhoto", imageFile, "profile.jpg");
        } catch (error) {
          throw new Error("Failed to process profile photo");
        }

        formData.append("profileData", JSON.stringify(profileData));

        const response = await axios.patch(
          `${baseUrl}/api/v1/interviewer/update-interviewer`,
          formData,
          { withCredentials: true }
        );

        setData(profileData);
        return response;
      } else {
        const response = await axios.patch(
          `${baseUrl}/api/v1/interviewer/update-interviewer`,
          profileData,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        setData(profileData);
        return response;
      }
    };

    // Use toast.promise to handle the async operation with loading/success/error states
    toast.promise(updateProfile(), {
      loading: "Saving changes...",
      success: () => {
        setIsEditing(false);
        return "Profile updated successfully!";
      },
      error: (error) => {
        return error.response?.data?.message || "Failed to update profile";
      },
      finally: () => {
        setIsSaving(false);
      }
    });
  };

  // Define fields that should always be disabled
  const alwaysDisabledFields = ["name", "email", "phone"];

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading profile data...</p>
    </div>
  );

  // Saving Overlay Component
  const SavingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E65F2B]"></div>
        <p className="mt-4 text-lg font-medium">Saving changes...</p>
      </div>
    </div>
  );

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center p-2 sm:p-4">
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

      {isSaving && <SavingOverlay />}

      <div className="m-2 p-3 sm:p-4 md:p-6 w-[95%] h-[95%] bg-[#F2EAE5] rounded-2xl mt-5 sm:mt-10 shadow-md">
        <div>
          <p className="text-[20px] sm:text-[24px] font-semibold">Profile</p>
        </div>

        {/* Profile Photo Section */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] rounded-full overflow-hidden group border border-[#E65F2B]">
              <img
                src={profilePhoto}
                alt="Profile Photo"
                className={`w-full h-full object-cover ${isEditing ? "opacity-50" : ""
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
                  <span >
                    Change Photo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Grid */}
        <div className="p-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-3 mt-4">
          {[
            { id: "firstName", label: "Your Name", type: "text" },
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
            { id: "experienceInYears", label: "Experience In Years", type: "number" },
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
                    value={profileData[id] || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing || alwaysDisabledFields.includes(id)}
                    className={`w-[90%] py-2 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px]
                      bg-[#F6F1EE] shadow-sm border-gray-300
                      ${!isEditing || alwaysDisabledFields.includes(id)
                        ? "opacity-50 cursor-not-allowed"
                        : "focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      }`}
                    onInput={
                      id === "experienceInYears"
                        ? (e) => {
                          if (e.target.value < 0) e.target.value = 0; // Prevent negative numbers
                          // Remove non-numeric characters
                          e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }
                        : undefined
                    }
                    placeholder={label}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Account Details Section */}
        <div className="mt-5">
          <div>
            <p className="text-[18px] sm:text-[20px] font-semibold">Bank Account Details</p>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-3">
            {[
              {
                id: "bankAccountHolderName",
                label: "Account Holder Name",
                type: "text",
              },
              { id: "bankAccountNumber", label: "Account Number", type: "text" },
              { id: "bankIfscCode", label: "IFSC Code", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id} className="flex items-center justify-center px-2">
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
                      value={profileData[id] || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-[90%] py-2 h-[37px] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px]
                        bg-[#F6F1EE] shadow-sm border-gray-300
                        ${!isEditing
                          ? "opacity-50 cursor-not-allowed"
                          : "focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                        }`}
                      placeholder={label}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit/Discard Buttons */}
        <div>
          <div className="mt-7 px-8 flex items-center justify-end -mr-6 md:mr-0">
            {/* Edit Button */}

            {!isEditing && (
              <div>
                <VisitorDisableWrapper>
                  <button
                    onClick={handleEditToggle}
                    className="w-[auto] text-[#E65F2B] bg-white font-semibold text-lg flex items-center justify-center px-4 py-1 rounded-full gap-x-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#E65F2B"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    Edit
                  </button>
                </VisitorDisableWrapper>
              </div>
            )}

            {/* Discard/Save Buttons (Only visible when editing) */}
            {isEditing && (
              <div className="flex gap-x-5">
                <button
                  onClick={handleDiscardChanges}
                  className="bg-gray-200 text-gray-800 border border-gray-800 font-semibold text-lg flex items-center justify-center px-4 py-1 rounded-full gap-x-1 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group"
                  disabled={isSaving}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#EF4444"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                  Discard
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-[#E65F2B] text-white font-semibold text-lg flex items-center justify-center px-4 py-1 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path opacity="0.7" d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <g opacity="0.8">
                          <path d="M7 12H11" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M9 14V10" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                      </svg>
                      Save
                    </>
                  )}
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