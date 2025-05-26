import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Briefcase, FileText } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtEncode from "jwt-encode";
import Chart from "react-apexcharts";

const InterviewDashboard = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [activeTab, setActiveTab] = useState("interviewDetails");
  const [activeTab2, setActiveTab2] = useState("details");
  const [nextAppointment, setNextAppointment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [interviewerName, setInterviewerName] = useState("");


  const [splineData1, setSplineData1] = useState({
    series: [
      {
        data: [20, 41, 35, 51, 49, 62, 48, 34, 26], // Example data
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 200,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#BF821A"], // Line color
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth", // Makes it a spline graph
        width: 1,
      },
      fill: {
        type: "gradient", // Add gradient fill
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#F0C274", "#FDE1B1"], // End color
          inverseColors: false,
          opacityFrom: 1, // Starting opacity
          opacityTo: 0.2, // Ending opacity
          stops: [0, 98, 100],
        },
      },
      grid: {
        show: false, // Hide grid lines
      },
      xaxis: {
        show: false, // Hide x-axis
        labels: {
          show: false, // Hide x-axis labels
        },
        axisBorder: {
          show: false, // Hide x-axis border
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        show: false, // Hide y-axis
        labels: {
          show: false, // Hide y-axis labels
        },
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  });

  const [splineData2, setSplineData2] = useState({
    series: [
      {
        data: [20, 41, 35, 51, 44, 62, 78], // Example data
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 200,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#007D15"], // Line color
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth", // Makes it a spline graph
        width: 1,
      },
      fill: {
        type: "gradient", // Add gradient fill
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#61D474", "#BDFFC8"], // End color
          inverseColors: false,
          opacityFrom: 1, // Starting opacity
          opacityTo: 0.2, // Ending opacity
          stops: [0, 95, 100],
        },
      },
      grid: {
        show: false, // Hide grid lines
      },
      xaxis: {
        show: false, // Hide x-axis
        labels: {
          show: false, // Hide x-axis labels
        },
        axisBorder: {
          show: false, // Hide x-axis border
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        show: false, // Hide y-axis
        labels: {
          show: false, // Hide y-axis labels
        },
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  });

  const [barData, setBarData] = useState({
    series: [
      {
        data: [25, 33, 56, 90, 69, 44, 38], // Example data
      },
    ],
    options: {
      chart: {
        type: "bar", // Bar graph
        height: 200,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide toolbar
        },
      },
      colors: ["#70A1E5"], // Bar color
      dataLabels: {
        enabled: false, // Disable data labels
      },
      plotOptions: {
        bar: {
          borderRadius: 4, // Rounded corners for bars
          horizontal: false, // Vertical bars
          columnWidth: "60%", // Width of bars
        },
      },
      fill: {
        colors: ["#70A1E5"], // Fill color for bars
        opacity: 0.9, // Bar opacity
      },
      grid: {
        show: false, // Hide grid lines
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Today", "Fri", "Sat", "Sun"], // Example categories
        labels: {
          show: true, // Show x-axis labels
          offsetY: -5,
        },
        axisBorder: {
          show: false, // Hide x-axis border
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        show: false, // Show y-axis
        labels: {
          show: false, // Show y-axis labels
        },
      },
      tooltip: {
        enabled: false, // Enable tooltips
      },
      states: {
        hover: {
          filter: {
            type: "none", // Disable hover effect
          },
        },
      },
    },
  });

  const [lineData, setLineData] = useState({
    series: [
      {
        data: [15, 28, 18, 30, 25, 40, 35], // Example data
      },
    ],
    options: {
      chart: {
        type: "line", // Line graph
        height: 200,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Hide toolbar
        },
      },
      colors: ["#C273DD"], // Line color
      dataLabels: {
        enabled: false, // Disable data labels
      },
      stroke: {
        curve: "smooth", // Smooth line
        width: 2, // Line thickness
      },
      grid: {
        show: false, // Hide grid lines
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Example categories
        labels: {
          show: false, // Show x-axis labels
        },
        axisBorder: {
          show: false, // Hide x-axis border
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        show: false, // Show y-axis
        labels: {
          show: false, // Show y-axis labels
        },
      },
      tooltip: {
        enabled: false, // Enable tooltips
      },
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/interviewer/my-appointments`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response);
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

  const handleViewResume = () => {
    if (nextAppointment?.candidateResume) {
      window.open(nextAppointment.candidateResume, '_blank');
    } else {
      alert('Resume not available');
    }
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

  const [interviewTab, setInterviewTab] = useState("interviewDetails");

  return (
    <div className="p-3 md:p-4 md:px-6 min-h-[calc(100vh-64px)] bg-[#EBDFD7]">
      <div className="flex justify-between items-center mb-4 md:mb-8 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-x-5 mb-6">
        {/* Total Candidates */}
        <div className="bg-[#F2EAE5] rounded-lg h-[220px] md:h-[200px] shadow-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-500 text-sm">Total Candidates</div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2">
                758
                <span className="text-gray-900 text-xs font-normal flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06043 3.49396C5.06043 3.25233 5.25631 3.05646 5.49793 3.05646L10.5054 3.05646C10.6215 3.05646 10.7327 3.10255 10.8148 3.1846C10.8968 3.26665 10.9429 3.37793 10.9429 3.49396L10.9429 8.50145C10.9429 8.74308 10.747 8.93895 10.5054 8.93895C10.2638 8.93895 10.0679 8.74308 10.0679 8.50145L10.0679 3.93146L5.49793 3.93146C5.25631 3.93146 5.06043 3.73558 5.06043 3.49396Z" fill="#1A932E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.18387 10.8155C3.01302 10.6446 3.01302 10.3676 3.18387 10.1967L10.1259 3.25472C10.2967 3.08387 10.5738 3.08387 10.7446 3.25472C10.9155 3.42558 10.9155 3.70259 10.7446 3.87344L3.80259 10.8155C3.63173 10.9863 3.35473 10.9863 3.18387 10.8155Z" fill="#1A932E" />
                  </svg>
                  10% increase from last month
                </span>
              </div>
            </div>
            <div>
              <svg
                width="32"
                height="32"
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

          <div className="mt-[-2%] md:mt-[-8%] ml-[-2%] w-full">
            <Chart
              options={lineData.options}
              series={lineData.series}
              type="line"
              height={150}
              width="100%"
            />
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[220px] md:h-[200px] shadow-md p-4">
          <div className="flex justify-between items-start ">
            <div>
              <div className="text-gray-500 text-sm">Average Interview Per Month</div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2">
                56
                <span className="text-gray-900 text-xs font-normal flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06043 3.49396C5.06043 3.25233 5.25631 3.05646 5.49793 3.05646L10.5054 3.05646C10.6215 3.05646 10.7327 3.10255 10.8148 3.1846C10.8968 3.26665 10.9429 3.37793 10.9429 3.49396L10.9429 8.50145C10.9429 8.74308 10.747 8.93895 10.5054 8.93895C10.2638 8.93895 10.0679 8.74308 10.0679 8.50145L10.0679 3.93146L5.49793 3.93146C5.25631 3.93146 5.06043 3.73558 5.06043 3.49396Z" fill="#1A932E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.18387 10.8155C3.01302 10.6446 3.01302 10.3676 3.18387 10.1967L10.1259 3.25472C10.2967 3.08387 10.5738 3.08387 10.7446 3.25472C10.9155 3.42558 10.9155 3.70259 10.7446 3.87344L3.80259 10.8155C3.63173 10.9863 3.35473 10.9863 3.18387 10.8155Z" fill="#1A932E" />
                  </svg>
                  2% increase from last month
                </span>
              </div>
            </div>
            <div className="">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="#F0C274" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.17571 11.2491C7.98734 10.2842 9.37885 9.8125 11.4166 9.8125H20.5833C22.6211 9.8125 24.0126 10.2842 24.8242 11.2491C25.628 12.2047 25.7044 13.4601 25.5756 14.6306L24.8878 21.9674C24.7868 22.9098 24.5502 23.943 23.7088 24.7117C22.8736 25.4748 21.5796 25.8542 19.6666 25.8542H12.3333C10.4204 25.8542 9.12637 25.4748 8.29116 24.7117C7.44972 23.943 7.21319 22.9098 7.11221 21.9674L7.11124 21.9583L6.42433 14.6306C6.29551 13.4601 6.37196 12.2047 7.17571 11.2491ZM8.22797 12.1342C7.79556 12.6483 7.67384 13.4208 7.79163 14.4852L7.7929 14.4967L8.47987 21.8254C8.57158 22.6773 8.76143 23.279 9.21857 23.6966C9.68273 24.1206 10.5612 24.4792 12.3333 24.4792H19.6666C21.4387 24.4792 22.3172 24.1206 22.7814 23.6966C23.2385 23.279 23.4284 22.6773 23.5201 21.8254L24.2082 14.4852C24.326 13.4208 24.2044 12.6483 23.772 12.1342C23.3461 11.6279 22.4597 11.1875 20.5833 11.1875H11.4166C9.54025 11.1875 8.65385 11.6279 8.22797 12.1342Z"
                  fill="#F1F1F1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0608 8.71252C13.0219 9.01079 13.0208 9.34976 13.0208 9.76634V10.4997C13.0208 10.8794 12.7129 11.1872 12.3333 11.1872C11.9536 11.1872 11.6458 10.8794 11.6458 10.4997L11.6458 9.74252C11.6457 9.35428 11.6457 8.93024 11.6974 8.53451C11.7509 8.12449 11.8656 7.68918 12.1344 7.30035C12.6997 6.48237 13.7353 6.14551 15.2666 6.14551H16.7333C18.2645 6.14551 19.3001 6.48237 19.8655 7.30035C20.1342 7.68918 20.2489 8.12449 20.3025 8.53451C20.3541 8.93024 20.3541 9.35429 20.3541 9.74252L20.3541 10.4997C20.3541 10.8794 20.0463 11.1872 19.6666 11.1872C19.2869 11.1872 18.9791 10.8794 18.9791 10.4997V9.76634C18.9791 9.34976 18.978 9.01079 18.939 8.71252C18.9009 8.42044 18.8323 8.22381 18.7344 8.08212C18.5664 7.83906 18.1353 7.52051 16.7333 7.52051H15.2666C13.8645 7.52051 13.4335 7.83906 13.2655 8.08212C13.1676 8.22381 13.0989 8.42044 13.0608 8.71252Z"
                  fill="#F1F1F1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8549 16.6882C14.8542 16.7537 14.8541 16.8283 14.8541 16.9167V17.8608C14.8541 18.1189 14.8564 18.3087 14.8788 18.4698C14.9003 18.6246 14.9346 18.7 14.9636 18.7409C14.9959 18.7865 15.1572 18.9792 16 18.9792C16.8466 18.9792 17.0059 18.7847 17.0376 18.7395C17.0667 18.6978 17.1009 18.6213 17.1221 18.4646C17.1441 18.3017 17.1458 18.111 17.1458 17.8517V16.9167C17.1458 16.8283 17.1458 16.7537 17.1451 16.6882C17.0796 16.6875 17.005 16.6875 16.9166 16.6875H15.0833C14.9949 16.6875 14.9203 16.6875 14.8549 16.6882ZM15.0532 15.3125C15.0632 15.3125 15.0733 15.3125 15.0833 15.3125H16.9166C16.9267 15.3125 16.9367 15.3125 16.9467 15.3125C17.1495 15.3125 17.3549 15.3124 17.5225 15.331C17.6934 15.35 17.9772 15.4008 18.2049 15.6285C18.4325 15.8561 18.4833 16.1399 18.5023 16.3108C18.5209 16.4784 18.5209 16.6839 18.5208 16.8866C18.5208 16.8966 18.5208 16.9066 18.5208 16.9167V17.862C18.5208 18.1 18.5208 18.3817 18.4847 18.649C18.4471 18.9263 18.365 19.241 18.1638 19.5283C17.7349 20.1407 16.9775 20.3542 16 20.3542C15.0278 20.3542 14.2723 20.1435 13.8418 19.536C13.6393 19.2504 13.5555 18.9367 13.5169 18.6593C13.4792 18.3881 13.4791 18.1024 13.4791 17.8608V16.9167C13.4791 16.9066 13.4791 16.8966 13.4791 16.8866C13.4791 16.6839 13.479 16.4784 13.4977 16.3108C13.5166 16.1399 13.5674 15.8561 13.7951 15.6285C14.0228 15.4008 14.3066 15.35 14.4774 15.331C14.6451 15.3124 14.8505 15.3125 15.0532 15.3125Z"
                  fill="#F1F1F1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.4018 14.6787C25.6252 14.9858 25.5573 15.4157 25.2502 15.6391C23.0354 17.2498 20.505 18.2079 17.9192 18.5335C17.5425 18.5809 17.1987 18.314 17.1512 17.9373C17.1038 17.5606 17.3707 17.2167 17.7474 17.1693C20.1117 16.8716 22.4213 15.9963 24.4415 14.5271C24.7485 14.3037 25.1785 14.3716 25.4018 14.6787Z"
                  fill="#F1F1F1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.83434 14.9418C7.0488 14.6285 7.47666 14.5483 7.78999 14.7628C9.75981 16.111 11.9811 16.9236 14.2432 17.1769C14.6205 17.2192 14.8922 17.5593 14.8499 17.9366C14.8077 18.314 14.4675 18.5856 14.0902 18.5434C11.6039 18.265 9.16855 17.3726 7.01337 15.8975C6.70003 15.683 6.61988 15.2552 6.83434 14.9418Z"
                  fill="#F1F1F1"
                />
              </svg>
            </div>
          </div>

          <div className="mt-[-6%] md:mt-[-16%] ml-[-1%] w-full">
            <Chart
              options={splineData1.options}
              series={splineData1.series}
              type="area"
              height={150}
              width="100%"
            />
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[220px] md:h-[200px] shadow-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-500 text-sm">Today's Income</div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2">
                ₹2K
                <span className="text-gray-900 text-xs font-normal flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06043 3.49396C5.06043 3.25233 5.25631 3.05646 5.49793 3.05646L10.5054 3.05646C10.6215 3.05646 10.7327 3.10255 10.8148 3.1846C10.8968 3.26665 10.9429 3.37793 10.9429 3.49396L10.9429 8.50145C10.9429 8.74308 10.747 8.93895 10.5054 8.93895C10.2638 8.93895 10.0679 8.74308 10.0679 8.50145L10.0679 3.93146L5.49793 3.93146C5.25631 3.93146 5.06043 3.73558 5.06043 3.49396Z" fill="#1A932E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.18387 10.8155C3.01302 10.6446 3.01302 10.3676 3.18387 10.1967L10.1259 3.25472C10.2967 3.08387 10.5738 3.08387 10.7446 3.25472C10.9155 3.42558 10.9155 3.70259 10.7446 3.87344L3.80259 10.8155C3.63173 10.9863 3.35473 10.9863 3.18387 10.8155Z" fill="#1A932E" />
                  </svg>
                  4% increase from last day
                </span>
              </div>
            </div>
            <div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="#70A1E5" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.2212 16.6387C19.064 16.1941 18.7729 15.8092 18.3879 15.537C18.0029 15.2648 17.543 15.1187 17.0714 15.1187V14.5488H15.9316V15.1187C15.327 15.1187 14.7472 15.3589 14.3197 15.7864C13.8922 16.2139 13.652 16.7938 13.652 17.3984C13.652 18.003 13.8922 18.5828 14.3197 19.0103C14.7472 19.4379 15.327 19.678 15.9316 19.678V21.9577C15.4358 21.9577 15.0135 21.6414 14.8562 21.198C14.8329 21.1254 14.7952 21.0583 14.7455 21.0006C14.6958 20.9428 14.6349 20.8957 14.5667 20.8618C14.4984 20.828 14.424 20.8082 14.3479 20.8036C14.2719 20.7991 14.1957 20.8098 14.1238 20.8352C14.052 20.8605 13.9859 20.9001 13.9296 20.9514C13.8733 21.0028 13.8279 21.0649 13.796 21.1341C13.7641 21.2033 13.7465 21.2782 13.744 21.3544C13.7416 21.4306 13.7545 21.5064 13.7819 21.5775C13.9391 22.0221 14.2302 22.407 14.6152 22.6792C15.0002 22.9514 15.4601 23.0976 15.9316 23.0975V23.6674H17.0714V23.0975C17.676 23.0975 18.2559 22.8573 18.6834 22.4298C19.1109 22.0023 19.3511 21.4225 19.3511 20.8179C19.3511 20.2133 19.1109 19.6334 18.6834 19.2059C18.2559 18.7784 17.676 18.5382 17.0714 18.5382V16.2586C17.3072 16.2585 17.5371 16.3315 17.7296 16.4676C17.9221 16.6036 18.0677 16.796 18.1463 17.0183C18.1966 17.1608 18.3015 17.2775 18.4379 17.3427C18.5054 17.375 18.5787 17.3936 18.6534 17.3976C18.7281 17.4016 18.8029 17.3908 18.8735 17.3659C18.9441 17.341 19.0091 17.3024 19.0647 17.2524C19.1204 17.2023 19.1657 17.1418 19.1979 17.0743C19.2302 17.0068 19.2489 16.9335 19.2529 16.8588C19.2569 16.7841 19.2461 16.7093 19.2212 16.6387ZM15.9316 16.2586C15.6293 16.2586 15.3394 16.3787 15.1256 16.5924C14.9119 16.8062 14.7918 17.0961 14.7918 17.3984C14.7918 17.7007 14.9119 17.9906 15.1256 18.2044C15.3394 18.4181 15.6293 18.5382 15.9316 18.5382V16.2586ZM17.0714 21.9577C17.3737 21.9577 17.6637 21.8376 17.8774 21.6238C18.0912 21.4101 18.2113 21.1202 18.2113 20.8179C18.2113 20.5156 18.0912 20.2256 17.8774 20.0119C17.6637 19.7981 17.3737 19.678 17.0714 19.678V21.9577Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.3197 7.49374C11.7182 6.80927 14.0127 6 16.5237 6C18.9823 6 21.2164 6.77565 22.6075 7.45099L22.6862 7.48918C23.1056 7.69663 23.4441 7.89268 23.6824 8.05168L21.5771 11.1292C26.4305 16.0909 30.1794 26.5151 16.5237 26.5151C2.86806 26.5151 6.51606 16.2801 11.4116 11.1292L9.32003 8.05168C9.48131 7.94625 9.68591 7.82372 9.92983 7.69378C10.0507 7.62881 10.1806 7.56175 10.3197 7.49374ZM20.2241 11.0887L21.9094 8.62501C20.3421 8.73785 18.4774 9.10602 16.6821 9.62578C15.3998 9.99622 13.9751 9.9398 12.6557 9.69645C12.3232 9.63489 11.993 9.56151 11.6658 9.47646L12.76 11.0876C15.1052 11.9225 17.8784 11.9225 20.2241 11.0887ZM12.1018 12.0582C14.8459 13.1182 18.144 13.1182 20.8881 12.057C22.0332 13.2647 22.9914 14.6369 23.7308 16.1279C24.5013 17.6997 24.9208 19.271 24.8524 20.6251C24.7863 21.9319 24.2722 23.0483 23.0982 23.8781C21.8746 24.7427 19.8167 25.3753 16.5231 25.3753C13.2262 25.3753 11.1586 24.7535 9.92356 23.8986C8.741 23.0797 8.22181 21.978 8.14829 20.6889C8.07135 19.3496 8.48169 17.7863 9.24936 16.2037C9.98169 14.6946 11.0035 13.2419 12.1018 12.0582ZM11.4464 8.23177C11.9023 8.36741 12.3787 8.48538 12.862 8.57486C14.0873 8.80055 15.3161 8.8336 16.3647 8.52984C17.5867 8.1737 18.8296 7.89372 20.0862 7.6915C19.0376 7.37577 17.8111 7.13982 16.5231 7.13982C14.5598 7.13982 12.7287 7.68751 11.4464 8.23177Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mt-[-8%] md:mt-[-10%] ml-[-1%] w-full">
            <Chart
              options={barData.options}
              series={barData.series}
              type="bar"
              height={170}
              width="100%"
            />
          </div>
        </div>

        <div className="bg-[#F2EAE5] rounded-lg h-[220px] md:h-[200px] shadow-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-500 text-sm">Total Income</div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2">
                ₹45K
                <span className="text-gray-900 text-xs font-normal flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.06043 3.49396C5.06043 3.25233 5.25631 3.05646 5.49793 3.05646L10.5054 3.05646C10.6215 3.05646 10.7327 3.10255 10.8148 3.1846C10.8968 3.26665 10.9429 3.37793 10.9429 3.49396L10.9429 8.50145C10.9429 8.74308 10.747 8.93895 10.5054 8.93895C10.2638 8.93895 10.0679 8.74308 10.0679 8.50145L10.0679 3.93146L5.49793 3.93146C5.25631 3.93146 5.06043 3.73558 5.06043 3.49396Z" fill="#1A932E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.18387 10.8155C3.01302 10.6446 3.01302 10.3676 3.18387 10.1967L10.1259 3.25472C10.2967 3.08387 10.5738 3.08387 10.7446 3.25472C10.9155 3.42558 10.9155 3.70259 10.7446 3.87344L3.80259 10.8155C3.63173 10.9863 3.35473 10.9863 3.18387 10.8155Z" fill="#1A932E" />
                  </svg>
                  15% increase from last month
                </span>
              </div>
            </div>
            <div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="#64BE73" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.2212 16.6387C19.064 16.1941 18.7729 15.8092 18.3879 15.537C18.0029 15.2648 17.543 15.1187 17.0714 15.1187V14.5488H15.9316V15.1187C15.327 15.1187 14.7472 15.3589 14.3197 15.7864C13.8922 16.2139 13.652 16.7938 13.652 17.3984C13.652 18.003 13.8922 18.5828 14.3197 19.0103C14.7472 19.4379 15.327 19.678 15.9316 19.678V21.9577C15.4358 21.9577 15.0135 21.6414 14.8562 21.198C14.8329 21.1254 14.7952 21.0583 14.7455 21.0006C14.6958 20.9428 14.6349 20.8957 14.5667 20.8618C14.4984 20.828 14.424 20.8082 14.3479 20.8036C14.2719 20.7991 14.1957 20.8098 14.1238 20.8352C14.052 20.8605 13.9859 20.9001 13.9296 20.9514C13.8733 21.0028 13.8279 21.0649 13.796 21.1341C13.7641 21.2033 13.7465 21.2782 13.744 21.3544C13.7416 21.4306 13.7545 21.5064 13.7819 21.5775C13.9391 22.0221 14.2302 22.407 14.6152 22.6792C15.0002 22.9514 15.4601 23.0976 15.9316 23.0975V23.6674H17.0714V23.0975C17.676 23.0975 18.2559 22.8573 18.6834 22.4298C19.1109 22.0023 19.3511 21.4225 19.3511 20.8179C19.3511 20.2133 19.1109 19.6334 18.6834 19.2059C18.2559 18.7784 17.676 18.5382 17.0714 18.5382V16.2586C17.3072 16.2585 17.5371 16.3315 17.7296 16.4676C17.9221 16.6036 18.0677 16.796 18.1463 17.0183C18.1966 17.1608 18.3015 17.2775 18.4379 17.3427C18.5054 17.375 18.5787 17.3936 18.6534 17.3976C18.7281 17.4016 18.8029 17.3908 18.8735 17.3659C18.9441 17.341 19.0091 17.3024 19.0647 17.2524C19.1204 17.2023 19.1657 17.1418 19.1979 17.0743C19.2302 17.0068 19.2489 16.9335 19.2529 16.8588C19.2569 16.7841 19.2461 16.7093 19.2212 16.6387ZM15.9316 16.2586C15.6293 16.2586 15.3394 16.3787 15.1256 16.5924C14.9119 16.8062 14.7918 17.0961 14.7918 17.3984C14.7918 17.7007 14.9119 17.9906 15.1256 18.2044C15.3394 18.4181 15.6293 18.5382 15.9316 18.5382V16.2586ZM17.0714 21.9577C17.3737 21.9577 17.6637 21.8376 17.8774 21.6238C18.0912 21.4101 18.2113 21.1202 18.2113 20.8179C18.2113 20.5156 18.0912 20.2256 17.8774 20.0119C17.6637 19.7981 17.3737 19.678 17.0714 19.678V21.9577Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.3197 7.49374C11.7182 6.80927 14.0127 6 16.5237 6C18.9823 6 21.2164 6.77565 22.6075 7.45099L22.6862 7.48918C23.1056 7.69663 23.4441 7.89268 23.6824 8.05168L21.5771 11.1292C26.4305 16.0909 30.1794 26.5151 16.5237 26.5151C2.86806 26.5151 6.51606 16.2801 11.4116 11.1292L9.32003 8.05168C9.48131 7.94625 9.68591 7.82372 9.92983 7.69378C10.0507 7.62881 10.1806 7.56175 10.3197 7.49374ZM20.2241 11.0887L21.9094 8.62501C20.3421 8.73785 18.4774 9.10602 16.6821 9.62578C15.3998 9.99622 13.9751 9.9398 12.6557 9.69645C12.3232 9.63489 11.993 9.56151 11.6658 9.47646L12.76 11.0876C15.1052 11.9225 17.8784 11.9225 20.2241 11.0887ZM12.1018 12.0582C14.8459 13.1182 18.144 13.1182 20.8881 12.057C22.0332 13.2647 22.9914 14.6369 23.7308 16.1279C24.5013 17.6997 24.9208 19.271 24.8524 20.6251C24.7863 21.9319 24.2722 23.0483 23.0982 23.8781C21.8746 24.7427 19.8167 25.3753 16.5231 25.3753C13.2262 25.3753 11.1586 24.7535 9.92356 23.8986C8.741 23.0797 8.22181 21.978 8.14829 20.6889C8.07135 19.3496 8.48169 17.7863 9.24936 16.2037C9.98169 14.6946 11.0035 13.2419 12.1018 12.0582ZM11.4464 8.23177C11.9023 8.36741 12.3787 8.48538 12.862 8.57486C14.0873 8.80055 15.3161 8.8336 16.3647 8.52984C17.5867 8.1737 18.8296 7.89372 20.0862 7.6915C19.0376 7.37577 17.8111 7.13982 16.5231 7.13982C14.5598 7.13982 12.7287 7.68751 11.4464 8.23177Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mt-[-6%] md:mt-[-14%] ml-[-1%] w-full">
            <Chart
              options={splineData2.options}
              series={splineData2.series}
              type="area"
              height={150}
              width="100%"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-x-5 mb-5">
        {/* Candidate Details */}
        {Object.keys(nextAppointment).length === 0 && (
          <div className="bg-[#F2EAE5] rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center min-h-[calc(100vh-100rem)] h-full">
            <div className="bg-orange-50 rounded-full p-4 mb-4">
              <Calendar className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Interviews Scheduled
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Keep an eye out for upcoming interview.
            </p>
          </div>
        )}

        {Object.keys(nextAppointment).length != 0 && (
          <div className="bg-[#F2EAE5] rounded-lg shadow-md p-4 md:p-6 flex flex-col items-start text-center min-h-[calc(100vh-100rem)] h-full">
            <div className="w-full">
              <div className="flex flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
                <div className="flex items-center justify-center gap-x-4">
                  <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden border border-red-400">
                    <img
                      src={
                        nextAppointment?.candidatePhoto ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="User Dp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start mt-[-10px]">
                    <p className="text-lg md:text-xl font-semibold">
                      {nextAppointment.candidateFirstName}{" "}
                      {nextAppointment.candidateLastName}
                    </p>
                    <p className="text-sm text-[#797979]">
                      {nextAppointment.hiringRole}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-[#797979] text-[16px] gap-y-2">
                  <div className="flex gap-x-3">
                    <p>{nextAppointment.appDate}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#797979"
                    >
                      <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                  </div>

                  <div className="flex gap-x-3">
                    <p>{nextAppointment.appTime}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#797979"
                    >
                      <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                    </svg>

                  </div>
                </div>
              </div>
              <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-4 sm:gap-0">
                <button
                  onClick={handleViewResume}
                  className="w-[220px] sm:w-auto flex items-center gap-x-1 justify-center px-4 py-2 sm:px-2 sm:py-[2px] bg-white border border-[#E65F2B] rounded-3xl 
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
                  <span className="relative z-10 font-regular text-[#E65F2B] text-xl">
                    View Resume
                  </span>
                </button>

                <button
                  onClick={() => handelJoinInterview()}
                  className="w-[220px] sm:w-auto flex items-center gap-x-1 justify-center px-4 py-2 sm:px-2 sm:py-[2px] border border-white bg-[#E65F2B] rounded-3xl 
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

                  <span className="relative z-10 font-regular text-white text-xl">
                    Join Interview
                  </span>
                </button>
              </div>
            </div>
            {/* <hr className="mt-4 w-full bg-[#E65F2B] border-t border-[#E65F2B] rounded-full" /> */}
            {/* Tabs */}
            <div className="flex border-b mb-4 mt-6 gap-x-5">
              <button
                onClick={() => setActiveTab("interviewDetails")}
                className={` ${activeTab === "interviewDetails"
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500"
                  }`}
              >
                Interview Details
              </button>
              <button
                onClick={() => setActiveTab("jobDescription")}
                className={`${activeTab === "jobDescription"
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
                <div className="w-full px-0 sm:px-10 flex items-start justify-between">
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
                        {nextAppointment.jobRequirement.map(
                          (requirement, index) => (
                            <li key={index}>{requirement}</li>
                          )
                        )}
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
                        {nextAppointment.focusArea.map((focus, index) => (
                          <li key={index}>{focus}</li>
                        ))}
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
                    <p>{nextAppointment.jobDescription}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receivables */}
        <div className="flex flex-col items-center justify-between">
          <div className="p-4 md:p-6 bg-[#F2EAE5] w-full h-[47%] rounded-lg shadow-md">
            <div>
              <p className="text-lg font-semibold">Pending Receivables</p>
            </div>
            <div className="mt-2 flex flex-col gap-y-3 text-[#797979]">
              <div className="w-full flex items-center justify-between">
                <p>Total Amount</p>
                <p>₹24,320</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Interviews</p>
                <p>48</p>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-6 bg-[#F2EAE5] w-full h-[47%] rounded-lg shadow-md">
            <div>
              <p className="text-lg font-semibold">Completed Receivables</p>
            </div>
            <div className="mt-2 flex flex-col gap-y-3 text-[#797979]">
              <div className="w-full flex items-center justify-between">
                <p>Total Amount</p>
                <p>₹20,524</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Interviews</p>
                <p>152</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDashboard;
