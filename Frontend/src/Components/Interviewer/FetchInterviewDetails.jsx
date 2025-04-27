import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserTie, FaVideo } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import toast, { Toaster } from 'react-hot-toast';

function FetchInterviewDetails() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    interviewDate: null,
    interviewTime: null,
    interviewStatus: 'scheduled',
    duration: '30',
    additionalNotes: '',
    token: ''
  });
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      interviewDate: date
    }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      interviewTime: time
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setFormData(prev => ({
        ...prev,
        token: tokenFromUrl
      }));
    }
  }, [location]);

  useEffect(() => {
    // Add custom styles for the DatePicker header
    const style = document.createElement('style');
    style.innerHTML = `
      .react-datepicker__header {
        background-color: #FAD59F !important;
        padding-top: 1rem !important;
        padding-bottom: 0.75rem !important;
        border-bottom: none !important;
        border-top-left-radius: 0.45rem !important;
        border-top-right-radius: 0.45rem !important;
      }
      .react-datepicker__current-month {
        color: black !important;
        font-weight: semibold !important;
        margin-top: -0.4rem !important;
        font-size: 1.2rem !important;
      }
      .react-datepicker__day-name {
        color: black !important;
        font-weight: 500 !important;
        text-transform: uppercase !important;
        font-size: 0.8rem !important;
        line-height: 2rem !important;
      }
      .react-datepicker__navigation-icon::before {
        border-color: black !important;
        padding: 0.2rem !important;
        margin-top: 0.4rem !important;
      }
      .react-datepicker__triangle {
        display: none !important;
        border: none !important;
        background: none !important;
      }
      .react-datepicker {
        position: relative !important;
      }
      .react-datepicker::before {
        content: "" !important;
        position: absolute !important;
        top: -10px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 0 !important;
        height: 0 !important;
        border-left: 10px solid transparent !important;
        border-right: 10px solid transparent !important;
        border-bottom: 10px solid #FAD59F !important;
        z-index: 1 !important;
      }

      /* Time Picker Specific Styles */
    .react-datepicker__time-container {
      width: 120px !important;
    }

    .react-datepicker__time-box {
      width: 120px !important;
      margin: 0 !important;
    }

    .react-datepicker__time-list {
      padding: 0 !important;
    }

    .react-datepicker__time-list-item {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      height: 40px !important;
      font-size: 14px !important;
      padding: 8px !important;
      margin: 2px 0 !important;
    }

    .react-datepicker__time-list-item:hover {
      background-color: #FFF1EB !important;
      color: #E65F2B !important;
      border-radius: 0 !important;
    }

    .react-datepicker__time-list-item--selected {
      background-color: #E65F2B !important;
      color: white !important;
      border-radius: 0.3rem !important;
    }

    .react-datepicker__header--time {
      background-color: #FAD59F !important;
      height: 45px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-top-left-radius: 0.25rem !important;
      border-top-right-radius: 0.25rem !important;
    }

    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .react-datepicker__input-container input {
      width: 100% !important;
      display: block !important;
      box-shadow: none !important;
    }
    
    .react-datepicker__input-container input:focus {
      outline: none !important;
      border-color: #E65F2B !important;
      box-shadow: 0 0 0 1px #E65F2B !important;
    }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive field validation
    if (!formData.interviewDate) {
      toast.error('Please select an interview date', {
        style: {
          border: '2px solid #EF4444',
          padding: '16px',
          color: '#1F2937',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFFFF',
        },
      });
      return;
    }

    if (!formData.interviewTime) {
      toast.error('Please select an interview time', {
        style: {
          border: '2px solid #EF4444',
          padding: '16px',
          color: '#1F2937',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFFFF',
        },
      });
      return;
    }

    if (!formData.duration) {
      toast.error('Please select interview duration', {
        style: {
          border: '2px solid #EF4444',
          padding: '16px',
          color: '#1F2937',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFFFF',
        },
      });
      return;
    }

    setLoading(true);

    try {
      const formattedDate = formData.interviewDate.toISOString().split('T')[0];
      const formattedTime = formData.interviewTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const dataToSend = {
        interviewDate: formattedDate,
        interviewTime: formattedTime,
        interviewStatus: formData.interviewStatus,
        duration: formData.duration,
        additionalNotes: formData.additionalNotes,
        token: token
      };

      const response = await axios.post(
        `${baseUrl}/api/v1/email/getInterviewerDetails`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.status === 200) {
        toast.success('Interview scheduled successfully!', {
          style: {
            border: '2px solid #359E45',
            padding: '16px',
            color: '#1F2937',
          },
          iconTheme: {
            primary: '#359E45',
            secondary: '#FFFFFF',
          },
        });

        // Reset form
        setFormData({
          interviewDate: null,
          interviewTime: null,
          interviewStatus: 'scheduled',
          duration: '30',
          additionalNotes: '',
          token: token
        });

        // Navigate after success
        setTimeout(() => {
          navigate('/internal/recents');
        }, 1500);
      }
    } catch (error) {
      let errorMessage = 'Failed to schedule interview';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Connection timeout. Please try again.';
      } else if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      }

      toast.error(errorMessage, {
        style: {
          border: '2px solid #EF4444',
          padding: '16px',
          color: '#1F2937',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFFFF',
        },
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#EBDFD7] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#FFFFFF',
            color: '#374151',
            border: '2px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
          },
          success: {
            style: {
              border: '2px solid #359E45',
            },
            iconTheme: {
              primary: '#359E45',
              secondary: 'white',
            },
          },
          error: {
            style: {
              border: '2px solid #EF4444',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
        gutter={-40}
        containerStyle={{
          bottom: '40px',
          right: '50px',
        }}
      />
      <div className="max-w-[1400px] mx-auto"> {/* Increased max width */}
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E65F2B] mb-4">
            Schedule Interview Details
          </h1>
          <p className="text-gray-600">
            Please provide the necessary details for the upcoming interview
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form section - spans 2 columns */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#F2EAE5] rounded-2xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2 text-lg">
                    <FaCalendarAlt className="inline mr-2 text-[#E65F2B] w-5 h-5" />
                    Interview Date
                  </label>
                  <DatePicker
                    selected={formData.interviewDate || null}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    formatWeekDay={(day) => {
                      // Custom abbreviated day names
                      const weekdayMap = {
                        'Sunday': 'S',
                        'Monday': 'M',
                        'Tuesday': 'T',
                        'Wednesday': 'W',
                        'Thursday': 'T',
                        'Friday': 'F',
                        'Saturday': 'S'
                      };
                      return weekdayMap[day] || day.substr(0, 1);
                    }}
                    calendarClassName="!bg-white/70 !backdrop-blur-sm !rounded-lg !text-gray-700 !shadow-lg"
                    dayClassName={date => {
                      // Compare date objects directly instead of string comparison
                      const selectedDate = formData.interviewDate;

                      // Check if we have a selected date and if the current day matches it
                      if (selectedDate &&
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth() &&
                        date.getFullYear() === selectedDate.getFullYear()) {
                        return "!bg-[#E65F2B] !text-white hover:!bg-[#E65F2B] !rounded-full !font-bold";
                      }

                      // Today's date styling (optional)
                      const today = new Date();
                      if (date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear()) {
                        return "!bg-[#BAEBC4] !text-[#1F5B30] !rounded-full";
                      }

                      // All other dates
                      return "hover:!bg-orange-100 hover:!text-black !rounded-full hover:!cursor-pointer";
                    }}
                    required
                    placeholderText="Select date"
                    onFocus={(e) => e.target.blur()}
                    onChangeRaw={(e) => e.preventDefault()}
                    isClearable={false}
                    popperProps={{
                      strategy: "fixed"
                    }}
                    customInput={
                      <input
                        style={{
                          padding: '0.75rem 1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: '#F6F1EE',
                          cursor: 'pointer',
                          height: '6vh',
                          fontSize: '15px',
                          transition: 'all 200ms',
                          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                          ':focus': {
                            outline: 'none',
                            borderColor: '#E65F2B',
                            boxShadow: '0 0 0 1px #E65F2B'
                          }
                        }}
                        className="appearance-none" // Keep only this class for reset
                      />
                    }
                    wrapperClassName="w-full block"
                  />
                </div>

                {/* Time Picker */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2 text-lg">
                    <FaClock className="inline mr-2 text-[#E65F2B] w-5 h-5" />
                    Interview Time
                  </label>
                  <DatePicker
                    selected={formData.interviewTime || null}
                    onChange={handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={setHours(setMinutes(new Date(), 0), 7)}
                    maxTime={setHours(setMinutes(new Date(), 30), 21)}
                    placeholderText="Select time"
                    customInput={
                      <input
                        style={{
                          padding: '0.75rem 1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          width: '100%',
                          outline: 'none',
                          backgroundColor: '#F6F1EE',
                          cursor: 'pointer',
                          height: '6vh',
                          fontSize: '15px',
                          transition: 'all 200ms',
                          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                          ':focus': {
                            outline: 'none',
                            borderColor: '#E65F2B',
                            boxShadow: '0 0 0 1px #E65F2B'
                          }
                        }}
                        className="appearance-none" // Keep only this class for reset
                      />
                    }
                    className="!bg-white/70 !backdrop-blur-sm !rounded-lg !text-gray-700 !shadow-lg"
                    timeClassName={() => "hover:!bg-orange-100 !rounded-lg !py-2"}
                    popperClassName="!z-50"
                    popperProps={{
                      strategy: "fixed"
                    }}
                  />
                </div>

                {/* Duration Selector */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium text-lg">
                    <FaClock className="inline mr-2 text-[#E65F2B] w-5 h-5" />
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full h-[6vh] px-4 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] appearance-none cursor-pointer"
                  >
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                    <option value="90">90 Minutes</option>
                  </select>
                  <div className='relative left-[92%] bottom-[30%]'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.822754 0.999939L6.85146 6.99994L12.8802 0.999939" stroke="#797979" stroke-width="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full h-32 px-4 pt-3 border-2 rounded-xl outline-none transition-all duration-200 text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] appearance-none cursor-pointer"
                  placeholder="Any specific requirements or notes for the interview..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#E65F2B] text-white px-8 py-3 rounded-full hover:bg-[#d54d1a] transition-colors duration-300 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Scheduling...' : 'Schedule Interview'}
                  <FaCalendarAlt />
                </button>
              </div>
            </form>
          </div>

          {/* Tips Section - takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-[#F2EAE5] rounded-2xl shadow-md p-6 h-full">
              <h3 className="text-xl font-semibold text-[#E65F2B] mb-4">Interview Tips</h3>
              <div className="flex flex-col gap-4">
                <div className="p-3 rounded-xl border-2 border-grey-200 bg-[#F6F1EE]">
                  <h4 className="font-medium mb-2">Before Interview</h4>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>Review resume and portfolio</li>
                    <li>Prepare technical and soft questions</li>
                    <li>Check audio, video, and connection</li>
                    <li>Outline key skills to assess</li>
                    <li>Set a quiet, professional space</li>
                    <li>Have backup questions ready</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl border-2 border-grey-200 bg-[#F6F1EE]">
                  <h4 className="font-medium mb-2">During Interview</h4>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>Begin with intro and role overview</li>
                    <li>Ask open and structured questions</li>
                    <li>Take clear and unbiased notes</li>
                    <li>Let candidates ask questions</li>
                    <li>Manage time across all topics</li>
                    <li>Observe communication skills</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchInterviewDetails;