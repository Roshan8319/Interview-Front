import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Briefcase, FileText } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtEncode from "jwt-encode";

const InterviewDashboard = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [activeTab, setActiveTab] = useState("interviewDetails");
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
      name: interviewerName,
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

  const interview = {
    candidateName: "Aryan Bhardwaj",
    position: "Software Development Engineer I",
    profileImage: "/api/placeholder/40/40",
    date: "04 April 2025",
    time: "12:00pm",
    company: "TechInnovate Solutions",
    interviewMode: "Virtual",
    interviewType: "Technical Round",
    jobRequirements: [
      "Bachelor's degree in Computer Science or related field",
      "0-2 years of software development experience",
      "Proficiency in React and Node.js",
    ],
    focusArea: [
      "Frontend Development",
      "React Ecosystem",
      "Performance Optimization",
    ],
    jobDescription: `We are seeking a motivated Software Development Engineer I to join our dynamic team.
    The ideal candidate will contribute to building scalable web applications.`,
    interviewer: {
      name: "Sarah Thompson",
      role: "Senior Engineering Manager",
      department: "Product Engineering",
    },
    preparationTips: [
      "Review recent React.js concepts",
      "Prepare system design fundamentals",
      "Practice algorithmic problem-solving",
    ],
  };

  const [interviewTab, setInterviewTab] = useState("interviewDetails");

  return (
    <div className="p-4 min-h-[calc(100vh-64px)] bg-[#EBDFD7]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-20 mb-6">
        {/* Total Candidates */}

        <div className="bg-[#F2EAE5] rounded-lg h-[150px] shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">Total Candidates</div>
              <div className="text-2xl font-bold text-gray-800">758</div>
              <div className="text-green-500 text-xs">
                7% increase from last month
              </div>
            </div>
            <div>
              <svg
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="46" height="46" rx="23" fill="#D398E7" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23 15.0205C20.8484 15.0205 19.1042 16.7647 19.1042 18.9163C19.1042 21.068 20.8484 22.8122 23 22.8122C25.1516 22.8122 26.8959 21.068 26.8959 18.9163C26.8959 16.7647 25.1516 15.0205 23 15.0205ZM17.7292 18.9163C17.7292 16.0053 20.089 13.6455 23 13.6455C25.911 13.6455 28.2709 16.0053 28.2709 18.9163C28.2709 21.8273 25.911 24.1872 23 24.1872C20.089 24.1872 17.7292 21.8273 17.7292 18.9163Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.4384 32.6667C14.4384 28.6142 18.414 25.5625 23 25.5625C27.586 25.5625 31.5617 28.6142 31.5617 32.6667C31.5617 33.0464 31.2539 33.3542 30.8742 33.3542C30.4945 33.3542 30.1867 33.0464 30.1867 32.6667C30.1867 29.6241 27.104 26.9375 23 26.9375C18.896 26.9375 15.8134 29.6241 15.8134 32.6667C15.8134 33.0464 15.5056 33.3542 15.1259 33.3542C14.7462 33.3542 14.4384 33.0464 14.4384 32.6667Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mt-1 ml-[-4px]">
            <svg width="100%" height="50" className="mt-2">
              <polyline
                points="0,40 50,30 100,35 150,20 200,25 250,15"
                fill="none"
                stroke="#9ACD32"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[150px] shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">
                Average Interview Per Month
              </div>
              <div className="text-2xl font-bold text-gray-800">758</div>
              <div className="text-green-500 text-xs">
                7% increase from last month
              </div>
            </div>
          </div>
          <div className="mt-1 ml-[-4px]">
            <svg
              width="235"
              height="70"
              viewBox="0 0 235 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3.37256V70H300V16.0195C294.444 11.8038 284.213 2.81783 279.74 0.598903C274.148 -2.17476 272.284 4.97758 262.965 16.0195C255.509 24.853 247.018 19.7001 243.704 16.0195L227.55 9.45144C224.237 12.9481 216.615 18.3764 212.639 12.1167C208.663 5.85708 198.97 3.6791 194.621 3.37256C189.312 6.00172 176.916 12.2119 169.8028 16.0195C160.9114 20.7789 158.0594 15.5435 150.3423 9.45144C142.6252 3.35937 134.237 10.6889 129.0364 12.1167C123.8357 13.5446 118.6351 6.59579 117.4607 4.97758C116.2864 3.35937 109.4081 5.45352 105.8851 4.97758C103.0666 4.59682 102.0305 -0.234751 98.07783 0.0144409L0 3.37256Z"
                fill="url(#paint0_linear_245_4538)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_245_4538"
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="70"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0C274" />
                  <stop offset="1" stop-color="#FDE1B1" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[150px] shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">Today's Income</div>
              <div className="text-2xl font-bold text-gray-800">758</div>
              <div className="text-green-500 text-xs">
                7% increase from last month
              </div>
            </div>
            <div>
              <svg
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="46" height="46" rx="23" fill="#D398E7" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23 15.0205C20.8484 15.0205 19.1042 16.7647 19.1042 18.9163C19.1042 21.068 20.8484 22.8122 23 22.8122C25.1516 22.8122 26.8959 21.068 26.8959 18.9163C26.8959 16.7647 25.1516 15.0205 23 15.0205ZM17.7292 18.9163C17.7292 16.0053 20.089 13.6455 23 13.6455C25.911 13.6455 28.2709 16.0053 28.2709 18.9163C28.2709 21.8273 25.911 24.1872 23 24.1872C20.089 24.1872 17.7292 21.8273 17.7292 18.9163Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.4384 32.6667C14.4384 28.6142 18.414 25.5625 23 25.5625C27.586 25.5625 31.5617 28.6142 31.5617 32.6667C31.5617 33.0464 31.2539 33.3542 30.8742 33.3542C30.4945 33.3542 30.1867 33.0464 30.1867 32.6667C30.1867 29.6241 27.104 26.9375 23 26.9375C18.896 26.9375 15.8134 29.6241 15.8134 32.6667C15.8134 33.0464 15.5056 33.3542 15.1259 33.3542C14.7462 33.3542 14.4384 33.0464 14.4384 32.6667Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mt-1 ml-[4px]">
            <svg
              width="400"
              height="50"
              viewBox="0 0 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="36" width="15" height="38" rx="3" fill="#70A1E5" />
              <rect
                x="30"
                y="19"
                width="15"
                height="55"
                rx="3"
                fill="#70A1E5"
              />
              <rect
                x="60"
                y="47"
                width="15"
                height="27"
                rx="3"
                fill="#70A1E5"
              />
              <rect x="90" width="15" height="74" rx="3" fill="#70A1E5" />
              <rect
                x="120"
                y="19"
                width="15"
                height="55"
                rx="3"
                fill="#70A1E5"
              />
              <rect
                x="150"
                y="44"
                width="15"
                height="30"
                rx="3"
                fill="#70A1E5"
              />
              <rect
                x="180"
                y="31"
                width="15"
                height="43"
                rx="3"
                fill="#70A1E5"
              />
              <path
                d="M1.05 89V82H1.87L5.01 87.29H4.57L7.67 82H8.49L8.5 89H7.54L7.53 83.51H7.76L5 88.15H4.54L1.76 83.51H2.01V89H1.05Z"
                fill="#797979"
              />
              <path
                d="M32.44 89V82.87H30.04V82H35.83V82.87H33.43V89H32.44Z"
                fill="#797979"
              />
              <path
                d="M63.66 89L61.32 82H62.35L64.5 88.46H63.98L66.21 82H67.13L69.31 88.46H68.81L70.99 82H71.94L69.6 89H68.55L66.51 83.01H66.78L64.73 89H63.66Z"
                fill="#797979"
              />
              <path
                d="M86.44 89V82.87H84.04V82H89.83V82.87H87.43V89H86.44ZM92.5023 89.06C91.9689 89.06 91.4956 88.9433 91.0823 88.71C90.6689 88.4767 90.3423 88.1567 90.1023 87.75C89.8623 87.3367 89.7423 86.87 89.7423 86.35C89.7423 85.8233 89.8623 85.3567 90.1023 84.95C90.3423 84.5433 90.6689 84.2267 91.0823 84C91.4956 83.7667 91.9689 83.65 92.5023 83.65C93.0289 83.65 93.4989 83.7667 93.9123 84C94.3323 84.2267 94.6589 84.5433 94.8923 84.95C95.1323 85.35 95.2523 85.8167 95.2523 86.35C95.2523 86.8767 95.1323 87.3433 94.8923 87.75C94.6589 88.1567 94.3323 88.4767 93.9123 88.71C93.4989 88.9433 93.0289 89.06 92.5023 89.06ZM92.5023 88.22C92.8423 88.22 93.1456 88.1433 93.4123 87.99C93.6856 87.8367 93.8989 87.62 94.0523 87.34C94.2056 87.0533 94.2823 86.7233 94.2823 86.35C94.2823 85.97 94.2056 85.6433 94.0523 85.37C93.8989 85.09 93.6856 84.8733 93.4123 84.72C93.1456 84.5667 92.8423 84.49 92.5023 84.49C92.1623 84.49 91.8589 84.5667 91.5923 84.72C91.3256 84.8733 91.1123 85.09 90.9523 85.37C90.7923 85.6433 90.7123 85.97 90.7123 86.35C90.7123 86.7233 90.7923 87.0533 90.9523 87.34C91.1123 87.62 91.3256 87.8367 91.5923 87.99C91.8589 88.1433 92.1623 88.22 92.5023 88.22ZM98.7699 89.06C98.2566 89.06 97.7966 88.9467 97.3899 88.72C96.9899 88.4933 96.6733 88.1767 96.4399 87.77C96.2066 87.3633 96.0899 86.89 96.0899 86.35C96.0899 85.81 96.2066 85.34 96.4399 84.94C96.6733 84.5333 96.9899 84.2167 97.3899 83.99C97.7966 83.7633 98.2566 83.65 98.7699 83.65C99.2166 83.65 99.6199 83.75 99.9799 83.95C100.34 84.15 100.627 84.45 100.84 84.85C101.06 85.25 101.17 85.75 101.17 86.35C101.17 86.95 101.063 87.45 100.85 87.85C100.643 88.25 100.36 88.5533 99.9999 88.76C99.6399 88.96 99.2299 89.06 98.7699 89.06ZM98.8499 88.22C99.1833 88.22 99.4833 88.1433 99.7499 87.99C100.023 87.8367 100.237 87.62 100.39 87.34C100.55 87.0533 100.63 86.7233 100.63 86.35C100.63 85.97 100.55 85.6433 100.39 85.37C100.237 85.09 100.023 84.8733 99.7499 84.72C99.4833 84.5667 99.1833 84.49 98.8499 84.49C98.5099 84.49 98.2066 84.5667 97.9399 84.72C97.6733 84.8733 97.4599 85.09 97.2999 85.37C97.1399 85.6433 97.0599 85.97 97.0599 86.35C97.0599 86.7233 97.1399 87.0533 97.2999 87.34C97.4599 87.62 97.6733 87.8367 97.9399 87.99C98.2066 88.1433 98.5099 88.22 98.8499 88.22ZM100.66 89V87.57L100.72 86.34L100.62 85.11V81.58H101.58V89H100.66ZM106.686 89V87.88L106.636 87.67V85.76C106.636 85.3533 106.516 85.04 106.276 84.82C106.043 84.5933 105.69 84.48 105.216 84.48C104.903 84.48 104.596 84.5333 104.296 84.64C103.996 84.74 103.743 84.8767 103.536 85.05L103.136 84.33C103.41 84.11 103.736 83.9433 104.116 83.83C104.503 83.71 104.906 83.65 105.326 83.65C106.053 83.65 106.613 83.8267 107.006 84.18C107.4 84.5333 107.596 85.0733 107.596 85.8V89H106.686ZM104.946 89.06C104.553 89.06 104.206 88.9933 103.906 88.86C103.613 88.7267 103.386 88.5433 103.226 88.31C103.066 88.07 102.986 87.8 102.986 87.5C102.986 87.2133 103.053 86.9533 103.186 86.72C103.326 86.4867 103.55 86.3 103.856 86.16C104.17 86.02 104.59 85.95 105.116 85.95H106.796V86.64H105.156C104.676 86.64 104.353 86.72 104.186 86.88C104.02 87.04 103.936 87.2333 103.936 87.46C103.936 87.72 104.04 87.93 104.246 88.09C104.453 88.2433 104.74 88.32 105.106 88.32C105.466 88.32 105.78 88.24 106.046 88.08C106.32 87.92 106.516 87.6867 106.636 87.38L106.826 88.04C106.7 88.3533 106.476 88.6033 106.156 88.79C105.836 88.97 105.433 89.06 104.946 89.06ZM109.505 91C109.252 91 109.005 90.9567 108.765 90.87C108.525 90.79 108.319 90.67 108.145 90.51L108.555 89.79C108.689 89.9167 108.835 90.0133 108.995 90.08C109.155 90.1467 109.325 90.18 109.505 90.18C109.739 90.18 109.932 90.12 110.085 90C110.239 89.88 110.382 89.6667 110.515 89.36L110.845 88.63L110.945 88.51L113.025 83.7H113.965L111.395 89.53C111.242 89.9033 111.069 90.1967 110.875 90.41C110.689 90.6233 110.482 90.7733 110.255 90.86C110.029 90.9533 109.779 91 109.505 91ZM110.765 89.17L108.345 83.7H109.345L111.405 88.42L110.765 89.17Z"
                fill="#797979"
              />
              <path
                d="M127.44 89V82.87H125.04V82H130.83V82.87H128.43V89H127.44Z"
                fill="#797979"
              />
              <path
                d="M157.95 85.31H161.56V86.17H157.95V85.31ZM158.05 89H157.05V82H161.99V82.87H158.05V89Z"
                fill="#797979"
              />
              <path
                d="M189.09 89.08C188.557 89.08 188.047 89 187.56 88.84C187.073 88.6733 186.69 88.46 186.41 88.2L186.78 87.42C187.047 87.6533 187.387 87.8467 187.8 88C188.213 88.1533 188.643 88.23 189.09 88.23C189.497 88.23 189.827 88.1833 190.08 88.09C190.333 87.9967 190.52 87.87 190.64 87.71C190.76 87.5433 190.82 87.3567 190.82 87.15C190.82 86.91 190.74 86.7167 190.58 86.57C190.427 86.4233 190.223 86.3067 189.97 86.22C189.723 86.1267 189.45 86.0467 189.15 85.98C188.85 85.9133 188.547 85.8367 188.24 85.75C187.94 85.6567 187.663 85.54 187.41 85.4C187.163 85.26 186.963 85.0733 186.81 84.84C186.657 84.6 186.58 84.2933 186.58 83.92C186.58 83.56 186.673 83.23 186.86 82.93C187.053 82.6233 187.347 82.38 187.74 82.2C188.14 82.0133 188.647 81.92 189.26 81.92C189.667 81.92 190.07 81.9733 190.47 82.08C190.87 82.1867 191.217 82.34 191.51 82.54L191.18 83.34C190.88 83.14 190.563 82.9967 190.23 82.91C189.897 82.8167 189.573 82.77 189.26 82.77C188.867 82.77 188.543 82.82 188.29 82.92C188.037 83.02 187.85 83.1533 187.73 83.32C187.617 83.4867 187.56 83.6733 187.56 83.88C187.56 84.1267 187.637 84.3233 187.79 84.47C187.95 84.6167 188.153 84.7333 188.4 84.82C188.653 84.9067 188.93 84.9867 189.23 85.06C189.53 85.1267 189.83 85.2033 190.13 85.29C190.437 85.3767 190.713 85.49 190.96 85.63C191.213 85.77 191.417 85.9567 191.57 86.19C191.723 86.4233 191.8 86.7233 191.8 87.09C191.8 87.4433 191.703 87.7733 191.51 88.08C191.317 88.38 191.017 88.6233 190.61 88.81C190.21 88.99 189.703 89.08 189.09 89.08Z"
                fill="#797979"
              />
            </svg>
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[150px] shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm">Total Income</div>
              <div className="text-2xl font-bold text-gray-800">758</div>
              <div className="text-green-500 text-xs">
                7% increase from last month
              </div>
            </div>
            <div>
              <svg
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="46" height="46" rx="23" fill="#D398E7" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23 15.0205C20.8484 15.0205 19.1042 16.7647 19.1042 18.9163C19.1042 21.068 20.8484 22.8122 23 22.8122C25.1516 22.8122 26.8959 21.068 26.8959 18.9163C26.8959 16.7647 25.1516 15.0205 23 15.0205ZM17.7292 18.9163C17.7292 16.0053 20.089 13.6455 23 13.6455C25.911 13.6455 28.2709 16.0053 28.2709 18.9163C28.2709 21.8273 25.911 24.1872 23 24.1872C20.089 24.1872 17.7292 21.8273 17.7292 18.9163Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.4384 32.6667C14.4384 28.6142 18.414 25.5625 23 25.5625C27.586 25.5625 31.5617 28.6142 31.5617 32.6667C31.5617 33.0464 31.2539 33.3542 30.8742 33.3542C30.4945 33.3542 30.1867 33.0464 30.1867 32.6667C30.1867 29.6241 27.104 26.9375 23 26.9375C18.896 26.9375 15.8134 29.6241 15.8134 32.6667C15.8134 33.0464 15.5056 33.3542 15.1259 33.3542C14.7462 33.3542 14.4384 33.0464 14.4384 32.6667Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mt-1 ml-[-2px]">
            <svg
              width="230"
              height="70"
              viewBox="0 0 230 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M285.999 4.07527V82H-4.57764e-05V18.8666C4.55615 13.9361 14.7869 3.42648 19.2602 0.831312C24.8519 -2.41265 26.7158 5.95244 36.0353 18.8666C43.4909 29.1979 51.982 23.1713 55.2956 18.8666L71.4494 11.1849C74.763 15.2744 82.3842 21.6231 86.3605 14.3021C90.3368 6.98106 100.029 4.43378 104.378 4.07527C109.687 7.15023 122.083 14.4134 129.197 18.8666C138.088 24.433 140.94 18.3099 148.657 11.1849C156.374 4.05984 164.762 12.6322 169.963 14.3021C175.163 15.972 180.364 7.84502 181.538 5.95243C182.713 4.05984 189.591 6.50908 193.114 5.95243C195.932 5.50712 196.969 -0.143697 200.921 0.147749L285.999 4.07527Z"
                fill="url(#paint0_linear_245_4542)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_245_4542"
                  x1="143.999"
                  y1="0.130859"
                  x2="143.999"
                  y2="82"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#61D474" />
                  <stop offset="1" stop-color="#BDFFC8" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate Details */}

        {Object.keys(interview).length === 0 && (
          <div className="bg-[#F2EAE5] rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center min-h-[calc(100vh-20rem)] h-full">
            <div className="bg-orange-50 rounded-full p-4 mb-4">
              <Calendar className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Interviews Scheduled
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Keep an eye out for upcoming interview opportunities.
            </p>
          </div>
        )}

        {Object.keys(interview).length != 0 && (
          <div className="bg-[#F2EAE5] rounded-lg shadow-md p-6 flex flex-col items-start  text-center min-h-[calc(100vh-20rem)] h-full">
            <div className="w-full">
              <div className=" flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-x-4">
                  <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-red-400">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="User Dp"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-xl font-semibold">
                      {interview.candidateName}
                    </p>
                    <p className="text-sm text-[#797979]">
                      {interview.position}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start text-[#797979] text-[16px] gap-y-1">
                  <div className="flex gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#797979"
                    >
                      <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                    <p>{interview.date}</p>
                  </div>

                  <div className="flex gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#797979"
                    >
                      <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                    </svg>
                    <p>{interview.time}</p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 flex items-center justify-around">
                <button
                  className="flex items-center gap-x-1 justify-center px-4 py-1 bg-white border border-[#E65F2B] rounded-xl 
                relative overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-lg hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md"
                >
                  <span className="absolute inset-0 bg-[#E65F2B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 opacity-10"></span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                  >
                    <path
                      d="M17.75 5.83301H9.50002C9.01379 5.83301 8.54747 6.02616 8.20366 6.36998C7.85984 6.7138 7.66669 7.18011 7.66669 7.66634V22.333C7.66669 22.8192 7.85984 23.2856 8.20366 23.6294C8.54747 23.9732 9.01379 24.1663 9.50002 24.1663H20.5C20.9863 24.1663 21.4526 23.9732 21.7964 23.6294C22.1402 23.2856 22.3334 22.8192 22.3334 22.333V10.4163L17.75 5.83301Z"
                      stroke="#E65F2B"
                      strokeWidth="1.83333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.8334 5.83301V9.49967C16.8334 9.9859 17.0265 10.4522 17.3703 10.796C17.7142 11.1399 18.1805 11.333 18.6667 11.333H22.3334"
                      stroke="#E65F2B"
                      strokeWidth="1.83333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="relative z-10 font-semibold text-[#E65F2B]">
                    View Resume
                  </span>
                </button>

                <button
                  className="flex items-center gap-x-1 justify-center px-4 py-1 border border-white bg-[#E65F2B] rounded-xl 
                   relative overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-lg hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md"
                >
                  <span className="absolute inset-0 bg-[#E65F2B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 opacity-10"></span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
                  >
                    <path
                      d="M8.125 8.125H17.75C19.2735 8.125 20.5 9.3515 20.5 10.875V19.125C20.5 20.6485 19.2735 21.875 17.75 21.875H8.125C6.6015 21.875 5.375 20.6485 5.375 19.125V10.875C5.375 9.3515 6.6015 8.125 8.125 8.125Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 17.75L24.625 20.5V9.5L20.5 12.25"
                      stroke="#FFFFFF"
                      strokeWidth="1.375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="relative z-10 font-semibold text-white">
                    Join Interview
                  </span>
                </button>
              </div>
            </div>
            <hr className="mt-4 w-full bg-[#E65F2B] border-t border-[#E65F2B] rounded-full" />
            {/* Tabs */}
            <div className="flex border-b  mb-4">
              <button
                onClick={() => setActiveTab("interviewDetails")}
                className={`px-4 py-2 ${
                  activeTab === "interviewDetails"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500"
                }`}
              >
                Interview Details
              </button>
              <button
                onClick={() => setActiveTab("jobDescription")}
                className={`px-4 py-2 ${
                  activeTab === "jobDescription"
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500"
                }`}
              >
                Job Description
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 w-full">
              {activeTab === "interviewDetails" && (
                <div className="w-full px-8 flex items-start justify-between">
                  <div>
                    <div className="flex gap-x-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.97798 5.68102C2.71582 4.80381 3.98083 4.375 5.83336 4.375H14.1667C16.0192 4.375 17.2842 4.80381 18.0221 5.68102C18.7528 6.54972 18.8223 7.69097 18.7052 8.7551L18.0799 15.4249C17.9881 16.2817 17.773 17.2209 17.008 17.9198C16.2488 18.6134 15.0724 18.9583 13.3334 18.9583H6.66669C4.92765 18.9583 3.7513 18.6134 2.99201 17.9198C2.22707 17.2209 2.01204 16.2816 1.92025 15.4249L1.91937 15.4167L1.2949 8.75512C1.17779 7.69098 1.24729 6.54972 1.97798 5.68102ZM2.93458 6.48564C2.54147 6.953 2.43082 7.65524 2.5379 8.62293L2.53905 8.63332L3.16357 15.2958C3.24694 16.0702 3.41954 16.6172 3.83512 16.9969C4.25709 17.3824 5.05574 17.7083 6.66669 17.7083H13.3334C14.9443 17.7083 15.743 17.3824 16.1649 16.9969C16.5805 16.6172 16.7531 16.0702 16.8365 15.2958L17.4621 8.62292C17.5691 7.65523 17.4586 6.953 17.0655 6.48564C16.6783 6.02536 15.8725 5.625 14.1667 5.625H5.83336C4.12756 5.625 3.32174 6.02536 2.93458 6.48564Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.3281 3.37564C7.29269 3.6468 7.29169 3.95495 7.29169 4.33366V5.00033C7.29169 5.3455 7.01187 5.62533 6.66669 5.62533C6.32151 5.62533 6.04169 5.3455 6.04169 5.00033L6.04169 4.312C6.04167 3.95906 6.04165 3.57356 6.08861 3.21381C6.13728 2.84106 6.24156 2.44533 6.48587 2.09185C6.99982 1.34823 7.94128 1.04199 9.33335 1.04199H10.6667C12.0588 1.04199 13.0002 1.34823 13.5142 2.09185C13.7585 2.44533 13.8628 2.84106 13.9114 3.21381C13.9584 3.57357 13.9584 3.95906 13.9584 4.31201L13.9584 5.00033C13.9584 5.3455 13.6785 5.62533 13.3334 5.62533C12.9882 5.62533 12.7084 5.3455 12.7084 5.00033V4.33366C12.7084 3.95495 12.7074 3.6468 12.6719 3.37564C12.6373 3.11011 12.5749 2.93136 12.4859 2.80255C12.3332 2.58158 11.9413 2.29199 10.6667 2.29199H9.33335C8.05876 2.29199 7.66689 2.58158 7.51417 2.80255C7.42515 2.93136 7.36276 3.11011 7.3281 3.37564Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.95905 10.6257C8.9584 10.6852 8.95838 10.753 8.95838 10.8333V11.6917C8.95838 11.9263 8.96043 12.0988 8.9808 12.2452C9.00039 12.386 9.03151 12.4545 9.05788 12.4917C9.08728 12.5332 9.23385 12.7083 10 12.7083C10.7697 12.7083 10.9145 12.5315 10.9433 12.4904C10.9698 12.4526 11.0009 12.383 11.0201 12.2406C11.0402 12.0925 11.0417 11.9191 11.0417 11.6833V10.8333C11.0417 10.753 11.0417 10.6852 11.0411 10.6257C10.9816 10.625 10.9138 10.625 10.8334 10.625H9.16672C9.08634 10.625 9.01853 10.625 8.95905 10.6257ZM9.13934 9.375C9.14847 9.37501 9.1576 9.37501 9.16672 9.37501H10.8334C10.8425 9.37501 10.8516 9.37501 10.8608 9.375C11.045 9.37496 11.2318 9.37492 11.3842 9.39185C11.5395 9.40911 11.7975 9.45526 12.0045 9.66223C12.2115 9.86921 12.2576 10.1272 12.2749 10.2826C12.2918 10.4349 12.2918 10.6217 12.2917 10.806C12.2917 10.8151 12.2917 10.8242 12.2917 10.8333V11.6927C12.2917 11.9091 12.2917 12.1652 12.2589 12.4082C12.2247 12.6603 12.1501 12.9464 11.9672 13.2075C11.5772 13.7643 10.8887 13.9583 10 13.9583C9.11624 13.9583 8.42948 13.7668 8.03806 13.2145C7.85401 12.9549 7.77783 12.6697 7.74273 12.4175C7.70842 12.171 7.70838 11.9112 7.70838 11.6917V10.8333C7.70838 10.8242 7.70838 10.8151 7.70838 10.806C7.70834 10.6217 7.70829 10.4349 7.72523 10.2826C7.74248 10.1272 7.78863 9.86921 7.99561 9.66223C8.20258 9.45526 8.4606 9.40911 8.61593 9.39185C8.76831 9.37492 8.95506 9.37496 9.13934 9.375Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.5472 8.79943C18.7502 9.07859 18.6885 9.46947 18.4093 9.6725C16.3958 11.1368 14.0955 12.0078 11.7448 12.3038C11.4023 12.3469 11.0897 12.1043 11.0466 11.7618C11.0035 11.4193 11.2461 11.1067 11.5886 11.0636C13.7379 10.7929 15.8375 9.99724 17.6741 8.66158C17.9532 8.45855 18.3441 8.52027 18.5472 8.79943Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.66759 9.03865C1.86255 8.7538 2.25151 8.68094 2.53636 8.8759C4.3271 10.1016 6.34647 10.8403 8.40289 11.0705C8.74593 11.109 8.99288 11.4182 8.95447 11.7612C8.91606 12.1042 8.60684 12.3512 8.2638 12.3128C6.00356 12.0597 3.78959 11.2484 1.83034 9.90742C1.54549 9.71246 1.47263 9.3235 1.66759 9.03865Z"
                          fill="black"
                        />
                      </svg>

                      <p className="">Focus Area</p>
                    </div>
                    <div className="text-[#797979]">
                      <ul className="pl-10 flex flex-col items-start list-disc">
                        <li>Java</li>
                        <li>Python</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-x-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 1.83301L13.8454 8.00034L20.5902 8.80059L15.6035 13.4114L16.9272 20.0738L11 16.7563L5.07285 20.0747L6.39652 13.4123L1.40985 8.79967L8.1556 7.99942L11 1.83301Z"
                          stroke="black"
                          stroke-width="1.375"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="">Job Requirements</p>
                    </div>
                    <div className="text-[#797979]">
                      <ul className="pl-10 flex flex-col items-start list-disc">
                        <li>Backend</li>
                        <li>API Integration</li>
                        <li>System Design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "jobDescription" && (
                <div className=" flex flex-col items-start justify-start">
                  <div className="flex gap-x-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.97798 5.68102C2.71582 4.80381 3.98083 4.375 5.83336 4.375H14.1667C16.0192 4.375 17.2842 4.80381 18.0221 5.68102C18.7528 6.54972 18.8223 7.69097 18.7052 8.7551L18.0799 15.4249C17.9881 16.2817 17.773 17.2209 17.008 17.9198C16.2488 18.6134 15.0724 18.9583 13.3334 18.9583H6.66669C4.92765 18.9583 3.7513 18.6134 2.99201 17.9198C2.22707 17.2209 2.01204 16.2816 1.92025 15.4249L1.91937 15.4167L1.2949 8.75512C1.17779 7.69098 1.24729 6.54972 1.97798 5.68102ZM2.93458 6.48564C2.54147 6.953 2.43082 7.65524 2.5379 8.62293L2.53905 8.63332L3.16357 15.2958C3.24694 16.0702 3.41954 16.6172 3.83512 16.9969C4.25709 17.3824 5.05574 17.7083 6.66669 17.7083H13.3334C14.9443 17.7083 15.743 17.3824 16.1649 16.9969C16.5805 16.6172 16.7531 16.0702 16.8365 15.2958L17.4621 8.62292C17.5691 7.65523 17.4586 6.953 17.0655 6.48564C16.6783 6.02536 15.8725 5.625 14.1667 5.625H5.83336C4.12756 5.625 3.32174 6.02536 2.93458 6.48564Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.3281 3.37564C7.29269 3.6468 7.29169 3.95495 7.29169 4.33366V5.00033C7.29169 5.3455 7.01187 5.62533 6.66669 5.62533C6.32151 5.62533 6.04169 5.3455 6.04169 5.00033L6.04169 4.312C6.04167 3.95906 6.04165 3.57356 6.08861 3.21381C6.13728 2.84106 6.24156 2.44533 6.48587 2.09185C6.99982 1.34823 7.94128 1.04199 9.33335 1.04199H10.6667C12.0588 1.04199 13.0002 1.34823 13.5142 2.09185C13.7585 2.44533 13.8628 2.84106 13.9114 3.21381C13.9584 3.57357 13.9584 3.95906 13.9584 4.31201L13.9584 5.00033C13.9584 5.3455 13.6785 5.62533 13.3334 5.62533C12.9882 5.62533 12.7084 5.3455 12.7084 5.00033V4.33366C12.7084 3.95495 12.7074 3.6468 12.6719 3.37564C12.6373 3.11011 12.5749 2.93136 12.4859 2.80255C12.3332 2.58158 11.9413 2.29199 10.6667 2.29199H9.33335C8.05876 2.29199 7.66689 2.58158 7.51417 2.80255C7.42515 2.93136 7.36276 3.11011 7.3281 3.37564Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.95905 10.6257C8.9584 10.6852 8.95838 10.753 8.95838 10.8333V11.6917C8.95838 11.9263 8.96043 12.0988 8.9808 12.2452C9.00039 12.386 9.03151 12.4545 9.05788 12.4917C9.08728 12.5332 9.23385 12.7083 10 12.7083C10.7697 12.7083 10.9145 12.5315 10.9433 12.4904C10.9698 12.4526 11.0009 12.383 11.0201 12.2406C11.0402 12.0925 11.0417 11.9191 11.0417 11.6833V10.8333C11.0417 10.753 11.0417 10.6852 11.0411 10.6257C10.9816 10.625 10.9138 10.625 10.8334 10.625H9.16672C9.08634 10.625 9.01853 10.625 8.95905 10.6257ZM9.13934 9.375C9.14847 9.37501 9.1576 9.37501 9.16672 9.37501H10.8334C10.8425 9.37501 10.8516 9.37501 10.8608 9.375C11.045 9.37496 11.2318 9.37492 11.3842 9.39185C11.5395 9.40911 11.7975 9.45526 12.0045 9.66223C12.2115 9.86921 12.2576 10.1272 12.2749 10.2826C12.2918 10.4349 12.2918 10.6217 12.2917 10.806C12.2917 10.8151 12.2917 10.8242 12.2917 10.8333V11.6927C12.2917 11.9091 12.2917 12.1652 12.2589 12.4082C12.2247 12.6603 12.1501 12.9464 11.9672 13.2075C11.5772 13.7643 10.8887 13.9583 10 13.9583C9.11624 13.9583 8.42948 13.7668 8.03806 13.2145C7.85401 12.9549 7.77783 12.6697 7.74273 12.4175C7.70842 12.171 7.70838 11.9112 7.70838 11.6917V10.8333C7.70838 10.8242 7.70838 10.8151 7.70838 10.806C7.70834 10.6217 7.70829 10.4349 7.72523 10.2826C7.74248 10.1272 7.78863 9.86921 7.99561 9.66223C8.20258 9.45526 8.4606 9.40911 8.61593 9.39185C8.76831 9.37492 8.95506 9.37496 9.13934 9.375Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.5472 8.79943C18.7502 9.07859 18.6885 9.46947 18.4093 9.6725C16.3958 11.1368 14.0955 12.0078 11.7448 12.3038C11.4023 12.3469 11.0897 12.1043 11.0466 11.7618C11.0035 11.4193 11.2461 11.1067 11.5886 11.0636C13.7379 10.7929 15.8375 9.99724 17.6741 8.66158C17.9532 8.45855 18.3441 8.52027 18.5472 8.79943Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.66759 9.03865C1.86255 8.7538 2.25151 8.68094 2.53636 8.8759C4.3271 10.1016 6.34647 10.8403 8.40289 11.0705C8.74593 11.109 8.99288 11.4182 8.95447 11.7612C8.91606 12.1042 8.60684 12.3512 8.2638 12.3128C6.00356 12.0597 3.78959 11.2484 1.83034 9.90742C1.54549 9.71246 1.47263 9.3235 1.66759 9.03865Z"
                        fill="black"
                      />
                    </svg>

                    <p>Job Description</p>
                  </div>
                  <div className="pl-6 pt-2 text-left text-[#797979]">
                    <p>{interview.jobDescription}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receivables */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 text-sm">Pending Receivables</div>
              <div className="text-xl font-bold text-gray-800">$24,750</div>
              <div className="text-gray-500 text-xs">43 Interviews</div>
              <div className="text-gray-500 text-xs">Avg: $575.58</div>
              <div className="text-gray-500 text-xs">Oldest: 45 days</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Completed Receivables</div>
              <div className="text-xl font-bold text-gray-800">$87,750</div>
              <div className="text-gray-500 text-xs">152 Interviews</div>
              <div className="text-gray-500 text-xs">Avg: $435.58</div>
              <div className="text-gray-500 text-xs">Last Payment: Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDashboard;
