import * as React from 'react';
import {   useState, useEffect   } from 'react';
import { Button } from 'components/Button';

export const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  // Эффект для анимации точек во время загрузки
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 400);

      return () => clearInterval(interval);
    } else {
      setLoadingDots('');
    }
  }, [isLoading]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const simulateSubmission = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2500); // 2.5 секунды задержки
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email validation error: Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      // Имитация отправки данных
      await simulateSubmission();
      console.log('Email submitted:', email);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 md:py-20 lg:py-24 bg-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Leave your email, and we&apos;ll contact you as soon as we&apos;re ready to launch.
        </p>

        {!isSubmitted ? (
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
              <div className="flex-grow relative">
                <div
                  className={`relative transition-all duration-300 ${
                    isFocused ? 'shadow-lg shadow-blue-400/20' : ''
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Your email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-5 py-3.5 rounded-lg bg-white/10 backdrop-blur-sm text-white border-2 ${
                      errorMessage
                        ? 'border-red-300/50 focus:border-red-300'
                        : isFocused
                        ? 'border-white/50 focus:border-white'
                        : 'border-white/30 hover:border-white/40'
                    } focus:outline-none focus:ring-0 transition-all duration-300 placeholder-white/70 text-left`}
                    aria-label="Email address"
                    disabled={isLoading}
                  />
                </div>
                {errorMessage && (
                  <div className="text-left mt-2 flex items-start">
                    <svg
                      className="h-5 w-5 text-yellow-200 mr-1 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-yellow-200 text-sm">{errorMessage}</p>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className={`h-max bg-white/90 text-blue-600 hover:bg-white border-transparent shadow-md hover:shadow-lg transition-all duration-300 min-w-[120px] ${
                  isLoading ? 'opacity-90 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <div className="relative inline-flex items-center justify-center">
                  <span>Subscribe</span>
                  {isLoading && (
                    <span className="relative ml-1 inline-block w-[30px] text-left overflow-hidden">
                      {loadingDots}
                    </span>
                  )}
                </div>
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-md mx-auto mb-8 shadow-lg shadow-blue-700/20">
            <svg
              className="w-12 h-12 text-green-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Thank You for Your Interest!</h3>
            <p className="text-blue-100">
              We&apos;ve added your email to the waiting list and will contact you upon launch.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
