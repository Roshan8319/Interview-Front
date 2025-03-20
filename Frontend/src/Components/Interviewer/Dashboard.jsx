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
    <div className="bg-gray-50">
      {/* Main content */}
      <main className="max-w-full mx-auto px-4 lg:px-6">
        {/* Stats cards */}
        <div className="w-full px-6 py-2">
          <div className="flex flex-wrap justify-around gap-4">
            {/* Card 1 - Total Interviews with gradient background */}
            <div className="bg-white w-full sm:w-60 h-32 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="text-xs font-medium text-white">
                  Total Interviews
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-white">43</p>
                  <p className="ml-2 text-xs font-medium text-blue-100">
                    +12% this week
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="w-3/4 bg-blue-200 bg-opacity-30 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-xs text-white font-medium">75%</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Avg-Interview/Month */}
            <div className="bg-white w-full sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Avg-Interview/Month
                  </div>
                  <div className="p-1 bg-blue-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
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
                  {[0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.9].map((height, i) => (
                    <div key={i} className="w-full">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${height * 24}px` }}
                      ></div>
                      <div className="bg-gray-100 h-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 - Today's Income */}
            <div className="bg-white w-full sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Today's Income
                  </div>
                  <div className="p-1 bg-green-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-bold text-gray-900">17</p>
                  <p className="ml-2 text-xs text-gray-500">clients</p>
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
            <div className="bg-white w-full sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Total Income
                  </div>
                  <div className="p-1 bg-purple-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900">$95</p>
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
                    <span>4.5%</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Last updated 2h ago</span>
                </div>
              </div>
            </div>

            {/* Card 5 - Products */}
            <div className="bg-white w-full sm:w-60 overflow-hidden shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-500">
                    Products
                  </div>
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900">621</p>
                  <div className="ml-2 flex items-center text-xs font-medium text-red-600">
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span>1%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Last 7 days</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="bg-yellow-500 h-1.5 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and activity */}
        <div className="mt-1 grid grid-cols-1 gap-4 lg:grid-cols-2 h-[calc(100vh-var(--header-height)-2rem)]">
          <div>
            {isLoading ? (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full flex flex-col">
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
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full flex flex-col">
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
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

              <div className="bg-white p-4 rounded-lg shadow-sm">
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
