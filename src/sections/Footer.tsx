import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 bg-gray-800 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and description */}
          <div>
            <div className="text-white text-xl font-bold mb-4">Humate AI</div>
            <p className="text-gray-400 mb-4">
              Innovative AI-powered solutions for business and everyday tasks.
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  AI Assistants
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Data Processing
                </a>
              </li>
              <li>
                <a
                  href="#use-cases"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Content Generation
                </a>
              </li>
              <li>
                <a
                  href="#ai-technologies"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Analytics Solutions
                </a>
              </li>
              <li>
                <a
                  href="#pricing-plans"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  API Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#ai-technologies"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white active:text-white cursor-pointer transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Humate Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <a
                href="/docs/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer text-sm text-gray-400 hover:text-white active:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/docs/terms"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer text-sm text-gray-400 hover:text-white active:text-white transition-colors duration-300"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
