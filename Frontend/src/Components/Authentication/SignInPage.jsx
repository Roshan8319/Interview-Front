import React from "react";
import { useState, useEffect } from "react";
import Bg from "../../assets/bg.jpg";
import Recrumeta from "../../assets/Recrumeta.png";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
// Import sonner toast
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";

const VISITOR_ACCOUNTS = {
  CLIENT: { email: 'visitor@zomato.com', password: 'Client@2025' },
  INTERNAL: { email: 'visitor.internal@gmail.com', password: 'Internal@2025' },
  INTERVIEWER: { email: 'visitor.interviewer@gmail.com', password: 'Interviewer@2025' }
};

function SignInPage() {

  const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();
  const location = useLocation();

  const [signinas, setSigninas] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisitorAccount, setIsVisitorAccount] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleVisitorLogin = (role) => {
    setSigninas(role);
    setEmail(VISITOR_ACCOUNTS[role].email);
    setPassword(VISITOR_ACCOUNTS[role].password);
    setIsVisitorAccount(true); // Set flag when visitor account is selected
  };

  useEffect(() => {
    const img = new Image();
    img.src = Bg;
    img.onload = () => {
      setBgLoaded(true);
      setLoading(false);
    };
    img.onerror = () => {
      console.error('Error loading background image');
      setBgLoaded(true);
      setLoading(false);
      toast.error("Failed to load background image");
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
    </div>
  );

  const getDefaultPath = (role) => {
    switch (role) {
      case "CLIENT":
        return "/client/dashboard";
      case "INTERNAL":
        return "/internal/dashboard";
      case "INTERVIEWER":
        return "/interviewer/dashboard";
      default:
        return "/";
    }
  };

  const handleLoginViaEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      setIsSubmitting(false);
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      setIsSubmitting(false);
      return;
    }

    if (!signinas) {
      toast.error("Please select your role");
      setIsSubmitting(false);
      return;
    }

    try {
      const targetUrl = signinas === "CLIENT"
        ? `${baseUrl}/api/v1/client/signIn`
        : signinas === "INTERNAL"
          ? `${baseUrl}/api/v1/internal/signIn`
          : `${baseUrl}/api/v1/interviewer/signIn`;

      const response = await axios.post(
        targetUrl,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { accessToken, refreshToken } = response.data.data;

      // Set cookies
      Cookies.set('accessToken', accessToken, {
        expires: 1 / 24,
        secure: true,
        sameSite: 'None',
        path: '/'
      });

      Cookies.set('refreshToken', refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'none',
        path: '/'
      });

      // Create user object for localStorage
      const user = {
        role: signinas.toLowerCase(), // Convert to lowercase to match protected route expectations
        displayName: "",
        clientId: "",
        isVisitor: isVisitorAccount // Add visitor flag
      };

      // Set role-specific data
      if (signinas === "CLIENT") {
        user.displayName = response.data.data.client.companyName;
        user.clientId = response.data.data.client.clientId;
      } else if (signinas === "INTERVIEWER") {
        user.displayName = response.data.data.interviewer.firstName;
      } else if (signinas === "INTERNAL") {
        user.displayName = response.data.data.user.firstName;
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('displayName', user.displayName);
      sessionStorage.setItem('clientId', user.clientId);
      // Store visitor status
      sessionStorage.setItem('isVisitor', isVisitorAccount.toString());

      // Check for redirect path from protected route
      const redirectPath = localStorage.getItem('redirectPath') || getDefaultPath(signinas);
      localStorage.removeItem('redirectPath'); // Clean up

      if (response.status === 200) {
        toast.success("Sign in successful!");
        navigate(redirectPath);
      }
    } catch (error) {
      // Enhanced error handling for various error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        if (error.response.status === 401) {
          toast.error("Invalid email or password");
        } else if (error.response.status === 403) {
          toast.error("You don't have permission to access this resource");
        } else {
          const errorMessage = error?.response?.data?.error?.[0]?.error ||
            error?.response?.data?.message ||
            "An error occurred during sign in";
          toast.error(errorMessage);
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network error. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] h-[100%]">
      {/* Sonner Toaster component */}
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

      {(!bgLoaded || loading) ? (
        <div className="min-h-screen flex flex-col bg-[#EBDFD7] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className="w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${Bg})` }}
        >
          <div className="px-4 py-3 h-[60px] w-full bg-transparent">
            <Link to="/">
              <img
                src={Recrumeta}
                alt="Logo"
                className="w-[140px] h-[35px] sm:w-[200px] sm:h-[50px] cursor-pointer transition-all duration-200"
              />
            </Link>
          </div>
          <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
            <div className="p-4 sm:p-8 w-full max-w-[500px] bg-white bg-opacity-45 rounded-2xl">
              <div className="w-full">
                <div>
                  <p className="text-[28px] sm:text-[38px] text-black leading-[1.2] font-semibold">
                    Upscale your hiring process with{" "}
                    <span className="text-[#E65F2B]">us</span>
                  </p>
                  <p className="pt-3 text-[14px] sm:text-[16px] text-[#666666]">
                    Connect to one-on-one Virtual Interviews and Professional Hiring Services
                  </p>
                </div>
                <div className="mt-5">
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
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            if (!isVisitorAccount) {
                              setPassword(e.target.value);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (isVisitorAccount) {
                              e.preventDefault();
                            }
                          }}
                          className={`w-full sm:w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1 ${isVisitorAccount ? 'cursor-not-allowed' : ''}`}
                          placeholder="Enter Your Password"
                          readOnly={isVisitorAccount}
                          autoComplete="new-password"
                        />
                        {!isVisitorAccount && (
                          <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                          >
                            {isPasswordVisible ? (
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
                        )}
                      </div>

                      <div className="w-full sm:w-[90%] flex flex-row justify-between">
                        <div className="relative group w-[58%] sm:w-[60%] flex items-center justify-center">
                          <div className="relative w-full">
                            <select
                              id="role"
                              value={signinas}
                              onChange={(e) => setSigninas(e.target.value)}
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
                              <option value="CLIENT">Client</option>
                              <option value="INTERNAL">Internal</option>
                              <option value="INTERVIEWER">Interviewer</option>
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
                            onClick={handleLoginViaEmail}
                            disabled={isSubmitting}
                            className={`
                              bg-white text-[#E65F2B] text-lg flex items-center justify-center px-4 sm:px-5 
                              rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 
                              active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out
                              relative overflow-hidden group whitespace-nowrap
                              ${isSubmitting ? 'w-[127px] sm:w-[135px]' : 'w-auto'}
                            `}
                          >
                            {isSubmitting ? (
                              <div className="w-full flex justify-center items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#E65F2B]"></div>
                              </div>
                            ) : (
                              <>
                                Sign in
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
                </div>

                <div className="px-2 mt-4">
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-600 mb-3 text-center">Quick access with visitor accounts</p>
                    <div className="flex flex-wrap sm:px-3.5 justify-between">
                      <button
                        onClick={() => handleVisitorLogin('CLIENT')}
                        className="px-2.5 py-1.5 pr-3 bg-white hover:bg-gray-50 text-gray-800 rounded-3xl text-sm sm:text-base font-medium transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow active:scale-95 active:shadow-inner"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E65F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Client
                      </button>
                      <button
                        onClick={() => handleVisitorLogin('INTERNAL')}
                        className="px-2.5 py-1.5 pr-3 bg-white hover:bg-gray-50 text-gray-800 rounded-3xl text-sm sm:text-base font-medium transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow active:scale-95 active:shadow-inner"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E65F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Internal
                      </button>
                      <button
                        onClick={() => handleVisitorLogin('INTERVIEWER')}
                        className="px-2.5 py-1.5 pr-3 bg-white hover:bg-gray-50 text-gray-800 rounded-3xl text-sm sm:text-base font-medium transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow active:scale-95 active:shadow-inner"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E65F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Interviewer
                      </button>
                    </div>
                  </div>

                  <Link
                    to="/auth/reset-password"
                    className="text-[#E65F2B] hover:underline block mt-4 text-sm sm:text-base"
                  >
                    Reset Password?
                  </Link>
                  <p className="text-[#1E1E1E] mt-1 text-sm sm:text-base">
                    Don't have an account?{" "}
                    <Link to="/contact" className="text-[#E65F2B] hover:underline">
                      Contact Support
                    </Link>
                  </p>
                  <p className="text-[#1E1E1E] mt-1 text-sm sm:text-base">
                    By signing up, you agree to{" "}
                    <Link to="/terms" className="text-[#E65F2B] hover:underline">
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#E65F2B] hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInPage;