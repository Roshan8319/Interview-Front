import React from 'react';
import useVisitorStatus from './VisitorStatus';
import { showVisitorToast } from './VisitorToast';

/**
 * Component to conditionally render content based on visitor status
 */
const VisitorGuard = ({ children, fallback = null, hideCompletely = false }) => {
  const { isVisitor, isLoading } = useVisitorStatus();

  if (isLoading) return null;
  
  if (isVisitor) {
    if (hideCompletely) return null;
    return fallback;
  }
  
  return children;
};

/**
 * Component to disable interactive elements for visitor users
 */
export const VisitorDisableWrapper = ({ children, className = '' }) => {
  const { isVisitor } = useVisitorStatus();
  
  if (!isVisitor) return children;
  
  return (
    <div className={`relative ${className}`}>
      {children}
      {isVisitor && (
        <div 
          className="absolute inset-0 bg-gray-200 bg-opacity-0 cursor-not-allowed" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showVisitorToast('This action is not available in visitor mode');
          }} 
        />
      )}
    </div>
  );
};

export default VisitorGuard;