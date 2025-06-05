import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserTie, FaVideo } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner";
import { Toaster } from "@/Components/Ui/Sonner";
import { Calendar } from "@/Components/Ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Ui/Popover";
import { Button } from "@/Components/Ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/Ui/Select";
import { Label } from "@/Components/Ui/Label";
import { CalendarIcon, Clock } from "lucide-react";
import { format, addDays } from "date-fns";

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

  // Define custom DatePicker component
  const DatePickerComponent = ({ id, selectedDate, onDateChange, label }) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={`w-full justify-start text-left font-normal bg-[#F6F1EE] border-[#e5e7eb] hover:bg-[#F2EAE5] focus:outline-none focus:ring-1 focus:ring-[#E65F2B] ${!selectedDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#E65F2B]" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" style={{ zIndex: 50 }}>
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="text-xs focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  onClick={() => onDateChange(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  className="text-xs focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  onClick={() => onDateChange(addDays(new Date(), 1))}
                >
                  Tomorrow
                </Button>
                <Button
                  variant="outline"
                  className="text-xs focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                  onClick={() => onDateChange(addDays(new Date(), 7))}
                >
                  In a week
                </Button>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
              classNames={{
                day_selected: "bg-[#E65F2B] text-white hover:bg-[#d2542b] hover:text-white focus:bg-[#E65F2B] focus:text-white",
                day_today: "bg-[#FEEAE3] text-[#E65F2B]",
                day_range_middle: "bg-[#FEEAE3] text-[#E65F2B]",
                day_range_end: "bg-[#E65F2B] text-white",
                day_range_start: "bg-[#E65F2B] text-white",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  // Define custom TimePicker component
  const TimePickerComponent = ({ id, selectedTime, onTimeChange, label }) => {
    // Generate time options by hour category for better organization
    const generateTimeOptions = () => {
      const morningTimes = [];
      const afternoonTimes = [];
      const eveningTimes = [];

      // Morning: 7:00 AM - 11:30 AM
      for (let hour = 7; hour < 12; hour++) {
        morningTimes.push({ value: `${hour}:00`, label: `${hour}:00 AM` });
        morningTimes.push({ value: `${hour}:30`, label: `${hour}:30 AM` });
      }

      // Afternoon: 12:00 PM - 4:30 PM
      for (let hour = 12; hour < 17; hour++) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        afternoonTimes.push({ value: `${hour}:00`, label: `${displayHour}:00 PM` });
        afternoonTimes.push({ value: `${hour}:30`, label: `${displayHour}:30 PM` });
      }

      // Evening: 5:00 PM - 9:30 PM
      for (let hour = 17; hour <= 21; hour++) {
        const displayHour = hour - 12;
        eveningTimes.push({ value: `${hour}:00`, label: `${displayHour}:00 PM` });
        eveningTimes.push({ value: `${hour}:30`, label: `${displayHour}:30 PM` });
      }

      return { morningTimes, afternoonTimes, eveningTimes };
    };

    const { morningTimes, afternoonTimes, eveningTimes } = generateTimeOptions();

    // Convert between string time and Date object
    const getTimeString = (date) => {
      if (!date) return "";
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes === 0 ? '00' : '30'}`;
    };

    const getTimeDate = (timeString) => {
      if (!timeString) return null;
      const [hours, minutes] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    // Format for display (24h -> 12h with AM/PM)
    const formatTimeDisplay = (timeString) => {
      if (!timeString) return "";
      const [hourStr, minuteStr] = timeString.split(':');
      const hour = parseInt(hourStr, 10);
      const isPM = hour >= 12;
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minuteStr} ${isPM ? 'PM' : 'AM'}`;
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Select
          value={selectedTime ? getTimeString(selectedTime) : ""}
          onValueChange={(value) => onTimeChange(getTimeDate(value))}
        >
          <SelectTrigger
            id={id}
            className="bg-[#F6F1EE] border-[#e5e7eb] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
          >
            <SelectValue placeholder="Select time">
              {selectedTime ? format(selectedTime, "h:mm a") : "Select time"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="px-2 py-1.5">
                <h4 className="text-sm font-medium text-[#E65F2B]">Quick select</h4>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                    onClick={() => {
                      const date = new Date();
                      date.setHours(9, 0, 0, 0);
                      onTimeChange(date);
                    }}
                  >
                    9:00 AM
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                    onClick={() => {
                      const date = new Date();
                      date.setHours(12, 0, 0, 0);
                      onTimeChange(date);
                    }}
                  >
                    12:00 PM
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                    onClick={() => {
                      const date = new Date();
                      date.setHours(13, 30, 0, 0);
                      onTimeChange(date);
                    }}
                  >
                    1:30 PM
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs justify-center hover:bg-[#FEEAE3] hover:text-[#E65F2B] hover:border-[#E65F2B] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]"
                    onClick={() => {
                      const date = new Date();
                      date.setHours(17, 0, 0, 0);
                      onTimeChange(date);
                    }}
                  >
                    5:00 PM
                  </Button>
                </div>
              </div>

              <div className="py-1.5 px-2">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Morning</h4>
                {morningTimes.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className="hover:bg-[#FEEAE3] hover:text-[#E65F2B]"
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </div>

              <div className="py-1.5 px-2">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Afternoon</h4>
                {afternoonTimes.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className="hover:bg-[#FEEAE3] hover:text-[#E65F2B]"
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </div>

              <div className="py-1.5 px-2">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Evening</h4>
                {eveningTimes.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className="hover:bg-[#FEEAE3] hover:text-[#E65F2B]"
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive field validation
    if (!formData.interviewDate) {
      toast.error('Please select an interview date');
      return;
    }

    if (!formData.interviewTime) {
      toast.error('Please select an interview time');
      return;
    }

    if (!formData.duration) {
      toast.error('Please select interview duration');
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
        toast.success('Interview scheduled successfully!');

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

      toast.error(errorMessage);
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
    <div className="bg-[#EBDFD7] p-3 sm:p-4 md:p-6 lg:p-8 min-h-screen">
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
      <div className="mx-auto max-w-7xl"> {/* Added max width for large screens */}
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E65F2B] mb-1 md:mb-2 mt-4">
            Schedule Interview Details
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Please provide the necessary details for the upcoming interview
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:items-start">
          {/* Form section - spans 2 columns on large screens, full width on smaller screens */}
          <div className="lg:col-span-2 order-1 lg:h-full">
            <form onSubmit={handleSubmit} className="bg-[#F2EAE5] rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6 lg:h-full lg:flex lg:flex-col">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2">
                {/* Date Picker */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <FaCalendarAlt className="text-[#E65F2B] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <Label className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                      Interview Date
                    </Label>
                  </div>
                  <DatePickerComponent
                    id="interview-date"
                    selectedDate={formData.interviewDate}
                    onDateChange={handleDateChange}
                    label=""
                  />
                </div>

                {/* Time Picker */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <FaClock className="text-[#E65F2B] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <Label className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                      Interview Time
                    </Label>
                  </div>
                  <TimePickerComponent 
                    id="interview-time"
                    selectedTime={formData.interviewTime}
                    onTimeChange={handleTimeChange}
                    label=""
                  />
                </div>

                {/* Duration Selector */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <FaClock className="text-[#E65F2B] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <Label className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                      Duration
                    </Label>
                  </div>
                  <Select
                    name="duration"
                    value={formData.duration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger className="bg-[#F6F1EE] border-[#e5e7eb] focus:outline-none focus:ring-1 focus:ring-[#E65F2B]">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="45">45 Minutes</SelectItem>
                      <SelectItem value="60">60 Minutes</SelectItem>
                      <SelectItem value="90">90 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mt-4 sm:mt-6 lg:flex-1 lg:flex lg:flex-col">
                <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full h-20 sm:h-28 md:h-32 lg:flex-1 lg:min-h-[120px] px-3 sm:px-4 pt-2 sm:pt-3 border-2 rounded-xl outline-none transition-all duration-200 text-sm sm:text-[15px] bg-[#F6F1EE] shadow-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E65F2B] appearance-none cursor-pointer"
                  placeholder="Any specific requirements or notes for the interview..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#E65F2B] text-white px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-[#d54d1a] transition-colors duration-300 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Scheduling...' : 'Schedule Interview'}
                  <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Tips Section - takes 1 column on large screens, full width and below form on smaller screens */}
          <div className="lg:col-span-1 order-2 lg:h-full">
            <div className="bg-[#F2EAE5] rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6 lg:h-full lg:flex lg:flex-col">
              <h3 className="text-base sm:text-lg font-semibold text-[#E65F2B] mb-2 sm:mb-3 md:mb-4">Interview Tips</h3>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:flex-1 lg:justify-center">
                <div className="p-2 sm:p-3 rounded-xl border-2 border-grey-200 bg-[#F6F1EE]">
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Before Interview</h4>
                  <ul className="text-gray-600 list-disc list-inside text-xs sm:text-sm">
                    <li>Review resume and portfolio</li>
                    <li>Prepare technical and soft questions</li>
                    <li>Check audio, video, and connection</li>
                    <li>Outline key skills to assess</li>
                    <li className="hidden sm:list-item">Set a quiet, professional space</li>
                    <li className="hidden sm:list-item">Have backup questions ready</li>
                  </ul>
                </div>

                <div className="p-2 sm:p-3 rounded-xl border-2 border-grey-200 bg-[#F6F1EE]">
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">During Interview</h4>
                  <ul className="text-gray-600 list-disc list-inside text-xs sm:text-sm">
                    <li>Begin with intro and role overview</li>
                    <li>Ask open and structured questions</li>
                    <li>Take clear and unbiased notes</li>
                    <li className="hidden sm:list-item">Let candidates ask questions</li>
                    <li className="hidden sm:list-item">Manage time across all topics</li>
                    <li className="hidden sm:list-item">Observe communication skills</li>
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