import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the current user is in visitor mode
 */
export default function useVisitorStatus() {
  const [isVisitor, setIsVisitor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check visitor status from session storage
    const visitorStatus = sessionStorage.getItem('isVisitor') === 'true';
    setIsVisitor(visitorStatus);
    setIsLoading(false);
    
    // Create event listener to detect changes in storage
    const handleStorageChange = (e) => {
      if (e.key === 'isVisitor') {
        setIsVisitor(e.newValue === 'true');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { isVisitor, isLoading };
}