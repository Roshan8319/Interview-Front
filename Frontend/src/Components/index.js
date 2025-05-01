// Authentication Components
import SignInPage from "./Authentication/SignInPage"
import ResetPassword from "./Authentication/ResetPassword"

// Client Components
import NavigationLayout from "./Client/NavigationLayout"
import Dashboard from "./Client/Dashboard"
import Jobs from "./Client/Jobs"
import Candidates from "./Client/Candidates"
import Finance from "./Client/Finance"
import ViewJob from "./Client/ViewJob"
import { ClientAddCandidate } from "./Client/AddCandidate"
import AddJob from "./Client/AddJob"

// Internal Components
import { InternalNavigationLayout } from "./Internal/NavigationLayout"
import { InternalDashboard } from "./Internal/Dashboard"
import { InternalClients } from "./Internal/Clients"
import { InternalInterviewer } from "./Internal/Interviewer"
import { InternalUsers } from "./Internal/Users"
import { InternalFinance } from "./Internal/Finance"
import RecentsInterviews from "./Internal/RecentsInterviews"
import { InternalAddInterviewer } from "./Internal/AddInterviewer"

// Interviewer Components  
import { InterviewerNavigationLayout } from "./Interviewer/NavigationLayout"
import InterviewerDashboard from "./Interviewer/Dashboard"
import MeetingScreen from "./Interviewer/MeetingScreen"
import Profile from "./Interviewer/Profile"
import Receivables from "./Interviewer/Receivables"
import InterviewHistory from "./Interviewer/InterviewHistory"
import FetchInterviewDetails from "./Interviewer/FetchInterviewDetails"
import Feedback from "./Interviewer/Feedback"
import Calendar from "./Interviewer/Calendar"

// Landing Components
import { LandingNavigationLayout } from "./Landing/NavigationLayout"
import Contact from "./Landing/Contact"
import Privacy from "./Landing/Privacy"
import Terms from "./Landing/Terms"
import JoinAsInterviewer from "./Landing/JoinAsInterviewer"

//Error Components
import ErrorBoundary from "./Error/ErrorBoundary"

// Grouped exports by feature
export {
    // Authentication
    SignInPage,
    ResetPassword,

    // Client
    NavigationLayout,
    Dashboard,
    Jobs, 
    Candidates,
    Finance,
    ViewJob,
    ClientAddCandidate,
    AddJob,

    // Internal
    InternalNavigationLayout,
    InternalAddInterviewer,
    InternalDashboard,
    InternalClients,
    InternalInterviewer,
    InternalUsers,
    InternalFinance,
    RecentsInterviews,

    // Interviewer
    InterviewerNavigationLayout,
    InterviewerDashboard,
    MeetingScreen,
    InterviewHistory,
    Profile,
    Receivables,
    FetchInterviewDetails,
    Feedback,
    Calendar,

    // Landing
    LandingNavigationLayout,
    Contact,
    Privacy,
    Terms,
    JoinAsInterviewer,

    // Error
    ErrorBoundary,
}