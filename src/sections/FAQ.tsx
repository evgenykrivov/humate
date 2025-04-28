import React, { useState } from 'react';

type FAQItem = {
  id: number;
  question: string;
  answer: React.ReactNode;
};

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What is Chat & Ask AI, and how can it benefit me?',
    answer: (
      <div>
        <p className="mb-3">
          Chat & Ask AI is an advanced artificial intelligence tool that helps solve various tasks
          through natural dialogues.
        </p>
        <p className="mb-3">
          <strong>Benefits:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Instant answers to your questions in an understandable format</li>
          <li>Assistance in content creation, writing texts, and generating ideas</li>
          <li>Personal assistant available 24/7 through a convenient chat interface</li>
          <li>Access to modern AI models, including GPT-4o, DeepSeek, and Gemini</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    question: 'Can I use Chat & Ask AI for free?',
    answer: (
      <div>
        <p className="mb-3">
          Yes, you can use the basic version of Chat & Ask AI completely free. The free plan
          includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access to the basic chat interface</li>
          <li>Limited number of requests per day</li>
          <li>Core text interaction features</li>
        </ul>
        <p className="mt-3">
          For access to enhanced capabilities, increased limits, and premium features, we recommend
          considering our Premium plan.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    question: 'What is the difference between Free and Premium version?',
    answer: (
      <div>
        <p className="mb-3">
          <strong>Free version:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Basic access to the chat interface</li>
          <li>Limited number of requests</li>
          <li>Standard processing speed</li>
          <li>Basic AI functions</li>
        </ul>
        <p className="mb-3">
          <strong>Premium version:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Unlimited number of requests</li>
          <li>Access to advanced AI models (GPT-4o, DeepSeek-R1, Gemini Pro)</li>
          <li>Priority and faster request processing</li>
          <li>WhatsApp integration</li>
          <li>No advertisements</li>
          <li>Access to elite AI tools</li>
          <li>Personal assistant with enhanced capabilities</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    question: 'What are the Elite Tools?',
    answer: (
      <div>
        <p className="mb-3">
          Elite Tools is a set of specialized AI tools available only to Premium users:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Advanced Content Creator</strong> — create professional texts, articles, and
            presentations using AI
          </li>
          <li>
            <strong>Image Generator</strong> — generate unique images based on text descriptions
          </li>
          <li>
            <strong>Code Assistant</strong> — get help with writing and debugging code in various
            programming languages
          </li>
          <li>
            <strong>Data Analyzer</strong> — analyze data and get insights using AI
          </li>
          <li>
            <strong>Voice Interaction</strong> — communicate with AI by voice and receive voice
            responses
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 5,
    question: 'Can I integrate Chat & Ask AI as an AI Assistant into WhatsApp?',
    answer: (
      <div>
        <p className="mb-3">
          Yes, Premium users have exclusive access to Chat & Ask AI integration with WhatsApp. This
          allows you to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the AI assistant directly in the familiar WhatsApp interface</li>
          <li>Get instant responses through the messenger</li>
          <li>Process requests in the background</li>
          <li>Have a personal AI assistant in your contact list</li>
        </ul>
        <p className="mt-3">
          Integration is simple and requires no technical knowledge — just link your account to
          WhatsApp in your profile settings.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    question: 'How can I get started with Chat & Ask AI?',
    answer: (
      <div>
        <p className="mb-3">Getting started with Chat & Ask AI is very simple:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Register on our website by creating a free account</li>
          <li>Verify your email</li>
          <li>Log in and start communicating with AI through the chat interface</li>
          <li>Explore the possibilities and various interaction modes</li>
          <li>If you want to get enhanced functionality, subscribe to the Premium plan</li>
        </ol>
        <p className="mt-3">
          Our video tutorials and knowledge base will help you make the most effective use of all
          Chat & Ask AI capabilities.
        </p>
      </div>
    ),
  },
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
              style={{
                boxShadow:
                  activeIndex === item.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.05)' : 'none',
              }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleAccordion(item.id)}
              >
                <span className="font-medium text-xl">{item.question}</span>
                <div
                  className={`min-w-8 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
                    activeIndex === item.id ? 'rotate-180 bg-[#e0e7ff]' : ''
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      activeIndex === item.id ? 'text-[#6366f1]' : 'text-gray-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: activeIndex === item.id ? '1000px' : '0',
                  opacity: activeIndex === item.id ? 1 : 0,
                }}
              >
                <div className="p-6 pt-0 text-gray-600">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
