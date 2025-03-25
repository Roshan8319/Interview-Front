import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtEncode from "jwt-encode";

const InterviewDashboard = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [activeTab, setActiveTab] = useState("Home");
  const [activeTab2, setActiveTab2] = useState("details");
  const [nextAppointment, setNextAppointment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [interviewerName, setInterviewerName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/interviewer/my-appointments`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data.appointment);
        
        setNextAppointment(response.data.data.appointment);
        setMeetingLink(response.data.data.appointment.meetingId);
        setInterviewerName(response.data.data.appointment.interviewerName);

      } catch (error) {
        console.log("Error occurred while fetching appointment.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handelJoinInterview = () => {
    const user = {
        name: interviewerName
    };

    const token = jwtEncode(user, import.meta.env.VITE_JWT_SECRET_NAME_MASK);

    const url = `/interview/${meetingLink}?token=${encodeURIComponent(token)}`;
    window.open(url, "_blank");
};

  const icons = {
    bell: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    copy: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    clock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    briefcase: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    file: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    ),
    video: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    message: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  };

  return (
    <div className="p-4 min-h-[calc(100vh-64px)] bg-[#EBDFD7]">
      {/* Main content */}
      <main className="max-w-full mx-auto flex flex-col gap-y-4 px-4 lg:px-6">
        {/* Stats cards */}
        <div className="w-full px-1  py-2  ">
          <div className="flex flex-wrap justify-between  gap-4">
            {/* Card 1 - Total Interviews with gradient background */}
            <div className="bg-[#ffffff57] w-full sm:w-60 h-[200px] overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className=" flex flex-col gap-y-2 px-4 py-8 ">
                <div>
                  <svg width="44" height="44" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="46" height="46" rx="23" fill="#D398E7" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23 15.0205C20.8484 15.0205 19.1042 16.7647 19.1042 18.9163C19.1042 21.068 20.8484 22.8122 23 22.8122C25.1516 22.8122 26.8959 21.068 26.8959 18.9163C26.8959 16.7647 25.1516 15.0205 23 15.0205ZM17.7292 18.9163C17.7292 16.0053 20.089 13.6455 23 13.6455C25.911 13.6455 28.2709 16.0053 28.2709 18.9163C28.2709 21.8273 25.911 24.1872 23 24.1872C20.089 24.1872 17.7292 21.8273 17.7292 18.9163Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4384 32.6667C14.4384 28.6142 18.414 25.5625 23 25.5625C27.586 25.5625 31.5617 28.6142 31.5617 32.6667C31.5617 33.0464 31.2539 33.3542 30.8742 33.3542C30.4945 33.3542 30.1867 33.0464 30.1867 32.6667C30.1867 29.6241 27.104 26.9375 23 26.9375C18.896 26.9375 15.8134 29.6241 15.8134 32.6667C15.8134 33.0464 15.5056 33.3542 15.1259 33.3542C14.7462 33.3542 14.4384 33.0464 14.4384 32.6667Z" fill="white" />
                  </svg>

                </div>
                <div className="text-xs font-medium text-gray-500">
                  Total Interviews
                </div>
                <div className="flex flex-col gap-y-2 items-baseline">
                  <p className="text-2xl font-bold text-black">43</p>
                  <p className=" text-xs font-medium text-gray-500">
                  <span className="text-[18px] text-green-500 " >↗</span> 12% this week
                  </p>
                </div>
                
              </div>
            </div>

            {/* Card 2 - Avg-Interview/Month */}
            <div className="bg-[#ffffff57] w-full h-[200px] sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className=" flex flex-col gap-y-2 px-4 py-8 ">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Avg-Interview/Month
                  </div>
                  
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900">43</p>
                  <div className="ml-2 flex items-center text-xs font-medium text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span>8%</span>
                  </div>
                </div>
                <div className="mt-2 flex space-x-1">
                  {[0.3, 0.5, 0.7, 0.4, 0.9, 1.2, 1.5].map((height, i) => (
                    <div key={i} className="w-full">
                      <div
                        className="bg-[#64BE73] rounded-t"
                        style={{ height: `${height * 24}px` }}
                      ></div>
                      <div className="bg-gray-100 h-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 - Today's Income */}
            <div className="bg-[#ffffff57] w-full h-[200px] sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex flex-col gap-y-2 px-4 py-8 ">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Today's Income
                  </div>
                 
                </div>
                <div className="flex" >
                  <div className="p-1  rounded-full">
                    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44px" height="44px" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">    </style> <g> <path class="st0" d="M418.336,193.866C397.758,111.819,318.07,80.96,311.102,73.444l19.594-71.328c0,0-24.469-7.906-58.797,6.828 c-43.641,18.734-67.953-5.156-67.953-5.156l21.547,70.781c-6.766,7.688-91.516,42.141-106.875,123.219 c-7.797,41.094,3.422,92.531,39.25,127.516c12.953-4.984,29.078-8.219,49.969-8.219h85.594c19.844,0,35.984,16.141,35.984,35.984 c0,0.906-0.125,1.797-0.188,2.688C407.258,328.663,432.555,250.429,418.336,193.866z M312.883,263.132 c-1.969,4.25-4.984,7.984-8.953,11.141c-4.063,3.172-9.25,5.734-15.438,7.578c-3.031,0.875-6.359,1.563-9.938,2.016v11.828h-17.563 v-11.188c-6.422-0.328-12.625-1.172-18.469-2.625c-6.734-1.656-12.063-3.703-16.297-6.25c-1.016-0.625-1.109-0.844-1.109-3.016 v-15.125c0-1.172,0.266-1.172,0.625-1.172c0.313,0,0.672,0.094,0.938,0.234c1.453,0.766,2.984,1.531,4.547,2.297 c3.75,1.781,7.625,3.328,11.531,4.625c3.891,1.313,7.797,2.375,11.594,3.156c3.875,0.797,7.531,1.219,10.813,1.219 c8.266,0,14.234-1.609,18.266-4.922c4.125-3.391,6.203-7.609,6.203-12.547c0-2.469-0.422-4.75-1.25-6.766 c-0.875-2.141-2.469-4.109-4.766-5.875c-2.078-1.625-4.984-3.219-8.609-4.734c-3.5-1.469-8-3.047-13.375-4.703 c-7.109-2.281-13.125-4.719-17.875-7.234c-4.641-2.453-8.375-5.172-11.125-8.063c-2.672-2.813-4.594-5.891-5.75-9.156 c-1.172-3.328-1.766-7.031-1.766-10.984c0-5,1.25-9.609,3.703-13.703c2.5-4.203,6-7.859,10.359-10.906 c4.406-3.078,9.703-5.516,15.688-7.219c1.984-0.547,4.063-0.984,6.125-1.359v-11.625h17.563v10.594 c4.891,0.188,9.766,0.609,14.469,1.469c5.094,0.906,10.109,2.406,14.906,4.406c0.906,0.375,1.125,0.594,1.125,1.453v15.656 c-0.016,0.234-0.219,0.313-0.625,0.313c-0.359,0-0.656-0.063-0.828-0.125c-4.25-1.453-8.688-2.75-13.188-3.797 c-6.516-1.516-13.031-2.297-19.328-2.297c-7.75,0-13.75,1.516-17.859,4.5c-4.375,3.203-6.594,7.344-6.594,12.328 c0,2.156,0.484,4.219,1.406,6.109c0.938,1.906,2.5,3.734,4.688,5.406c2.031,1.563,4.703,3.109,8.203,4.688 c3.313,1.531,7.594,3.109,12.656,4.656c6.797,2.094,12.719,4.344,17.625,6.688c4.797,2.281,8.797,4.844,11.875,7.625 c3,2.672,5.203,5.766,6.594,9.188c1.438,3.5,2.156,7.609,2.156,12.25C315.836,254.179,314.836,258.866,312.883,263.132z"></path> <path class="st0" d="M234.57,374.46c14.281,0,58.859,0,58.859,0c11.828,0,21.406-9.578,21.406-21.391 c0-11.828-9.578-21.406-21.406-21.406c-10.703,0-32.094,0-85.594,0c-53.516,0-70.453,22.297-89.188,41.016l-33.984,29.688 c-2.203,1.922-3.469,4.688-3.469,7.625v98.641c0,1.313,0.766,2.516,1.969,3.063s2.609,0.359,3.609-0.516l65.672-56.297 c2.313-1.969,5.406-2.797,8.391-2.266l102.344,18.609c7.141,1.297,14.484-0.344,20.422-4.531c0,0,130.625-90.828,140.266-98.859 l0,0c9.188-8.438,9.094-20.672,0.641-29.875c-8.438-9.203-24.172-7.25-34.688,0.531c-9.625,8.016-75.359,51.219-75.359,51.219 H234.57l-0.25,0.125c-4.203-0.141-7.5-3.672-7.375-7.875c0.156-4.203,3.688-7.5,7.875-7.359L234.57,374.46z"></path> </g> </g></svg>
                  </div>
                  <div className="flex flex-col items-baseline mt-1">
                    <p className="text-2xl font-bold text-gray-900">$17 </p>
                    <p className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                    <span className="text-[18px] text-green-500 " >↗</span> 12% from last day
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full bg-blue-400 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-green-400 border border-white"></div>
                      <div className="w-5 h-5 rounded-full bg-yellow-400 border border-white"></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      +14 today
                    </span>
                  </div>
                  <span className="text-xs text-green-500 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 - Total Income */}
            <div className="bg-[#ffffff57] w-full h-[200px] sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex flex-col gap-y-2 px-4 py-8 ">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Total Income
                  </div>
                 
                </div>
                <div className="flex" >
                  <div className="p-1  rounded-full">
                    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44px" height="44px" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">    </style> <g> <path class="st0" d="M418.336,193.866C397.758,111.819,318.07,80.96,311.102,73.444l19.594-71.328c0,0-24.469-7.906-58.797,6.828 c-43.641,18.734-67.953-5.156-67.953-5.156l21.547,70.781c-6.766,7.688-91.516,42.141-106.875,123.219 c-7.797,41.094,3.422,92.531,39.25,127.516c12.953-4.984,29.078-8.219,49.969-8.219h85.594c19.844,0,35.984,16.141,35.984,35.984 c0,0.906-0.125,1.797-0.188,2.688C407.258,328.663,432.555,250.429,418.336,193.866z M312.883,263.132 c-1.969,4.25-4.984,7.984-8.953,11.141c-4.063,3.172-9.25,5.734-15.438,7.578c-3.031,0.875-6.359,1.563-9.938,2.016v11.828h-17.563 v-11.188c-6.422-0.328-12.625-1.172-18.469-2.625c-6.734-1.656-12.063-3.703-16.297-6.25c-1.016-0.625-1.109-0.844-1.109-3.016 v-15.125c0-1.172,0.266-1.172,0.625-1.172c0.313,0,0.672,0.094,0.938,0.234c1.453,0.766,2.984,1.531,4.547,2.297 c3.75,1.781,7.625,3.328,11.531,4.625c3.891,1.313,7.797,2.375,11.594,3.156c3.875,0.797,7.531,1.219,10.813,1.219 c8.266,0,14.234-1.609,18.266-4.922c4.125-3.391,6.203-7.609,6.203-12.547c0-2.469-0.422-4.75-1.25-6.766 c-0.875-2.141-2.469-4.109-4.766-5.875c-2.078-1.625-4.984-3.219-8.609-4.734c-3.5-1.469-8-3.047-13.375-4.703 c-7.109-2.281-13.125-4.719-17.875-7.234c-4.641-2.453-8.375-5.172-11.125-8.063c-2.672-2.813-4.594-5.891-5.75-9.156 c-1.172-3.328-1.766-7.031-1.766-10.984c0-5,1.25-9.609,3.703-13.703c2.5-4.203,6-7.859,10.359-10.906 c4.406-3.078,9.703-5.516,15.688-7.219c1.984-0.547,4.063-0.984,6.125-1.359v-11.625h17.563v10.594 c4.891,0.188,9.766,0.609,14.469,1.469c5.094,0.906,10.109,2.406,14.906,4.406c0.906,0.375,1.125,0.594,1.125,1.453v15.656 c-0.016,0.234-0.219,0.313-0.625,0.313c-0.359,0-0.656-0.063-0.828-0.125c-4.25-1.453-8.688-2.75-13.188-3.797 c-6.516-1.516-13.031-2.297-19.328-2.297c-7.75,0-13.75,1.516-17.859,4.5c-4.375,3.203-6.594,7.344-6.594,12.328 c0,2.156,0.484,4.219,1.406,6.109c0.938,1.906,2.5,3.734,4.688,5.406c2.031,1.563,4.703,3.109,8.203,4.688 c3.313,1.531,7.594,3.109,12.656,4.656c6.797,2.094,12.719,4.344,17.625,6.688c4.797,2.281,8.797,4.844,11.875,7.625 c3,2.672,5.203,5.766,6.594,9.188c1.438,3.5,2.156,7.609,2.156,12.25C315.836,254.179,314.836,258.866,312.883,263.132z"></path> <path class="st0" d="M234.57,374.46c14.281,0,58.859,0,58.859,0c11.828,0,21.406-9.578,21.406-21.391 c0-11.828-9.578-21.406-21.406-21.406c-10.703,0-32.094,0-85.594,0c-53.516,0-70.453,22.297-89.188,41.016l-33.984,29.688 c-2.203,1.922-3.469,4.688-3.469,7.625v98.641c0,1.313,0.766,2.516,1.969,3.063s2.609,0.359,3.609-0.516l65.672-56.297 c2.313-1.969,5.406-2.797,8.391-2.266l102.344,18.609c7.141,1.297,14.484-0.344,20.422-4.531c0,0,130.625-90.828,140.266-98.859 l0,0c9.188-8.438,9.094-20.672,0.641-29.875c-8.438-9.203-24.172-7.25-34.688,0.531c-9.625,8.016-75.359,51.219-75.359,51.219 H234.57l-0.25,0.125c-4.203-0.141-7.5-3.672-7.375-7.875c0.156-4.203,3.688-7.5,7.875-7.359L234.57,374.46z"></path> </g> </g></svg>
                  </div>
                  <div className="flex flex-col items-baseline mt-1">
                    <p className="text-2xl font-bold text-gray-900">$25K</p>
                    <p className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                    <span className="text-[18px] text-green-500 " >↗</span> 12% from last day
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <svg width="200" height="60" viewBox="0 0 212 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M210.999 11.0753V89H0.999954V25.8666C5.55615 20.9361 15.7869 10.4265 20.2602 7.83131C25.8519 4.58735 27.7158 12.9524 37.0353 25.8666C44.4909 36.1979 52.982 30.1713 56.2956 25.8666L72.4494 18.1849C75.763 22.2744 83.3842 28.6231 87.3605 21.3021C91.3368 13.9811 101.029 11.4338 105.378 11.0753C110.687 14.1502 123.083 21.4134 130.197 25.8666C139.088 31.433 141.94 25.3099 149.657 18.1849C157.374 11.0598 165.762 19.6322 170.963 21.3021C176.163 22.972 181.364 14.845 182.538 12.9524C183.713 11.0598 190.591 13.5091 194.114 12.9524C196.932 12.5071 197.969 6.8563 201.921 7.14775L210.999 11.0753Z" fill="url(#paint0_linear_245_4541)" />
                    <path d="M210.999 11.0753L201.921 7.14775C197.969 6.8563 196.932 12.5071 194.114 12.9524C190.591 13.5091 183.713 11.0598 182.538 12.9524C181.364 14.845 176.163 22.972 170.963 21.3021C165.762 19.6322 157.374 11.0598 149.657 18.1849C141.94 25.3099 139.088 31.433 130.197 25.8666C123.083 21.4134 110.687 14.1502 105.378 11.0753C101.029 11.4338 91.3368 13.9811 87.3605 21.3021C83.3842 28.6231 75.763 22.2744 72.4494 18.1849L56.2956 25.8666C52.982 30.1713 44.4909 36.1979 37.0353 25.8666C27.7158 12.9524 25.8519 4.58735 20.2602 7.83131C15.7869 10.4265 5.55615 20.9361 0.999958 25.8666" stroke="#007D15" />
                    <path d="M131.418 8.108V7.338L135.356 2.3H136.544L132.639 7.338L132.078 7.162H138.227V8.108H131.418ZM135.697 10V8.108L135.73 7.162V5.49H136.764V10H135.697ZM141.362 10.088C140.819 10.088 140.291 10.0037 139.778 9.835C139.272 9.66633 138.857 9.439 138.535 9.153L139.041 8.284C139.297 8.526 139.631 8.724 140.042 8.878C140.452 9.032 140.889 9.109 141.351 9.109C141.937 9.109 142.388 8.98433 142.704 8.735C143.019 8.48567 143.177 8.152 143.177 7.734C143.177 7.448 143.107 7.19867 142.968 6.986C142.828 6.77333 142.586 6.612 142.242 6.502C141.904 6.38467 141.439 6.326 140.845 6.326H139.096L139.503 2.3H143.848V3.257H139.91L140.482 2.718L140.163 5.897L139.591 5.369H141.076C141.846 5.369 142.465 5.468 142.935 5.666C143.404 5.864 143.745 6.139 143.958 6.491C144.17 6.83567 144.277 7.23533 144.277 7.69C144.277 8.13 144.17 8.53333 143.958 8.9C143.745 9.25933 143.422 9.549 142.99 9.769C142.564 9.98167 142.022 10.088 141.362 10.088ZM148.338 10.088C147.737 10.088 147.198 9.934 146.721 9.626C146.252 9.318 145.878 8.87067 145.599 8.284C145.328 7.69733 145.192 6.986 145.192 6.15C145.192 5.314 145.328 4.60267 145.599 4.016C145.878 3.42933 146.252 2.982 146.721 2.674C147.198 2.366 147.737 2.212 148.338 2.212C148.932 2.212 149.467 2.366 149.944 2.674C150.421 2.982 150.795 3.42933 151.066 4.016C151.337 4.60267 151.473 5.314 151.473 6.15C151.473 6.986 151.337 7.69733 151.066 8.284C150.795 8.87067 150.421 9.318 149.944 9.626C149.467 9.934 148.932 10.088 148.338 10.088ZM148.338 9.109C148.741 9.109 149.093 8.999 149.394 8.779C149.702 8.559 149.94 8.229 150.109 7.789C150.285 7.349 150.373 6.80267 150.373 6.15C150.373 5.49733 150.285 4.951 150.109 4.511C149.94 4.071 149.702 3.741 149.394 3.521C149.093 3.301 148.741 3.191 148.338 3.191C147.935 3.191 147.579 3.301 147.271 3.521C146.963 3.741 146.721 4.071 146.545 4.511C146.376 4.951 146.292 5.49733 146.292 6.15C146.292 6.80267 146.376 7.349 146.545 7.789C146.721 8.229 146.963 8.559 147.271 8.779C147.579 8.999 147.935 9.109 148.338 9.109ZM155.675 10.088C155.074 10.088 154.535 9.934 154.058 9.626C153.589 9.318 153.215 8.87067 152.936 8.284C152.665 7.69733 152.529 6.986 152.529 6.15C152.529 5.314 152.665 4.60267 152.936 4.016C153.215 3.42933 153.589 2.982 154.058 2.674C154.535 2.366 155.074 2.212 155.675 2.212C156.269 2.212 156.804 2.366 157.281 2.674C157.758 2.982 158.132 3.42933 158.403 4.016C158.674 4.60267 158.81 5.314 158.81 6.15C158.81 6.986 158.674 7.69733 158.403 8.284C158.132 8.87067 157.758 9.318 157.281 9.626C156.804 9.934 156.269 10.088 155.675 10.088ZM155.675 9.109C156.078 9.109 156.43 8.999 156.731 8.779C157.039 8.559 157.277 8.229 157.446 7.789C157.622 7.349 157.71 6.80267 157.71 6.15C157.71 5.49733 157.622 4.951 157.446 4.511C157.277 4.071 157.039 3.741 156.731 3.521C156.43 3.301 156.078 3.191 155.675 3.191C155.272 3.191 154.916 3.301 154.608 3.521C154.3 3.741 154.058 4.071 153.882 4.511C153.713 4.951 153.629 5.49733 153.629 6.15C153.629 6.80267 153.713 7.349 153.882 7.789C154.058 8.229 154.3 8.559 154.608 8.779C154.916 8.999 155.272 9.109 155.675 9.109Z" fill="#64BE73" />
                    <circle cx="148.5" cy="22.5" r="4" fill="#64BE73" stroke="white" stroke-width="3" />
                    <defs>
                      <linearGradient id="paint0_linear_245_4541" x1="105.999" y1="7.13086" x2="105.999" y2="89" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#61D474" />
                        <stop offset="1" stop-color="#BDFFC8" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                </div>
              </div>
            </div>

            
           
          </div>
        </div>

        {/* Charts and activity */}
        <div className="mt-1 grid grid-cols-1  gap-4 lg:grid-cols-2 h-[calc(100vh-var(--header-height)-2rem)]">
          <div>
            {isLoading ? (
              <div className="bg-[#ffffff57] shadow-sm rounded-lg overflow-hidden h-full flex flex-col">
                <div className="px-4 py-5 flex-grow flex flex-col items-center justify-center">
                  {/* Loading animation */}
                  <div className="w-20 h-20 mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Loading text */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Loading Interview Data
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
                    Please wait while we fetch your upcoming interviews and
                    candidate information.
                  </p>

                  {/* Simulated progress bar */}
                  <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className="bg-blue-500 h-2.5 rounded-full w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {nextAppointment && Object.keys(nextAppointment).length > 0 ? (
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="px-4 py-5 flex-grow ">
                      {/* Header section with appointment status */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-700">
                          Upcoming Interview
                        </h2>
                        <span className="flex items-center text-sm font-medium text-green-600">
                          <span className="mr-1">{icons.check}</span>
                          {nextAppointment.status}
                        </span>
                      </div>

                      {/* Main content section */}
                      <div className="mt-4 flex flex-col h-full ">
                        {/* Candidate profile and basic info */}

                        <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 max-h-max">
                          <div className="flex flex-col md:flex-row items-start">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden relative">
                              <img
                                src={nextAppointment?.photoLink}
                                alt="Appointment"
                                className="h-full w-full object-cover rounded-full"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                } // Hide image if it fails
                              />
                              {!nextAppointment?.photoLink && (
                                <span className="absolute text-lg font-medium text-blue-700">
                                  {nextAppointment?.candidateFirstname?.[0]?.toUpperCase()}
                                </span>
                              )}
                            </div>

                            <div className="mt-4 md:mt-0 md:ml-4 flex-grow">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <h3 className="text-lg font-medium text-gray-900 text-center md:text-left">
                                  {nextAppointment.candidateFirstName}{" "}
                                  {nextAppointment.candidateLastName}
                                </h3>
                                <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {nextAppointment.hiringRole}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="flex items-center justify-center md:justify-start text-sm text-gray-600">
                                  <span className="mr-2 text-gray-500">
                                    {icons.calendar}
                                  </span>
                                  {nextAppointment.appDate}
                                </div>
                                <div className="flex items-center justify-center md:justify-start text-sm text-gray-600">
                                  <span className="mr-2 text-gray-500">
                                    {icons.clock}
                                  </span>
                                  {nextAppointment.appTime}
                                </div>
                              </div>

                              <div className="mt-4 flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
                                <a
                                  href={nextAppointment.resumeLink}
                                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                  <span className="mr-2">{icons.file}</span>
                                  View Resume
                                </a>
                                <button
                                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition duration-150 ease-in-out w-full md:w-auto justify-center"
                                  onClick={handelJoinInterview}
                                >
                                  <span className="mr-2">{icons.video}</span>
                                  Join Interview
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Tabbed section for interview details and notes */}
                          <div className="mt-6 border-t border-gray-200 pt-4">
                            <div className="flex space-x-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                              <button
                                className={`px-1 py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                                  activeTab2 === "details"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                                onClick={() => setActiveTab2("details")}
                              >
                                Interview Details
                              </button>
                              <button
                                className={`px-1 py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                                  activeTab2 === "notes"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                                onClick={() => setActiveTab2("notes")}
                              >
                                Job Description
                              </button>
                            </div>

                            {/* Auto height tab content container - removed fixed height */}
                            <div className="py-4 overflow-y-auto">
                              {/* Interview Details tab content */}
                              {activeTab2 === "details" && (
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                      <span className="text-gray-500">
                                        {icons.briefcase}
                                      </span>
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">
                                        Job Requirements
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {nextAppointment?.jobRequirement?.join(
                                          ", "
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                      <span className="text-gray-500">
                                        {icons.star}
                                      </span>
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">
                                        Focus Areas
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {nextAppointment?.focusArea?.join(", ")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Pre-Interview Notes tab content */}
                              {activeTab2 === "notes" && (
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                      <span className="text-gray-500">
                                        {icons.message}
                                      </span>
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">
                                        Job Description
                                      </p>
                                      <p className="text-sm text-gray-600 mt-2">
                                        {nextAppointment?.jobDescription}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#ffffff57] shadow-sm rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="px-4 py-5 flex-grow">
                      {/* Header section */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-700">
                          Upcoming Interviews
                        </h2>
                      </div>

                      {/* Empty state content */}
                      <div className="mt-8 flex flex-col items-center justify-center text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <span className="text-gray-400">
                            {icons.calendar}
                          </span>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Upcoming Interviews
                        </h3>

                        <p className="text-sm text-gray-600 max-w-sm mb-6">
                          You don't have any scheduled interviews at the moment.
                          New interviews will appear here when they are
                          scheduled.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Charts */}
          <div className="space-y-4 flex flex-col ">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-[#ffffff57] w-[420px] p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Pending Receivables
                </h3>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-medium text-gray-800">
                      $24,750.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Interviews</span>
                    <span className="font-medium text-gray-800">43</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Average</span>
                    <span className="font-medium text-gray-800">$575.58</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Oldest</span>
                    <span className="font-medium text-red-600">45 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffffff57] w-[420px] p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Completed Receivables
                </h3>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-medium text-gray-800">
                      $87,250.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Interviews</span>
                    <span className="font-medium text-gray-800">152</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Average</span>
                    <span className="font-medium text-gray-800">$574.01</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Payment</span>
                    <span className="font-medium text-green-600">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewDashboard;
