import React from 'react';
import { Leaf } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      {/* Inject custom styles */}
      <style>{`
  @keyframes drop-bounce {
    0%   { transform: translateY(-200%); opacity: 0; }
    60%  { transform: translateY(20%); opacity: 1; }
    80%  { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(0); opacity: 1; }
  }

  .animate-drop-bounce {
    animation: drop-bounce 0.8s ease-out 0.3s forwards;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .spin-slow {
    animation: spin-slow 6s linear infinite;
  }
`}</style>



      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full text-center relative z-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in drop-shadow-2xl">
          A Tech-Powered Co-ExIStic ECOverse
        </h1>

        <p className="text-lg md:text-xl text-white mb-2 animate-fade-in delay-300 drop-shadow-lg max-w-2xl">
          A regenerative ecosystem for People, Planet & Purpose — driven by communities and enabled by technology.
        </p>

        <p className="text-md md:text-lg text-green-100 mb-8 italic tracking-wide animate-fade-in delay-500 max-w-xl">
          Empowering Earth’s future through conscious tech & communities.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Smooth scroll button */}
          <button
            onClick={() => {
              const ecosystemSection = document.getElementById('ecosystem');
              if (ecosystemSection) {
                ecosystemSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xl hover:shadow-green-500/50"
            aria-label="Explore the Erthaloka Ecosystem"
          >
            Explore the ECOsystem
          </button>

          {/* External community button with drop + bounce + spin */}
          <button
  onClick={() =>
    window.open(
      'https://ertha-coin-governance-hub.vercel.app/',
      '_blank',
      'noopener,noreferrer'
    )
  }
  className="flex items-center gap-2 bg-white text-green-700 text-base md:text-lg font-medium px-6 py-3 rounded-full border border-green-300 shadow-md hover:shadow-lg hover:bg-green-50 hover:text-green-800 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 animate-drop-bounce"
  aria-label="Join the Erthaloka Community"
>
  <span className="text-xl spin-slow">🌍</span>
  Join the Community
</button>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
