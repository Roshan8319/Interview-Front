import React from 'react';

let toastTimeout;

/**
 * Shows a toast notification for visitor actions
 * @param {string} message - Message to display
 */
export const showVisitorToast = (message = 'This action is not available in visitor mode') => {
  // Clear any existing toast
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  // Create or get toast container
  let toastContainer = document.getElementById('visitor-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'visitor-toast-container';
    toastContainer.className = 'fixed bottom-[10%] sm:bottom-6 right-2 sm:right-10 z-50';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-md shadow-md flex items-center mb-2';
  
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
    <span>${message}</span>
  `;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Remove after 3 seconds
  toastTimeout = setTimeout(() => {
    if (toastContainer.contains(toast)) {
      toastContainer.removeChild(toast);
    }
    
    // If no more toasts, remove container
    if (toastContainer.childNodes.length === 0) {
      document.body.removeChild(toastContainer);
    }
  }, 1000);
};

export default showVisitorToast;