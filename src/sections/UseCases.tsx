import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'components/Button';

// Data for different use cases
const useCases = [
  {
    id: 'business',
    title: 'Business Solutions',
    description: 'Optimize your business processes with AI-powered analytics and automation tools.',
    icon: '👔',
  },
  {
    id: 'education',
    title: 'Education Tools',
    description: 'Enhance learning experiences with personalized AI tutoring and resources.',
    icon: '🎓',
  },
  {
    id: 'personal',
    title: 'Personal Assistant',
    description: 'Simplify your daily tasks with an AI assistant that adapts to your needs.',
    icon: '👤',
  },
];

// Component for animated content
const AnimatedContent = ({
  content,
  isAnimating,
}: {
  content: (typeof useCases)[0];
  isAnimating: boolean;
}) => {
  return (
    <div
      className={`transition-all duration-500 ${
        isAnimating
          ? 'opacity-0 blur-md transform scale-95'
          : 'opacity-100 blur-0 transform scale-100'
      }`}
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-6">{content.title}</h3>
      <p className="text-gray-600 mb-8 text-lg">{content.description}</p>
      <div className="flex flex-wrap gap-4 mt-auto pb-2">
        <Button variant="primary" size="lg" animatedGradient>
          Start Using
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  );
};

// Type definitions
type CategoryId = 'business' | 'education' | 'personal';

export const UseCases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('business');
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleContent, setVisibleContent] = useState(useCases[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(true);
  const autoCycleIntervalRef = useRef<number | null>(null);

  // Reference for measuring next content without affecting DOM
  const nextContentRef = useRef<HTMLDivElement>(null);
  const [nextContent, setNextContent] = useState<(typeof useCases)[0] | null>(null);

  useEffect(() => {
    if (activeCategory) {
      // Prepare next content for measurement
      const content = useCases.find((useCase) => useCase.id === activeCategory);
      if (content) {
        setNextContent(content);
      }
    }
  }, [activeCategory]);

  // Effect for measuring height of next content
  useEffect(() => {
    if (nextContent && nextContentRef.current) {
      // Start animation
      setIsAnimating(true);

      // Fix current height before animation
      if (contentRef.current) {
        setContentHeight(`${contentRef.current.offsetHeight}px`);
      }

      // Measure height of next content (which is invisible)
      const nextHeight = nextContentRef.current.offsetHeight;

      // Animation for current content disappearing
      setTimeout(() => {
        // Set new height for the block
        setContentHeight(`${nextHeight}px`);

        // Change content
        setVisibleContent(nextContent);

        // Complete animation
        setTimeout(() => {
          setContentHeight('auto');
          setIsAnimating(false);
          setNextContent(null);
        }, 300);
      }, 300);
    }
  }, [nextContent]);

  // Auto cycle through categories
  useEffect(() => {
    if (autoCycleEnabled && !isAnimating) {
      autoCycleIntervalRef.current = setInterval(() => {
        const currentIndex = useCases.findIndex((cat) => cat.id === activeCategory);
        const nextIndex = (currentIndex + 1) % useCases.length;
        setActiveCategory(useCases[nextIndex].id as CategoryId);
      }, 20000); // Change every 20 seconds
    }

    return () => {
      if (autoCycleIntervalRef.current) {
        clearInterval(autoCycleIntervalRef.current);
      }
    };
  }, [activeCategory, autoCycleEnabled, isAnimating]);

  const handleCategoryChange = (categoryId: CategoryId) => {
    if (categoryId !== activeCategory && !isAnimating) {
      // Temporarily pause auto cycling when user manually selects a category
      setAutoCycleEnabled(false);
      setActiveCategory(categoryId);

      // Resume auto cycling after a short delay
      setTimeout(() => {
        setAutoCycleEnabled(true);
      }, 5000); // Resume after 5 seconds of inactivity
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#eef2ff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#e0e7ff] text-[#6366f1] text-sm font-medium mb-4">
            CHATS, PROMPTS AND AI POWER
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See what <span className="text-[#6366f1]">Chat & Ask AI</span> do for you.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            An all-in-one solution for a wide range of tasks. Translate languages, analyze data,
            create content, or plan your trips – Chat & Ask AI is here to assist you.
          </p>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id as CategoryId)}
              className={`py-2 px-4 rounded-full text-sm transition-all flex items-center gap-1 ${
                activeCategory === category.id
                  ? 'btn-gradient-animated primary text-white shadow-md'
                  : 'bg-white text-[#374151] border border-[#e5e7eb] hover:bg-[#f9fafb] hover:border-[#6366f1] hover:text-[#6366f1] active:bg-[#f9fafb] active:border-[#6366f1] active:text-[#6366f1]'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Selected category content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mx-auto max-w-5xl border border-gray-100">
          {/* Invisible block for measuring future content */}
          <div
            ref={nextContentRef}
            className="absolute opacity-0 pointer-events-none"
            style={{ visibility: 'hidden', zIndex: -1 }}
          >
            {nextContent && <AnimatedContent content={nextContent} isAnimating={false} />}
          </div>

          {/* Visible content block with animation */}
          <div
            ref={contentRef}
            className="transition-height overflow-hidden"
            style={{
              height: contentHeight,
              transitionProperty: 'height',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease',
            }}
          >
            <AnimatedContent content={visibleContent} isAnimating={isAnimating} />
          </div>
        </div>
      </div>
    </section>
  );
};
