import React, { useState, useEffect } from 'react';
import { Clock, Building2, Briefcase, Users } from 'lucide-react';

function RecentsInterviews() {
  // Sample data - replace with actual API call
  const [recentInterviews, setRecentInterviews] = useState([
    {
      id: 1,
      clientName: "TechCorp Solutions",
      hiringRole: "Senior Frontend Developer",
      interviewerName: "Rahul Sharma",
      candidateName: "Priya Patel",
      timeAgo: "15 minutes ago",
      status: "Completed"
    },
    {
      id: 2,
      clientName: "DataTech Systems",
      hiringRole: "Backend Engineer",
      interviewerName: "Amit Kumar",
      candidateName: "Vikram Singh",
      timeAgo: "45 minutes ago",
      status: "In Progress"
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#EBDFD7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-[#E65F2B]">Recent Interviews</h1>
          <div className="bg-[#E65F2B]/10 px-4 py-2 rounded-lg">
            <Clock className="inline-block w-5 h-5 text-[#E65F2B] mr-2" />
            <span className="text-[#E65F2B] font-medium">Past 2 Hours</span>
          </div>
        </div>

        {/* Interview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentInterviews.map((interview) => (
            <div
              key={interview.id}
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
                    <span>{interview.hiringRole}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  interview.status === "Completed" 
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {interview.status}
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
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {interview.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recentInterviews.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Recent Interviews</h3>
            <p className="text-gray-500">No interviews have been conducted in the past 2 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentsInterviews;