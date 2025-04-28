import React from 'react';
import { scrollToCTA } from 'services/scrollService';

export const PricingPlans: React.FC = () => {
  const handleFreePlanClick = () => {
    console.log('Free plan clicked');
    scrollToCTA();
  };

  const handlePremiumPlanClick = () => {
    console.log('Premium plan clicked');
    scrollToCTA();
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#6366f1]">A perfect fit</span> for everyone
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the full potential of Chat & Ask AI with Premium—exclusive tools, AI advanced
            features, and unmatched performance await!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L9 7L4 8L8 12L7 17L12 15L17 17L16 12L20 8L15 7L12 2Z"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Free Membership</h3>
            <p className="text-gray-600 text-center mb-6">
              Unlock essential features and experience the potential of AI. Sign up today to enjoy
              basic account access and get a glimpse of our premium features.
            </p>

            <div className="mt-auto">
              <button
                className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 active:bg-gray-200 transition-all hover:shadow-lg hover:translate-y-[-1px] active:shadow-lg active:translate-y-[-1px]"
                onClick={handleFreePlanClick}
              >
                Join For Free!
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex-1 bg-white p-8 rounded-2xl border border-[#e0e7ff] shadow-md relative hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              Recommended
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L9 7L4 8L8 12L7 17L12 15L17 17L16 12L20 8L15 7L12 2Z"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Premium Membership</h3>
            <p className="text-gray-600 text-center mb-6">
              Upgrade to Premium Membership and tap into a world of exclusive benefits powered by
              AI. Gain full access to advanced features and access exclusive content.
            </p>

            <div className="mt-auto">
              <button
                className="w-full py-3 px-4 btn-gradient-animated primary text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]"
                onClick={handlePremiumPlanClick}
              >
                Unlock the Journey
              </button>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-20 max-w-5xl mx-auto bg-gray-50 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 bg-[#eef2ff]">
              <div className="mb-8">
                <p className="uppercase text-sm font-medium text-gray-600 mb-2">Features</p>
                <h3 className="text-4xl font-bold mb-2">Be better.</h3>
                <h3 className="text-4xl font-bold text-[#6366f1]">Be Pro.</h3>
              </div>
            </div>

            <div className="col-span-2 p-6">
              {/* Features List */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 items-center py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <span>Answers from Ask AI Chatbot</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                      {/* Free label aligned with checkmark */}
                      <span className="text-sm text-gray-700 font-medium mt-1">Free</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                      {/* PRO label aligned with checkmark */}
                      <span className="text-sm text-[#6366f1] font-medium mt-1">PRO</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <span>Access to GPT-4o, DeepSeek-R1, Gemini Pro & more</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span>Advanced AI Tools</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </div>
                    <span>No ads</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <span>Chat in WhatsApp</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center">
                        <svg
                          className="w-6 h-6 text-[#6366f1]"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
