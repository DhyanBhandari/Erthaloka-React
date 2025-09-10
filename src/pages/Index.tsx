import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CommunityStats from "@/components/CommunityStats";
import Ecosystem from "@/components/Ecosystem";
import Innovation from "@/components/Innovation";
import BackedBy from "@/components/BackedBy";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Ecosystem />
        <Innovation />
        <BackedBy />
        <Partners />
        <CommunityStats />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
