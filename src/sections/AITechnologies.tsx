import React, { useState, useRef, useEffect } from 'react';

type AIModel = {
  id: string;
  title: string;
  description: string;
};

const aiModels: AIModel[] = [
  {
    id: 'gpt45',
    title: 'GPT 4.5',
    description:
      'Brings a new era of AI capabilities, with GPT-4.5 offering improved efficiency, deeper contextual understanding, and faster response times. As one of the latest advancements, it redefines chatbot interactions for complex queries.',
  },
  {
    id: 'grok',
    title: 'Grok',
    description:
      'Powered by Grok 2 and Grok 3, this AI system is built for rapid learning and insightful responses. With a focus on adaptability and real-time processing, it refines chatbot interactions for smarter, more dynamic conversations.',
  },
  {
    id: 'gpt4o-mini',
    title: 'GPT-4o Mini',
    description:
      'GPT-4o mini offers a faster and more lightweight chatbot experience than GPT-4o, balancing efficiency and accuracy. Built for quick responses, it ensures smooth interactions with lower processing needs.',
  },
  {
    id: 'gemini',
    title: 'Gemini',
    description:
      'Gemini 2.0, Gemini Flash, and Gemini Pro Experimental push AI capabilities further, delivering unmatched speed, reasoning, and adaptability. Built for efficiency, they enhance chatbot interactions across diverse use cases.',
  },
  {
    id: 'gpt4o',
    title: 'GPT-4o',
    description:
      'Developed on GPT-4o, this advanced AI model enhances chatbot interactions with superior reasoning, fluency, and contextual accuracy. It delivers real-time responses, making conversations more dynamic and intuitive.',
  },
  {
    id: 'deepseek',
    title: 'DeepSeek',
    description:
      'DeepSeek R1 and DeepSeek V3 push AI boundaries with advanced language processing and deep reasoning. Optimized for efficiency and accuracy, they enhance chatbot interactions with faster, more context-aware responses.',
  },
];

export const AITechnologies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Определяем количество слайдов для показа в зависимости от ширины экрана
  const slidesToShow = isMobile ? 1 : 3;
  const totalSlides = aiModels.length;
  const maxIndex = totalSlides - slidesToShow;

  // Обработчик изменения размера окна для определения мобильного режима
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Инициализация при монтировании
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (isAnimating || activeIndex >= maxIndex) return;

    setIsAnimating(true);
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    if (isAnimating || activeIndex <= 0) return;

    setIsAnimating(true);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  // Добавляем поддержку свайпов для мобильных устройств
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Свайп влево - следующий слайд
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      // Свайп вправо - предыдущий слайд
      handlePrev();
    }
  };

  // Сброс состояния анимации
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Длительность transition в CSS
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <section className="py-20 bg-[var(--bg-gradient-gray)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <div className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] text-sm font-medium mb-4">
            AI TECHNOLOGY
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Built on the latest{' '}
          <span className="text-[var(--color-primary)]">AI technologies &amp; LLM&apos;s</span>
        </h2>
        <p className="text-lg text-[var(--color-gray-600)] text-center max-w-3xl mx-auto mb-16">
          Connect your tools, connect your teams. With over 100 apps already available in our
          directory, your team&apos;s favourite tools are just a click away.
        </p>

        <div className="relative">
          <div className="text-center mb-14">
            <div className="relative inline-block">
              <div className="text-xl font-semibold">Developed On</div>
              <div className="absolute w-full h-[200px] top-full left-0 pointer-events-none">
                <div className="w-[400px] h-[200px] mx-auto relative">
                  <div className="absolute inset-0 border-t-2 border-l-2 border-r-2 border-[var(--color-primary-100)] border-opacity-50 rounded-t-3xl"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden mx-auto"
            style={{ maxWidth: '1200px' }}
          >
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(-${(activeIndex * 100) / (isMobile ? 1 : 3)}%)`,
              }}
            >
              {aiModels.map((model) => (
                <div
                  key={model.id}
                  className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/3'} px-3`}
                  style={{ transition: 'all 0.5s ease' }}
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-[#f3f4f6] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] hover:border-[#e0e7ff] h-full">
                    <div className="mb-4 flex justify-center">
                      <div className="w-12 h-12 bg-[#eef2ff] rounded-full flex items-center justify-center text-[#6366f1]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2 text-[#1f2937]">
                      {model.title}
                    </h3>
                    <p className="text-[#4b5563] text-center">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handlePrev}
              disabled={activeIndex <= 0}
              className={`p-2 mx-2 rounded-full border transition-all duration-300 ${
                activeIndex <= 0
                  ? 'text-[#d1d5db] border-[#e5e7eb] cursor-not-allowed'
                  : 'text-[#6366f1] border-[#e0e7ff] hover:bg-[#eef2ff] hover:shadow-md'
              }`}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex >= maxIndex}
              className={`p-2 mx-2 rounded-full border transition-all duration-300 ${
                activeIndex >= maxIndex
                  ? 'text-[#d1d5db] border-[#e5e7eb] cursor-not-allowed'
                  : 'text-[#6366f1] border-[#e0e7ff] hover:bg-[#eef2ff] hover:shadow-md'
              }`}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
