import React from 'react';
import useVisitorStatus from './VisitorStatus';

const VisitorIndicator = () => {
  const { isVisitor } = useVisitorStatus();
  
  if (!isVisitor) return null;
  
  return (
    <div className="fixed bottom-4 right-[40%] z-50 bg-[#E65F2B] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      Visitor Mode (Read-Only)
    </div>
  );
};

export default VisitorIndicator;