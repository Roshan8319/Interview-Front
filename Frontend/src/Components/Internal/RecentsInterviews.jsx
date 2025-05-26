import React, { useState, useEffect } from "react";
import { Clock, Building2, Briefcase, Users, Calendar, ArrowRight } from "lucide-react";
import axios from "axios";
import { VisitorDisableWrapper } from '../Hooks/VisitorGuard';

function RecentsInterviews() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [interviews, setInterviews] = useState([]);
  const [pendingSchedules, setPendingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make both API calls simultaneously
        const [interviewsRes, schedulesRes] = await Promise.all([
          axios.get(`${baseUrl}/api/v1/internal/get-recents-interviews`, {
            withCredentials: true,
          }),
          axios.get(`${baseUrl}/api/v1/internal/get-recent-interviewer-candidate-mappings`, {
            withCredentials: true,
          })
        ]);

        setInterviews(interviewsRes.data?.data?.interviews || []);
        setPendingSchedules(schedulesRes.data?.data?.mappings || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E65F2B]"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading recent interviews...</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[#EBDFD7] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8 mt-4 sm:mt-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#E65F2B]">Recent Interviews</h1>
          <div className="bg-[#E65F2B]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl border-[1px] border-[#E65F2B] bg-white active:border-[#E65F2B] items-center flex">
            <Clock className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-[#E65F2B] mr-2" />
            <span className="text-sm sm:text-base text-[#E65F2B] font-medium">Past 2 Hours</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Loading Data...</h3>
          </div>
        ) : (
          <>
            {/* Recent Interviews Grid */}
            {interviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.map((interview) => (
                  <div
                    key={interview}
                    className="bg-white/30 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E65F2B]/20"
                  >
                    {/* Client Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-[#E65F2B]" />
                          <h3 className="font-semibold text-[#E65F2B]">{interview.clientName}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          <span>{interview.jobRole}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${interview.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                          }`}
                      >
                        {interview.interviewStatus}
                      </span>
                    </div>

                    {/* Interviewer & Candidate Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E65F2B]/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#E65F2B]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Interviewer</p>
                          <p className="text-sm text-gray-600">{interview.interviewerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E65F2B]/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#E65F2B]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Candidate</p>
                          <p className="text-sm text-gray-600">{interview.candidateName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Time Indicator */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {interview.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-8 sm:py-12">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-[#E65F2B] mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900">No Recent Interviews</h3>
                <p className="text-sm sm:text-base text-gray-500">No interviews have been conducted in the past 2 hours.</p>
              </div>
            )}

            {/* Pending Schedules Section */}
            <div className="mt-8 sm:mt-12">
              <div className="flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#E65F2B]">Pending Schedules</h2>
                <div className="bg-[#E65F2B]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl border-[1px] border-[#E65F2B] bg-white items-center flex">
                  <Calendar className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-[#E65F2B] mr-2" />
                  <span className="text-sm sm:text-base text-[#E65F2B] font-medium">
                    {pendingSchedules.length} Awaiting
                  </span>
                </div>
              </div>

              {pendingSchedules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingSchedules.map((schedule) => (
                    <div
                      key={schedule.candidateId}
                      className="bg-white/30 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E65F2B]/20"
                    >
                      {/* Candidate Info */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-[#E65F2B]" />
                            <h3 className="font-semibold text-gray-800">{schedule.candidateName}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{schedule.jobRole}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
                          {schedule.status}
                        </span>
                      </div>

                      {/* Interviewer Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#E65F2B]/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#E65F2B]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Assigned Interviewer</p>
                          <p className="text-sm text-gray-600">{schedule.interviewer}</p>
                        </div>
                      </div>

                      {/* Schedule Button */}
                      {schedule.fetchInterviewDetails && (
                        <VisitorDisableWrapper>
                          <a
                            href={schedule.fetchInterviewDetails}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#E65F2B] text-white rounded-lg hover:bg-[#d54d1a] transition-colors duration-300"
                          >
                            Schedule Interview
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </VisitorDisableWrapper>
                      )}

                      {/* Time Indicator */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {schedule.timeAgo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State for Pending Schedules */
                <div className="p-4 sm:p-8 text-center">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#E65F2B] mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No Pending Schedules</h3>
                  <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                    All interviews have been scheduled. New interview requests will appear here when candidates are assigned to interviewers.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecentsInterviews;
