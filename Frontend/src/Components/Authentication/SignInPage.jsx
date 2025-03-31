import React from "react";
import { useState, useEffect } from "react";
import Bg from "../../assets/bg.jpg";
import Recrumeta from "../../assets/Recrumeta.png";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Load from "../../assets/Load";


function SignInPage() {

  const baseUrl = import.meta.env.VITE_BASE_URL

  const navigate = useNavigate();

  const [signinas, setSigninas]= useState('');
  const [errorMessage,setErrorMessage]=useState("");
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    let minLoadingTimeout;
    const startTime = Date.now();
    const minLoadingTime = 2000; // 2 seconds minimum loading time

    // Preload background image
    const img = new Image();
    img.src = Bg;
    
    img.onload = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Wait for minimum time before hiding loader
      minLoadingTimeout = setTimeout(() => {
        setBgLoaded(true);
        setLoading(false);
      }, remainingTime);
    };

    img.onerror = () => {
      console.error('Error loading background image');
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      minLoadingTimeout = setTimeout(() => {
        setBgLoaded(true);
        setLoading(false);
      }, remainingTime);
    };

    return () => {
      if (minLoadingTimeout) clearTimeout(minLoadingTimeout);
    };
  }, []);

  const handleLoginViaEmail = async (e) => {
    e.preventDefault();
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
        
        // Set cookies with secure configuration
        Cookies.set('accessToken', accessToken, {
            expires: 1/24, // 1 hour
            secure: false,
            sameSite: 'None',
            path: '/'
        });

        Cookies.set('refreshToken', refreshToken, {
            expires: 7, // 7 days
            secure: false,
            sameSite: 'none',
            path: '/'
        });

        let displayName = "";
        let clientId = "";

        if (signinas === "CLIENT") {
            displayName = response.data.data.client.companyName;
            clientId = response.data.data.client.clientId;
        } else if (signinas === "INTERVIEWER") {
            displayName = response.data.data.interviewer.firstName;
        } 

        sessionStorage.setItem('displayName', displayName);
        sessionStorage.setItem('clientId', clientId);
        
        if (response.status === 200) {
            const dashboardPath = signinas === "CLIENT"
                ? "/client/dashboard"
                : signinas === "INTERNAL"
                ? "/internal/dashboard"
                : "/interviewer/dashboard";
                
            navigate(dashboardPath);
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.error?.[0]?.error || "An error occurred";
        setErrorMessage(errorMessage);
    } finally {
        setLoading(false);
    }
}


  

  return (
    <div className="w-[100%] h-[100%]">
      {loading || !bgLoaded ? (
        <Load />
      ) : (
        <div
          className="w-screen h-screen bg-cover bg-center transition-opacity duration-500 opacity-100"
          style={{ backgroundImage: `url(${Bg})` }}
        >
          <div className="px-4 py-2 h-[60px] w-full bg-transparent">
            <img src={Recrumeta} alt="Logo" style={{width:"200px", height:"50px"}}/>
          </div>
          <div className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center">
            <div className="p-10 w-[500px] h-[auto] bg-white bg-opacity-45 rounded-2xl">
              <div className="w-full h-full">
                <div>
                  <p className="text-[42px] text-black leading-[1.2] font-semibold">
                    Upscale your hiring process with{" "}
                    <span className="text-[#E65F2B]">us</span>
                  </p>
                  <p className="pt-4 text-[18px] text-[#666666]">
                    Connect to one-on-one Virtual Interviews and Professional Hiring
                    Services
                  </p>
                </div>
                <div className="mt-5">
                  <div className=" flex items-center justify-center">
                    <div className="w-full flex flex-col space-y-[16px] max-w-md items-center justify-center">
                      <div className="relative group w-full flex items-center justify-center">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                          placeholder="Enter Your Email"
                        />
                      </div>

                      <div className="relative group w-full flex items-center justify-center">
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-[90%] py-2 px-4 border-2 rounded-3xl outline-none transition-all duration-200 bg-[#F6F1EE] shadow-sm border-gray-300 focus:border-orange-200 focus:ring-1"
                          placeholder="Enter Your Password"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const passwordInput =
                              document.getElementById("password");
                            if (passwordInput.type === "password") {
                              passwordInput.type = "text";
                              document
                                .getElementById("eye-icon-open") //
                                .classList.add("hidden");
                              document
                                .getElementById("eye-icon-closed")
                                .classList.remove("hidden");
                            } else {
                              passwordInput.type = "password";
                              document
                                .getElementById("eye-icon-open")
                                .classList.remove("hidden");
                              document
                                .getElementById("eye-icon-closed")
                                .classList.add("hidden");
                            }
                          }}
                          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          {/* Eye open icon (visible by default - indicating password is hidden) */}
                          <svg
                            id="eye-icon-open"
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

                          {/* Eye closed icon (hidden by default) */}
                          <svg
                            id="eye-icon-closed"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hidden"
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
                        </button>
                      </div>
                      <div className="px-2 w-full flex item-center gap-x-5">
                        <div class="relative group w-[60%] flex items-center justify-center">
                          <div class="relative w-[90%]">
                            <select
                              id="role"
                              value={signinas}
                              onChange={(e)=>setSigninas(e.target.value)}
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
                              <option value="INTERVIEWER">Interviewer</option>
                              <option value="INTERNAL">Internal</option>

                            </select>

                            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                              <div class="h-6 w-6 rounded-full flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 text-orange-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button onClick={handleLoginViaEmail}
                                  class="bg-white text-[#E65F2B] text-lg flex items-center justify-center px-5 py-2 rounded-full gap-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden group">
                            Sign in
                            <svg
                              width="25"
                              height="30"
                              viewBox="0 0 39 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="transform transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.9583 8.98267C13.9583 8.29231 14.518 7.73267 15.2083 7.73267L29.5154 7.73267C29.847 7.73267 30.1649 7.86436 30.3993 8.09878C30.6337 8.3332 30.7654 8.65115 30.7654 8.98267L30.7654 23.2898C30.7654 23.9801 30.2058 24.5398 29.5154 24.5398C28.8251 24.5398 28.2654 23.9801 28.2654 23.2898L28.2654 10.2327L15.2083 10.2327C14.518 10.2327 13.9583 9.67302 13.9583 8.98267Z"
                                fill="#E65F2B"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5969 29.9012C8.10874 29.4131 8.10874 28.6216 8.5969 28.1335L28.4312 8.29911C28.9194 7.81095 29.7109 7.81095 30.199 8.29911C30.6872 8.78726 30.6872 9.57872 30.199 10.0669L10.3647 29.9012C9.87651 30.3894 9.08505 30.3894 8.5969 29.9012Z"
                                fill="#E65F2B"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 mt-5">
                <Link
                    to="/auth/reset-password"
                    className="text-[#E65F2B] hover:underline"
                  >
                    Reset Password?
                  </Link>
                  <p className="text-[#1E1E1E] mt-1">
                    Don't have an account?{" "}
                    <span className="text-[#E65F2B] hover:underline">Contact Support</span>
                  </p>
                  <p className="text-[#1E1E1E] mt-1">
                    By signing up, you agree to{" "}
                    <span className="text-[#E65F2B] hover:underline">Terms of use</span>{" "}
                    and{" "}
                    <span className="text-[#E65F2B] hover:underline">Privacy Policy</span>.
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
