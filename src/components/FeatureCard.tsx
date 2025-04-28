import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div>
        <div className="mb-4 text-2xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-[#1f2937]">{title}</h3>
        <p className="text-[#4b5563] mb-4">{description}</p>
      </div>
      <div className="mt-auto pt-4">
        <button
          className="text-[#6366f1] font-medium inline-flex items-center bg-transparent border-none cursor-pointer p-0 transition-all duration-300 hover:text-[#4f46e5] hover:translate-x-[2px] group"
          onClick={() => console.log(`Learn more about ${title}`)}
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
