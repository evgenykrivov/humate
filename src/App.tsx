import { Header, CookieConsent } from './components';
import {
  Hero,
  Features,
  UseCases,
  AITechnologies,
  CTA,
  Footer,
  PricingPlans,
  FAQ,
} from './sections';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div id="hero">
          <Hero />
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

      {/* Cookie Consent notification */}
      <CookieConsent />
    </div>
  );
}

export default App;
