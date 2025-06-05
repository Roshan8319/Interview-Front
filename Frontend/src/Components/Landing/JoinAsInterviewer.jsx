import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";
import ProfileIcon from "../../assets/ProfileIcon.png"; // Default profile icon
import axios from 'axios';

const JoinAsInterviewer = () => {
    // Get base URL from environment
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // Initial state for form data
    const initialFormData = {
        firstName: "",
        phone: "",
        email: "",
        linkedInUrl: "",
        currentCompany: "",
        strength: "",
        currentDesignation: "",
        experienceInYears: "",
        interviewExperience: "",
        // Note: Profile photo is handled separately and won't be sent to the backend
    };

    // State variables
    const [profilePhoto, setProfilePhoto] = useState(ProfileIcon); // Holds the preview URL or default icon
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null); // Ref for the hidden file input

    // Handle changes in text input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Use name attribute for state update
        
        // Validate phone input - only allow numbers and limit to 10 digits
        if (name === "phone") {
            if (!/^\d*$/.test(value)) {
                return; // Don't update state if non-numeric characters are entered
            }
            if (value.length > 10) {
                return; // Don't update if more than 10 digits
            }
        }
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle profile photo selection
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB size limit
                toast.error("Image size should be less than 5MB");
                return;
            }

            // Read the file as a Data URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result); // Set the preview image
                toast.success("Photo updated successfully");
            };
            reader.onerror = () => toast.error("Failed to read image file");
            reader.readAsDataURL(file);
        }
    };

    // Programmatically trigger the file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // Basic validation (can be expanded)
    const validateForm = () => {
        const requiredFields = [
            "firstName", "phone", "email", "linkedInUrl", "currentCompany",
            "strength", "currentDesignation", "experienceInYears", "interviewExperience"
        ];
        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }
        
        // Validate phone number (exactly 10 digits)
        if (!/^\d{10}$/.test(formData.phone)) {
            toast.error('Phone number should be exactly 10 digits');
            return false;
        }
        
        // Validate email format
        if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        
        // Add more specific validations if needed
        return true;
    };

    // Form submission using our backend API
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling

        if (!validateForm()) return; // Stop submission if validation fails

        setIsSubmitting(true);
        toast.promise(
            axios.post(`${baseUrl}/api/v1/join`, formData),
            {
                loading: "Submitting application...",
                success: (response) => {
                    if (response.data.success) {
                        setFormData(initialFormData); // Reset form fields
                        setProfilePhoto(ProfileIcon); // Reset profile photo preview
                        return "Application submitted successfully!";
                    } else {
                        throw new Error(response.data.message || "Submission failed");
                    }
                },
                error: (error) => {
                    return error.response?.data?.message || "Failed to submit application. Please try again.";
                },
                finally: () => {
                    setIsSubmitting(false); // Re-enable submit button
                }
            }
        );
    };

    return (
        // Use background color similar to Contact page
        <div className="min-h-screen flex flex-col bg-[#F1F5F9] items-center p-4">
            {/* Toaster configuration */}
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

            {/* Form container with updated styling */}
            <div className="m-6 p-6 md:p-8 w-[95%] max-w-4xl bg-white rounded-2xl shadow-lg">
                <div className="mb-6 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold">Join as an <span className="text-[#E65F2B]">Interviewer</span></h1>
                    <p className="text-gray-600 mt-2">Share your expertise and help shape the future of tech hiring.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Profile Photo Section - Styling adjusted */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            <div className="relative h-[130px] w-[130px] rounded-full overflow-hidden group border-2 border-[#E65F2B] shadow-sm">
                                <img
                                    src={profilePhoto} // Display the state variable (preview or default)
                                    alt="Profile Preview"
                                    className={`w-full h-full object-cover ${profilePhoto === ProfileIcon ? 'opacity-50' : 'opacity-100'}`}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoChange}
                                    accept="image/*" // Accept only image files
                                    className="hidden" // Hide the default file input
                                />
                                {/* Clickable overlay to trigger file input */}
                                <div
                                    onClick={triggerFileInput}
                                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24"
                                        fill="#ffffff"
                                        className="mb-1"
                                    >
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM360-280h240q17 0 28.5-11.5T640-320q0-17-11.5-28.5T600-360H360q-17 0-28.5 11.5T320-320q0 17 11.5 28.5T360-280Zm0-120h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400Zm0-120h240q17 0 28.5-11.5T640-560q0-17-11.5-28.5T600-600H360q-17 0-28.5 11.5T320-560q0 17 11.5 28.5T360-520Z" />
                                    </svg>
                                    <span className="text-xs">Upload Photo</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">Max 5MB. Photo is for preview only and not submitted.</p>
                    </div>

                    {/* Form Fields Grid - Input styling updated */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { id: "firstName", name: "firstName", label: "Full Name", type: "text" },
                            { id: "phone", name: "phone", label: "Phone Number", type: "tel", pattern: "[0-9]{10}", inputMode: "numeric" },
                            { id: "email", name: "email", label: "Email Address", type: "email" },
                            { id: "linkedInUrl", name: "linkedInUrl", label: "LinkedIn Profile URL", type: "url" },
                            { id: "currentCompany", name: "currentCompany", label: "Current Company", type: "text" },
                            { id: "strength", name: "strength", label: "Areas of Expertise (comma-separated)", type: "text" },
                            { id: "currentDesignation", name: "currentDesignation", label: "Current Designation", type: "text" },
                            { id: "experienceInYears", name: "experienceInYears", label: "Years of Experience", type: "number" },
                            { id: "interviewExperience", name: "interviewExperience", label: "Briefly describe your interview experience", type: "textarea" }, // Changed to textarea for more space
                        ].map(({ id, name, label, type }) => (
                            <div key={id} className={`flex flex-col gap-2 ${type === 'textarea' ? 'md:col-span-2' : ''}`}>
                                <label htmlFor={id} className="font-medium text-gray-700 text-sm">
                                    {label}
                                </label>
                                {type === 'textarea' ? (
                                    <textarea
                                        id={id}
                                        name={name} // Add name attribute
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        rows="3" // Adjust rows as needed
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        required
                                    />
                                ) : (
                                    <input
                                        id={id}
                                        name={name} // Add name attribute
                                        type={type}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        // Style similar to Contact page inputs
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                                        placeholder={name === 'phone' ? 'Enter your 10-digit phone number' : `Enter your ${label.toLowerCase()}`}
                                        required={type !== 'number'} // Make number not strictly required by browser if 0 is valid
                                        min={type === 'number' ? 0 : undefined} // Set min for number input
                                        pattern={name === 'phone' ? '[0-9]{10}' : undefined} // Add pattern for exact 10 digits validation
                                        inputMode={name === 'phone' ? 'numeric' : undefined} // Show numeric keyboard on mobile for phone
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button - Styling and text updated */}
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            // Style similar to Contact page button
                            className={`bg-[#E65F2B] text-white px-8 py-3 rounded-3xl transition-all duration-300 flex items-center gap-2
                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#d45525]'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    {/* Loading spinner */}
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Application
                                    {/* Arrow icon */}
                                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinAsInterviewer;