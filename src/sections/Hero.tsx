import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'components/Button';
import { scrollToCTA } from 'services/scrollService';

// Data for different features
const features = [
  {
    id: 'search',
    title: 'AI Search Engine',
    description: 'Intelligent search that understands your queries and finds exactly what you need',
    icon: '🔍',
  },
  {
    id: 'image',
    title: 'AI Image Generator',
    description: 'Create unique images based on text descriptions',

    icon: '🎨',
  },
  {
    id: 'link',
    title: 'AI Link Analyzer',
    description: 'Analyze and check links for safety and relevance',

    icon: '🔗',
  },
  {
    id: 'pdf',
    title: 'AI Chat PDF',
    description: 'Interact with your PDF documents through a convenient chat interface',

    icon: '📄',
  },
  {
    id: 'youtube',
    title: 'AI Youtube Video Summarizer',
    description: 'Get concise and informative summaries of YouTube videos',

    icon: '📹',
  },
];

// Component for animated content
const AnimatedContent = ({
  content,
  isAnimating,
}: {
  content: (typeof features)[0];
  isAnimating: boolean;
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isAnimating
          ? 'opacity-0 blur-md transform scale-95'
          : 'opacity-100 blur-0 transform scale-100'
      }`}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-gray-900)] mb-6">
        {content.title}
      </h1>
      <p className="text-lg md:text-xl text-[var(--color-gray-600)] max-w-3xl mx-auto mb-8">
        {content.description}
      </p>
    </div>
  );
};

export const Hero: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleContent, setVisibleContent] = useState(features[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(true);
  const autoCycleIntervalRef = useRef<number | null>(null);

  // New ref for measuring next content, without affecting the DOM
  const nextContentRef = useRef<HTMLDivElement>(null);
  const [nextContent, setNextContent] = useState<(typeof features)[0] | null>(null);

  const handlePrimaryAction = () => {
    console.log('Primary Action');
    scrollToCTA();
  };

  const handleSecondaryAction = () => {
    console.log('Secondary Action');
    scrollToCTA();
  };

  useEffect(() => {
    if (activeFeature !== undefined) {
      // Prepare next content for measurement
      setNextContent(features[activeFeature]);
    }
  }, [activeFeature]);

  // Effect for measuring height of next content
  useEffect(() => {
    if (nextContent && nextContentRef.current) {
      // Now we have nextContent and can start animation
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

  // Auto cycle through features
  useEffect(() => {
    if (autoCycleEnabled && !isAnimating) {
      autoCycleIntervalRef.current = setInterval(() => {
        const nextFeatureIndex = (activeFeature + 1) % features.length;
        setActiveFeature(nextFeatureIndex);
      }, 20000); // Change every 3 seconds
    }

    return () => {
      if (autoCycleIntervalRef.current) {
        clearInterval(autoCycleIntervalRef.current);
      }
    };
  }, [activeFeature, autoCycleEnabled, isAnimating]);

  const handleFeatureChange = (index: number) => {
    if (index !== activeFeature && !isAnimating) {
      // Temporarily pause auto cycling when user manually selects a feature
      setAutoCycleEnabled(false);
      setActiveFeature(index);

      // Resume auto cycling after a short delay
      setTimeout(() => {
        setAutoCycleEnabled(true);
      }, 5000); // Resume after 5 seconds of inactivity
    }
  };

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-[var(--bg-gradient-primary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature toggle buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureChange(index)}
              className={`py-2 px-5 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeFeature === index
                  ? 'btn-gradient-animated primary text-white shadow-md'
                  : 'bg-white text-[#374151] border border-[#e5e7eb] hover:bg-[#f9fafb] hover:border-[#6366f1] hover:text-[#6366f1] hover:shadow-sm active:bg-[#f9fafb] active:border-[#6366f1] active:text-[#6366f1] active:shadow-sm'
              }`}
            >
              <span>{feature.icon}</span>
              <span>{feature.title}</span>
            </button>
          ))}
        </div>

        <div className="text-center">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={handlePrimaryAction} animatedGradient>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={handleSecondaryAction}>
              Learn More
            </Button>
          </div>
          <div className="mt-12 lg:mt-16 h-64 md:h-80 lg:h-96 max-w-4xl mx-auto">
            <img src="/hero.png" alt="Hero" className="w-full h-full object-contain rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};
