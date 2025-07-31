import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = React.memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    const scrollToTop = () => {
      try {
        // Try modern scrollTo with options
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto', // Use auto for immediate scroll without animation
        });
      } catch (_error) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(scrollToTop);

    // Additional timeout as backup in case of any timing issues
    const timeoutId = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
});

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
