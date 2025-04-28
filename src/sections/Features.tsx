import React from 'react';
import { FeatureCard } from '../components/FeatureCard';

// Данные для функций
const featuresData = [
  {
    id: 'youtube',
    title: 'AI Youtube Video Summarizer',
    description:
      'Transform your video experience with the AI-powered video summarizer. Get detailed summaries, extract key information from any YouTube video.',
    icon: '📹',
  },
  {
    id: 'prompt',
    title: 'Prompt Library',
    description:
      'Easily save your AI prompts for later use. Tap into our prompt history for faster, smoother interactions with Ask AI.',
    icon: '📚',
  },
  {
    id: 'image',
    title: 'AI Image Generator',
    description:
      'Bring your ideas to life with our AI image generator. Quickly craft unique and stunning visuals with Chat & Ask AI.',
    icon: '🎨',
  },
  {
    id: 'summarize',
    title: 'Summarize Article',
    description:
      'Summarize any article with Chat & Ask AI and get precise answers. Quickly discover key points and instantly gain insights from lengthy articles.',
    icon: '📝',
  },
  {
    id: 'link',
    title: 'AI Link Analyzer',
    description:
      'Analyze links, get summaries, and answers from any webpage with Chat & Ask AI. Just paste a link to quickly get your insights and answers.',
    icon: '🔗',
  },
  {
    id: 'pdf',
    title: 'AI Chat PDF',
    description:
      'Seamlessly chat with document with Chat & Ask AI. Upload PDFs, Word, or Excel files to ask questions and get detailed answers quickly.',
    icon: '📄',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-[var(--color-gray-50)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-medium text-[#6366f1] bg-[#e0e7ff] rounded-full mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get <span className="text-[#6366f1]">more value</span> from AI tools
          </h2>
          <p className="text-lg text-[var(--color-gray-600)] max-w-3xl mx-auto">
            Achieve full potential, experience peak performance. Chat & Ask AI&apos;s unique
            features are here for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
