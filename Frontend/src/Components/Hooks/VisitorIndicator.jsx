import React from 'react';
import useVisitorStatus from './VisitorStatus';

const VisitorIndicator = () => {
  const { isVisitor } = useVisitorStatus();
  
  if (!isVisitor) return null;
  
  return (
    <div className="fixed bottom-4 z-50 shadow-md flex items-center gap-2 bg-[#E65F2B] text-white rounded-full text-sm font-medium
      /* Mobile styles (default) */
      left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs max-w-[90%] whitespace-nowrap bottom-[10%]
      /* Tablet styles */
      sm:px-3 sm:py-1.5 sm:text-sm sm:bottom-[2%]
      /* Desktop styles */
      md:right-[40%] md:left-auto md:transform-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      Visitor Mode (Read-Only)
    </div>
  );
};

export default VisitorIndicator;