import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'
  
import {
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
  InternalAddInterviewer,
  InternalNavigationLayout,
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
} from './Components'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // Store the attempted URL for redirect after login
      localStorage.setItem('redirectPath', location.pathname);
      return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error('Auth error:', error);
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      {/* Public Routes */}
      <Route path='/' element={<LandingNavigationLayout />}>
        <Route index element={<Navigate to="/auth/signin" replace />} />
        <Route path='terms' element={<Terms />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path='contact' element={<Contact />} />
        <Route path='join-as-interviewer' element={<JoinAsInterviewer />} />
      </Route>

      {/* Authentication Routes - Keep these unprotected */}
      <Route path='auth'>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path='signin' element={<SignInPage />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Route>

      {/* Protected Client Routes */}
      <Route path='client' element={
        <ProtectedRoute allowedRoles={['client']}>
          <NavigationLayout />
        </ProtectedRoute>
      }>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='candidates' element={<Candidates />} />
        <Route path='finance' element={<Finance />} />
        <Route path='jobs/viewjob' element={<ViewJob />} />
        <Route path='candidates/addcandidate' element={<ClientAddCandidate />} />
        <Route path='jobs/addjob' element={<AddJob />} />
      </Route>

      {/* Protected Internal Routes */}
      <Route path='internal' element={
        <ProtectedRoute allowedRoles={['internal']}>
          <InternalNavigationLayout />
        </ProtectedRoute>
      }>
        <Route path='dashboard' element={<InternalDashboard />} />
        <Route path='clients'>
          <Route path='' element={<InternalClients />} />
          <Route path='addclient' element={<InternalClients />} />
        </Route>
        <Route path='interviewer' element={<InternalInterviewer />} />
        <Route path='addinterviewer' element={<InternalAddInterviewer />} />
        <Route path='users' element={<InternalUsers />} />
        <Route path='finance' element={<InternalFinance />} />
        <Route path='recents' element={<RecentsInterviews />} />
      </Route>

      {/* Protected Interviewer Routes */}
      <Route path='interviewer' element={
        <ProtectedRoute allowedRoles={['interviewer']}>
          <InterviewerNavigationLayout />
        </ProtectedRoute>
      }>
        <Route path='dashboard' element={<InterviewerDashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='receivables' element={<Receivables />} />
        <Route path='interview-history' element={<InterviewHistory />} />
        <Route path='feedback' element={<Feedback />} />
        <Route path='calendar' element={<Calendar />} />
      </Route>

      {/* Protected Meeting Routes */}
      <Route path='interview/:meetingLink' element={
        <ProtectedRoute allowedRoles={['interviewer', 'client']}>
          <MeetingScreen />
        </ProtectedRoute>
      } />
      <Route path='fetch-interview-details' element={
        <ProtectedRoute allowedRoles={['interviewer', 'client']}>
          <FetchInterviewDetails />
        </ProtectedRoute>
      } />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)