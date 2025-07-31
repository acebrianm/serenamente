import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = React.memo(() => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>('');

  useEffect(() => {
    // Only scroll if the pathname actually changed
    if (prevPathnameRef.current !== pathname) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        try {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto', // Use auto for instant scroll without animation
          });
        } catch (_error) {
          // Fallback for older browsers
          window.scrollTo(0, 0);
        }
      });

      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null; // This component doesn't render anything
});

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;
