import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";
import Bg from "../../assets/bg.jpg";
import Recrumeta from "../../assets/Recrumeta.png";

function ResetPassword() {
  // State for password visibility
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Form input states
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" };
    }

    const criteria = [hasLowercase, hasUppercase, hasNumber, hasSpecialChar];
    const strengthCount = criteria.filter(Boolean).length;

    if (strengthCount < 3) {
      return {
        valid: false,
        message: "Password is too weak. Include at least 3 of the following: lowercase letters, uppercase letters, numbers, and special characters"
      };
    }

    return { valid: true };
  };

  // Form validation
  const validateForm = () => {
    // Email validation
    if (!email) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (!oldPassword) {
      toast.error("Old password is required");
      return false;
    }

    if (!newPassword) {
      toast.error("New password is required");
      return false;
    }

    const passwordStrength = checkPasswordStrength(newPassword);
    if (!passwordStrength.valid) {
      toast.error(passwordStrength.message);
      return false;
    }

    if (newPassword === oldPassword) {
      toast.error("New password must be different from old password");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    // Role validation
    if (!role) {
      toast.error("Please select your role");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Example API call with better error handling
    try {
      // Show loading toast
      const resetPromise = new Promise((resolve, reject) => {
        // This would be your actual API call
        setTimeout(() => {
          // Example of simulating API response - in real app replace with actual API call
          const success = Math.random() > 0.2; // 80% success rate for demo
          if (success) {
            resolve();
          } else {
            reject(new Error("Server error occurred. Please try again."));
          }
        }, 2000);
      });

      toast.promise(resetPromise, {
        loading: 'Resetting your password...',
        success: () => {
          // Reset form
          setEmail("");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setRole("");

          return 'Password reset successful! You can now sign in with your new password.';
        },
        error: (err) => {
          // Display the specific error message
          return err.message || 'Failed to reset password. Please try again.';
        },
        finally: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      // This will catch any errors not handled by the toast.promise
      toast.error(error.message || "An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Toast container */}
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

      <style>
        {`
          /* Hide the browser's built-in password reveal icon */
          input::-ms-reveal,
          input::-ms-clear {
            display: none !important;
          }
          input::-webkit-contacts-auto-fill-button,
          input::-webkit-credentials-auto-fill-button {
            visibility: hidden;
            display: none !important;
            pointer-events: none;
            height: 0;
            width: 0;
            margin: 0;
          }
          /* Target Chrome, Safari and newer Edge */
          input[type="password"]::-webkit-inner-spin-button,
          input[type="password"]::-webkit-outer-spin-button,
          input[type="password"]::-webkit-search-cancel-button { 
            -webkit-appearance: none;
            appearance: none;
            display: none;
          }

          /* Media query for responsive styling */
          @media (max-width: 640px) {
            .mobile-toast {
              bottom: 20px !important;
              right: 20px !important;
            }
          }
        `}
      </style>

      <div className="px-4 py-3 h-[60px] w-full bg-transparent">
        <Link to="/">
          <img
            src={Recrumeta}
            alt="Logo"
            className="w-[140px] h-[35px] sm:w-[200px] sm:h-[50px] cursor-pointer transition-all duration-200"
          />
        </Link>
      </div>

      <div className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
        <div className="p-5 sm:p-10 w-full max-w-[500px] h-[auto] bg-white bg-opacity-45 rounded-2xl">
          <div className="w-full h-full">
            <div>
              <p className="text-[28px] sm:text-[36px] text-black leading-[1.2] font-semibold">
                Reset your password
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              <div className="flex items-center justify-center">
                <div className="w-full flex flex-col space-y-[16px] max-w-md items-center justify-center">
                  <div className="relative group w-full flex items-center justify-center">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full sm:w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  <div className="relative group w-full flex items-center justify-center">
                    <input
                      id="old-password"
                      type={isOldPasswordVisible ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full sm:w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                      placeholder="Enter Your Old Password"
                    />
                    <button
                      type="button"
                      onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                      className="absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                    >
                      {isOldPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="relative group w-full flex items-center justify-center">
                    <input
                      id="password"
                      type={isNewPasswordVisible ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full sm:w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                      placeholder="Enter Your New Password"
                    />
                    <button
                      type="button"
                      onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                      className="absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                    >
                      {isNewPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="relative group w-full flex items-center justify-center">
                    <input
                      id="confirm-password"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full sm:w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                      placeholder="Confirm Your New Password"
                    />
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      className="absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                    >
                      {isConfirmPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="w-full sm:w-[90%] flex flex-row justify-between">
                    <div className="relative group w-[58%] sm:w-[60%] flex items-center justify-center">
                      <div className="relative w-full">
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 appearance-none cursor-pointer"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            className="option-style"
                          >
                            Select Your Role
                          </option>
                          <option value="client" className="option-style">
                            Client
                          </option>
                          <option value="interviewer" className="option-style">
                            Interviewer
                          </option>
                          <option value="internal" className="option-style">
                            Internal
                          </option>
                        </select>

                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <div className="h-6 w-6 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-orange-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-auto flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                          bg-white text-[#E65F2B] text-lg flex items-center justify-center px-4 sm:px-5 
                          rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 
                          active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out
                          relative overflow-hidden group whitespace-nowrap
                          ${isSubmitting ? 'w-[132px] sm:w-[140px]' : 'w-auto'}
                        `}
                      >
                        {isSubmitting ? (
                          <div className="w-full flex justify-center items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#E65F2B]"></div>
                          </div>
                        ) : (
                          <>
                            Submit
                            <svg
                              width="25"
                              height="30"
                              viewBox="0 0 39 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="transform transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.9583 8.98267C13.9583 8.29231 14.518 7.73267 15.2083 7.73267L29.5154 7.73267C29.847 7.73267 30.1649 7.86436 30.3993 8.09878C30.6337 8.3332 30.7654 8.65115 30.7654 8.98267L30.7654 23.2898C30.7654 23.9801 30.2058 24.5398 29.5154 24.5398C28.8251 24.5398 28.2654 23.9801 28.2654 23.2898L28.2654 10.2327L15.2083 10.2327C14.518 10.2327 13.9583 9.67302 13.9583 8.98267Z"
                                fill="#E65F2B"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.5969 29.9012C8.10874 29.4131 8.10874 28.6216 8.5969 28.1335L28.4312 8.29911C28.9194 7.81095 29.7109 7.81095 30.199 8.29911C30.6872 8.78726 30.6872 9.57872 30.199 10.0669L10.3647 29.9012C9.87651 30.3894 9.08505 30.3894 8.5969 29.9012Z"
                                fill="#E65F2B"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="px-2 mt-5">
              <Link to="/auth/signin" className="text-[#E65F2B] text group">
                <span className="font-normal group-hover:underline">Signin Instead</span>
              </Link>
              <p className="text-[#1E1E1E] mt-1 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link to="/contact" className="text-[#E65F2B] hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;