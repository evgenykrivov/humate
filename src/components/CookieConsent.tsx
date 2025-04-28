import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface CookieConsentProps {
  // Optional props for customization if needed
  privacyPolicyUrl?: string;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  privacyPolicyUrl = '/privacy-policy',
}) => {
  // State for displaying the popup
  const [visible, setVisible] = useState(false);
  // State for exit animation
  const [isExiting, setIsExiting] = useState(false);

  // Check localStorage when component mounts
  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      // Small delay before showing for better UX
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Function for smooth hiding animation
  const hideWithAnimation = () => {
    setIsExiting(true);

    // Wait for animation to complete before performing the action
    setTimeout(() => {
      localStorage.setItem('cookieAccepted', 'true');
      setIsExiting(false);
      setVisible(false);
    }, 400); // Animation duration
  };

  // If popup is not visible, don't render it
  if (!visible) return null;

  // Animation classes
  const animationClasses = isExiting
    ? 'transform translate-y-full opacity-0'
    : 'transform translate-y-0 opacity-100';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out ${animationClasses}`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">We use cookies 🍪</h3>
            <p className="text-gray-600 text-base md:text-lg pr-0 md:pr-8">
              Our website uses cookies to improve your experience and provide personalized content.
              By continuing to use our site, you agree to our{' '}
              <a
                href={privacyPolicyUrl}
                className="text-[var(--color-primary)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <Button
              variant="primary"
              size="lg"
              onClick={hideWithAnimation}
              animatedGradient
              className="min-w-[140px] text-base font-medium px-8 py-3 shadow-lg"
            >
              Got it!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
