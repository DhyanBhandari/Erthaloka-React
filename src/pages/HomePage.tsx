import React from 'react';
import HeroSection from '../components/HeroSection.tsx';
import AboutErthaLokaSection from '../components/AboutErthaLokaSection.tsx';

import WhatWeDoSection from '../components/WhatWeDo.tsx';
import ErthalokaEcosystemSection from '../components/ErthalokaEcosystemSection.tsx';
import SubscriptionTeaserSection from '../components/SubscriptionTeaserSection.tsx';
import UpcomingSection from '../components/UpcomingSection.tsx';
import SustainableTechInnovationsSection from '../components/SustainableTechInnovations.tsx';
import GetInvolvedSection from '../components/GetInvolvedSection.tsx';
//import TeamSection from '../components/TeamSection.tsx';
import GetInTouchSection from '../components/GetInTouch.tsx';

interface HomePageProps {
  setCurrentPath: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPath }) => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutErthaLokaSection />
    
      <WhatWeDoSection />
      <ErthalokaEcosystemSection setCurrentPath={setCurrentPath} />
      <UpcomingSection setCurrentPath={setCurrentPath} />
      <SustainableTechInnovationsSection />
      <SubscriptionTeaserSection setCurrentPath={setCurrentPath} />
      <GetInvolvedSection />
      <GetInTouchSection />
    </div>
  );
};

export default HomePage;