import { useState } from 'react'
import { NavigationLayout } from './Components'
import { Analytics } from '@vercel/analytics/react';


function App() {
  
  return (
   <div>
    <NavigationLayout/>
    <Analytics />
   </div>
  )
}

export default App
