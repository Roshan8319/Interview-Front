// Botpress Chatbot Integration
export const initBotpressChat = () => {
  // Store the inject script reference
  let injectScriptLoaded = false;

  // Define your landing page paths
  const landingPagePaths = [
    '/',
    '/terms',
    '/privacy',
    '/contact',
    '/join-as-interviewer'
  ];

  // Define authentication paths that should force a refresh when navigated to
  const authPaths = [
    '/auth/signin',
    '/auth/reset-password',
  ];

  // Complete removal of Botpress elements and global objects
  function removeAllBotpressElements() {
    // Remove widget container
    const container = document.getElementById('bp-web-widget-container');
    if (container) container.remove();

    // Remove all script tags related to Botpress
    const scripts = document.querySelectorAll('script[src*="botpress"]');
    scripts.forEach(script => script.remove());

    // Remove custom script
    const customScript = document.getElementById('botpress-script');
    if (customScript) customScript.remove();

    // Clean up global objects
    if (window.botpressWebChat) {
      try {
        window.botpressWebChat.sendEvent({ type: 'hide' });
        if (typeof window.botpressWebChat.destroy === 'function') {
          window.botpressWebChat.destroy();
        }
      } catch (e) {
        console.log("Error cleaning up Botpress:", e);
      }
      // Try to delete the global object
      delete window.botpressWebChat;
    }

    // Remove any element with bp- prefix in class or id
    document.querySelectorAll('[class*="bp-"], [id*="bp-"]').forEach(el => el.remove());

    // Clean up any iframes that might have been created
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src && iframe.src.includes('botpress')) {
        iframe.remove();
      }
    });
  }

  // Function to load Botpress only when needed
  function handleBotpressVisibility() {
    const currentPath = window.location.pathname;
    const isLandingPage = landingPagePaths.includes(currentPath);

    if (isLandingPage) {
      if (!document.getElementById('bp-web-widget-container')) {
        // First load the inject.js if not already loaded
        if (!document.getElementById('botpress-inject')) {
          const injectScript = document.createElement('script');
          injectScript.id = 'botpress-inject';
          injectScript.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
          injectScript.onload = function () {
            injectScriptLoaded = true;
            // Now load the configuration script
            const configScript = document.createElement('script');
            configScript.id = 'botpress-script';
            configScript.src = "https://files.bpcontent.cloud/2025/04/28/08/20250428083729-QJ9151LC.js";
            document.body.appendChild(configScript);
          };
          document.body.appendChild(injectScript);
        } else if (injectScriptLoaded) {
          // If inject is already loaded, just add the config script
          const configScript = document.createElement('script');
          configScript.id = 'botpress-script';
          configScript.src = "https://files.bpcontent.cloud/2025/04/28/08/20250428083729-QJ9151LC.js";
          document.body.appendChild(configScript);
        }
      }
    } else {
      removeAllBotpressElements();
    }
  }

  // Check if we should force reload based on current path
  function shouldForceReload(path) {
    return authPaths.some(authPath => path.startsWith(authPath));
  }

  // Initial check
  document.addEventListener('DOMContentLoaded', handleBotpressVisibility);

  // Monitor route changes in single-page app
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      const currentPath = new URL(url).pathname;

      // Check if we're navigating to an auth page from a landing page
      if (shouldForceReload(currentPath) && landingPagePaths.includes(new URL(lastUrl).pathname)) {
        // Store current URL in sessionStorage
        sessionStorage.setItem('redirectAfterReload', url);
        // Force page reload to completely remove Botpress
        window.location.reload();
        return;
      }

      lastUrl = url;
      // When URL changes, do a more aggressive cleanup
      removeAllBotpressElements();
      // Then check if we should reload Botpress
      setTimeout(handleBotpressVisibility, 100);
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  // Handle redirect after reload
  if (sessionStorage.getItem('redirectAfterReload')) {
    const redirectUrl = sessionStorage.getItem('redirectAfterReload');
    sessionStorage.removeItem('redirectAfterReload');
    // Only redirect if we're not already at the desired URL
    if (window.location.href !== redirectUrl) {
      window.history.replaceState({}, '', redirectUrl);
    }
  }
};
