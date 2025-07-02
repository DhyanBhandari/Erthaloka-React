import React, { useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection.tsx';
import AboutErthaLokaSection from '../components/AboutErthaLokaSection.tsx';
import WhatWeDoSection from '../components/WhatWeDo.tsx';
import ErthalokaEcosystemSection from '../components/ErthalokaEcosystemSection.tsx';
import SustainableTechInnovationsSection from '../components/SustainableTechInnovations.tsx';
import GetInvolvedSection from '../components/GetInvolvedSection.tsx';
import GetInTouchSection from '../components/GetInTouch.tsx';

interface HomePageProps {
  setCurrentPath: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPath }) => {
  const getInTouchRef = useRef<HTMLDivElement>(null);
  const requestDeckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).scrollToGetInTouch = () => {
      getInTouchRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    (window as any).scrollToRequestDeck = () => {
      requestDeckRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <GetInvolvedSection />
      <AboutErthaLokaSection />
      <WhatWeDoSection />
      <ErthalokaEcosystemSection setCurrentPath={setCurrentPath} />
      <SustainableTechInnovationsSection />

      {/* Request Deck Section (Target for Scroll) */}
      <div ref={requestDeckRef} className="pt-32 pb-20 text-center text-white text-2xl font-semibold">
    
      </div>

      {/* Get In Touch Section (Target for Scroll) */}
      <div ref={getInTouchRef}>
        <GetInTouchSection />
      </div>
    </div>
  );
};

export default HomePage;
