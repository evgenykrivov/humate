import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { scrollToCTA } from 'services/scrollService';
// Предполагаем, что у вас есть SVG логотип в assets
// import { ReactComponent as Logo } from 'assets/logo.svg';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Эффект для отслеживания скролла и добавления прозрачности
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Вызываем сразу для проверки начального положения
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Эффект для блокировки прокрутки body при открытом меню
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isMobileMenuOpen) {
        e.preventDefault();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      // Для iOS Safari
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
      document.removeEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobileMenuOpen]);

  // Эффект для установки высоты мобильного меню и предотвращения горизонтального скролла
  useEffect(() => {
    const updateMenuHeight = () => {
      if (mobileMenuRef.current) {
        mobileMenuRef.current.style.height = `calc(100vh - 64px)`;
      }
    };

    // Добавляем overflow-x: hidden к body чтобы предотвратить горизонтальный скролл
    document.body.style.overflowX = 'hidden';

    if (isMobileMenuOpen) {
      updateMenuHeight();
      window.addEventListener('resize', updateMenuHeight);
    }

    return () => {
      window.removeEventListener('resize', updateMenuHeight);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#use-cases', label: 'Use Cases' },
    { href: '#ai-technologies', label: 'AI Technologies' },
    { href: '#pricing-plans', label: 'Pricing' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogin = () => {
    console.log('Login clicked');
    // Прокручиваем страницу к блоку CTA
    scrollToCTA();
    // Закрываем мобильное меню если открыто
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // Прокручиваем страницу к блоку CTA
    scrollToCTA();
    // Закрываем мобильное меню если открыто
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Логотип */}
            <div className="flex-shrink-0">
              {/* Replace with your Logo component */}
              {/* <Logo className="h-8 w-auto" /> */}
              <a href="#hero" className="text-xl font-bold text-[var(--color-gray-900)]">
                Humate
              </a>
            </div>

            {/* Навигация (Десктоп) */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors"
                  onClick={handleNavLinkClick}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Кнопки (Десктоп) */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={handleSignUp} animatedGradient>
                Sign Up
              </Button>
            </div>

            {/* Кнопка бургер-меню (Мобильные) */}
            <div className="flex items-center md:hidden relative z-50">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-gray-400)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-500)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)]"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={handleToggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  {/* Иконка бургер-меню */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transition-transform duration-300 ${
                      isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  {/* Иконка крестика */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transition-transform duration-300 ${
                      isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню - вынесено за пределы хедера */}
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={handleToggleMobileMenu}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            handleToggleMobileMenu();
          }
        }}
        aria-label="Закрыть меню"
      />

      {/* Панель мобильного меню */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-16 right-0 w-4/5 sm:w-2/3 md:w-1/2 bottom-0 z-50 bg-white md:hidden transform transition-all duration-500 ease-in-out border-l border-gray-200 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-xl' : 'translate-x-[100vw]'
        }`}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        style={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="space-y-1 px-2 pt-4 pb-3 sm:px-3 flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-md px-4 py-3 text-base font-medium text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] hover:text-[var(--color-primary)]"
                onClick={handleNavLinkClick}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="border-t border-[var(--color-gray-200)] pt-4 pb-6 px-5 mt-auto">
            <div className="flex items-center sm:px-6">
              {/* Можно добавить информацию о пользователе здесь, если нужно */}
            </div>
            <div className="py-4 px-2">
              <Button variant="outline" size="sm" onClick={handleLogin} fullWidth className="mb-2">
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={handleSignUp} fullWidth animatedGradient>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
