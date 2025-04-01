import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ClientAddCandidate } from './Components/Client/InterviewPlatform/VerticalNavigationLinks/AddCandidate'
import { ClientScheduleInterview } from './Components/Client/InterviewPlatform/VerticalNavigationLinks/ScheduleInterview'
import AddJob from './Components/Client/InterviewPlatform/VerticalNavigationLinks/AddJob'
import JobDetails from "./Components/Client/InterviewPlatform/VerticalNavigationLinks/JobDetails"
import ViewJob from './Components/Client/InterviewPlatform/VerticalNavigationLinks/ViewJob'



import {SignInPage,ResetPassword} from './Components'


// Client Imports
import { NavigationLayout, Dashboard, Settings, Jobs, Candidates, Analytics,AnalyticsDateFilter, Integration, Finance, Engagement, Message,CandidateDetails } from './Components'
//Agency Imports

//Internal Imports
import {InternalNavigationLayout,InternalDashboard,InternalClients,InternalInterviewer,InternalUsers,InternalAgreements,InternalFinance,InternalEngagement,InternalMessages,RecentsInterviews} from "./Components"
//Interviewer Imports
import { InterviewerNavigationLayout,InterviewerDashboard,MeetingScreen,Calendar,InterviewHistory,Profile,Receivables,FetchInterviewDetails } from './Components'
import { Hello } from './Components'
import { InternalAddInterviewer } from './Components/Internal/AddInterviewer'


//Landing Imports
import { LandingNavigationLayout } from './Components'

import Background from './Components/Background'


const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route>
      <Route path='' element={<LandingNavigationLayout/>} />
     




      

      //Client   Routes
      <Route path='client' element={<NavigationLayout />}>
        <Route path='message' element={<Message />} />
        <Route path='dashboard' element={<Dashboard />} />
        {/* <Route path='settings' element={<Settings />} /> */}
        <Route path='jobs' element={<Jobs />} />
        <Route path='candidates' element={<Candidates />} />
        {/* <Route path='analytics' element={<Analytics />} /> */}
        <Route path='analytics'>
        <Route path='' element={<Analytics />} />
        <Route path='filter' element={<AnalyticsDateFilter />} />
        </Route>

        {/* <Route path='integration' element={<Integration />} /> */}
        <Route path='finance' element={<Finance />} />
        {/* <Route path='engagement' element={<Engagement />} /> */}
        <Route path='candidates/addcandidate' element={<ClientAddCandidate/>}/>
        <Route path='candidates/schedule-interview' element={<ClientScheduleInterview/>}/>
        <Route path='candidates/details' element={<CandidateDetails/>}/>

        <Route path='jobs/addjob' element={<AddJob/>}/>
        <Route path='jobs/viewjob' element={<ViewJob/>}/>

        <Route path='jobs/jobdetails' element={<JobDetails/>}/>
       
      </Route>

      <Route path='/client/analytics/filter' element={<AnalyticsDateFilter/>} />


      //Agency Routes
     


      //Internal Routes
      <Route path='internal' element={<InternalNavigationLayout/>}>
        <Route path='dashboard' element={<InternalDashboard/>} />
        <Route path='clients'>
        <Route path='' element={<InternalClients/>}/>
        <Route path='addclient' element={<InternalClients/>} />
        </Route>
        <Route path='interviewer' element={<InternalInterviewer/>} />
        <Route path='addinterviewer' element={<InternalAddInterviewer/>} />
        <Route path='users' element={<InternalUsers/>} />
        <Route path='agreements' element={<InternalAgreements/>} />
        <Route path='finance' element={<InternalFinance/>} />
        <Route path='engagement' element={<InternalEngagement/>}/>
        <Route path='message' element={<InternalMessages/>}/>
        <Route path='recents' element={<RecentsInterviews/>}/>
       
      </Route>


      //Interviewer Routes
      <Route path='interviewer' element={<InterviewerNavigationLayout/>}>
        <Route path='dashboard' element={<InterviewerDashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='calendar' element={<Calendar/>} />
        <Route path='receivables' element={<Receivables />} />
        <Route path='interview-history' element={<InterviewHistory />} />       
        
      </Route>


      //Landing Routes
      {/* <Route path='/' element={<LandingNavigationLayout/>} >

      </Route> */}
























      <Route path='auth'>

      <Route path='signin' element={<SignInPage/>} />
      <Route path='reset-password' element={<ResetPassword/>}/>


      </Route>

      <Route path='interview/:meetingLink' element={<MeetingScreen />} />
      
      <Route path='fetch-interview-details' element={<FetchInterviewDetails/>} />








    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  
)

//