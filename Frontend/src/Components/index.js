import Hello from "./Hello";



//New SignIn Import 
import SignInPage from "../Components/Authentication/SignInPage"
import ResetPassword from "./Authentication/ResetPassword";

//Client Imports

import NavigationLayout from "./Client/InterviewPlatform/NavigationLayout";
import Dashboard from "./Client/InterviewPlatform/VerticalNavigationLinks/Dashboard"
import Settings from "./Client/InterviewPlatform/VerticalNavigationLinks/Settings"
import Jobs from "./Client/InterviewPlatform/VerticalNavigationLinks/Jobs"
import Candidates from "./Client/InterviewPlatform/VerticalNavigationLinks/Candidates"
import Analytics from "./Client/InterviewPlatform/VerticalNavigationLinks/Analytics"
import AnalyticsDateFilter from "./Client/InterviewPlatform/VerticalNavigationLinks/AnalyticsDateFilter";
import Integration from "./Client/InterviewPlatform/VerticalNavigationLinks/Integration"
import Finance from "./Client/InterviewPlatform/VerticalNavigationLinks/Finance"
import Engagement from "./Client/InterviewPlatform/VerticalNavigationLinks/Engagement"
import Message from "./Client/InterviewPlatform/VerticalNavigationLinks/Message";

//Agency Imports
import { AgencyNavigationLayout } from "./Agency/NavigationLayout";
import { AgencyDashboard } from "./Agency/Dashboard";
import { AgencyCandidates } from "./Agency/Candidates";
import { AgencyAddCandidate } from "./Agency/AddCandidate";
import { AgencyScheduleInterview } from "./Agency/ScheduleInterview";


//Internal Imports
import { InternalNavigationLayout } from "./Internal/NavigationLayout";
import {InternalDashboard } from "./Internal/Dashboard"
import {InternalClients} from "./Internal/Clients"
import {InternalInterviewer} from "./Internal/Interviewer"
import {InternalUsers} from "./Internal/Users"
import {InternalAgreements} from "./Internal/Agreement"
import {InternalFinance} from "./Internal/Finance"
import {InternalEngagement} from "./Internal/Engagement"
import { InternalMessages } from "./Internal/Messages";




// Interviewer Imports
import {InterviewerNavigationLayout} from "./Interviewer/NavigationLayout";
import InterviewerDashboard from "./Interviewer/Dashboard";
import MeetingScreen from "./Interviewer/MeetingScreen"
import Profile from "./Interviewer/Profile";
import Calendar from "./Interviewer/Calendar";
import Receivables from "./Interviewer/Receivables";
import InterviewHistory from "./Interviewer/InterviewHistory";






//New Sigin page 

export {SignInPage,ResetPassword}

//Client Exports
export {NavigationLayout,Dashboard,Settings,Jobs,Candidates,Analytics, AnalyticsDateFilter,Integration,Finance,Engagement,Message}

//Agency Exports
export { AgencyNavigationLayout,AgencyDashboard, AgencyCandidates,AgencyAddCandidate, AgencyScheduleInterview}


//Internal Exports

export {InternalNavigationLayout,InternalDashboard,InternalClients,InternalInterviewer,InternalUsers,InternalAgreements,InternalFinance,InternalEngagement,InternalMessages}

//Interviewer Exports
export {InterviewerNavigationLayout,InterviewerDashboard,MeetingScreen,Calendar,InterviewHistory,Profile,Receivables}







export {Hello}