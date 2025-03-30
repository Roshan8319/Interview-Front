import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserTie, FaVideo } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FetchInterviewDetails() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    interviewDate: '',
    interviewTime: '',
    interviewStatus: 'scheduled',
    duration: '30',
    additionalNotes: '',
    token: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate required fields
    if (!formData.interviewDate || !formData.interviewTime) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const dataToSend = {
      interviewDate: formData.interviewDate,
      interviewTime: formData.interviewTime,
      interviewStatus: formData.interviewStatus,
      token: token
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/email/getInterviewerDetails`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          interviewDate: '',
          interviewTime: '',
          interviewStatus: 'scheduled',
          duration: '30',
          additionalNotes: '',
          token: token
        });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
          // Optionally redirect to another page
          // navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      let errorMessage = 'Failed to submit interview details';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Connection timeout. Please try again.';
      } else if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      }
      
      setError(errorMessage);
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
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E65F2B] mb-4">
            Schedule Interview Details
          </h1>
          <p className="text-gray-600">
            Please provide the necessary details for the upcoming interview
          </p>
        </div>

        {/* Candidate Info Card */}

        {/* Interview Details Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p>Interview scheduled successfully!</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                <FaCalendarAlt className="inline mr-2 text-[#E65F2B]" />
                Interview Date
              </label>
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#E65F2B] focus:border-[#E65F2B]"
                required
              />
            </div>

            {/* Time Picker */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                <FaClock className="inline mr-2 text-[#E65F2B]" />
                Interview Time
              </label>
              <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#E65F2B] focus:border-[#E65F2B]"
                required
              />
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FaClock className="inline mr-2 text-[#E65F2B]" />
                Duration (minutes)
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#E65F2B] focus:border-[#E65F2B]"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#E65F2B] focus:border-[#E65F2B] h-32"
              placeholder="Any specific requirements or notes for the interview..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#E65F2B] text-white px-8 py-3 rounded-lg hover:bg-[#d54d1a] transition-colors duration-300 flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Scheduling...' : 'Schedule Interview'}
              <FaCalendarAlt />
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#E65F2B] mb-4">Interview Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F6F1EE] rounded-lg">
              <h4 className="font-medium mb-2">Before Interview</h4>
              <ul className="text-gray-600 list-disc list-inside">
                <li>Review candidate's resume</li>
                <li>Prepare technical questions</li>
                <li>Test your audio/video</li>
              </ul>
            </div>
            <div className="p-4 bg-[#F6F1EE] rounded-lg">
              <h4 className="font-medium mb-2">During Interview</h4>
              <ul className="text-gray-600 list-disc list-inside">
                <li>Start with an introduction</li>
                <li>Take clear notes</li>
                <li>Allow time for questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchInterviewDetails;