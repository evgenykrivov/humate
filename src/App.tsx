import { Header, CookieConsent, Button, Modal, GoogleAuthForm } from './components';
import {
  Hero,
  Features,
  UseCases,
  AITechnologies,
  CTA,
  Footer,
  PricingPlans,
  FAQ,
  Pricing,
  Testimonials,
} from './sections';
import { useState } from 'react';
import { authService } from './services/authService';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div id="hero">
          <Hero />
          <div className="hidden">
            <Button
              label="Auth"
              onClick={() => {
                setIsModalOpen(true);
                authService.initialize();
              }}
            />
          </div>
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="use-cases">
          <UseCases />
        </div>
        <div id="ai-technologies">
          <AITechnologies />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <CTA />
        </div>
        <div id="pricing-plans">
          <PricingPlans />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />

      <CookieConsent />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GoogleAuthForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
