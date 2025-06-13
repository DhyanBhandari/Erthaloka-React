// src/components/SubscriptionTeaserSection.tsx
import React from 'react';
import { ArrowRight, Sparkles, Crown, Star, Leaf } from 'lucide-react';

interface SubscriptionTeaserSectionProps {
  setCurrentPath: (path: string) => void;
}

const SubscriptionTeaserSection: React.FC<SubscriptionTeaserSectionProps> = ({ setCurrentPath }) => {
  const plans = [
    {
      name: 'Resident',
    
      description: 'Start your regenerative journey',
      icon: <Leaf className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600',
      highlights: ['Co-living spaces', 'Community events', 'Sustainability training']
    },
    {
      name: 'Ambassador',
     
      description: 'Lead sustainable communities',
      icon: <Star className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-600',
      highlights: ['Leadership programs', 'Mentorship access', 'Project collaboration'],
      popular: true
    },
    {
      name: 'Warrior',
      
      description: 'Shape the regenerative future',
      icon: <Crown className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-600',
      highlights: ['Global access', 'Founder mentorship', 'Equity opportunities']
    }
  ];

  return (
    <section id="join-ecoverse" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-12 border border-green-500/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 relative overflow-hidden">
          
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Join the EcoVerse
                </h2>
                <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Choose your level of impact in the regenerative revolution. From conscious living to global leadership, 
                we have the perfect path for your journey.
              </p>
            </div>

            {/* Plans Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative bg-black/60 backdrop-blur-md rounded-xl p-6 border transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
                    plan.popular ? 'border-blue-500/50 shadow-blue-500/20' : 'border-gray-700/50'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-3">
                     
                    
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    
                    <div className="space-y-2">
                      {plan.highlights.map((highlight, idx) => (
                        <div key={idx} className="text-xs text-gray-300 bg-gray-800/50 rounded-full px-3 py-1">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="mb-8">
                <p className="text-lg text-gray-300 mb-2">
                  🌱 Join <span className="text-green-400 font-bold">500+</span> regenerative pioneers already transforming the world
                </p>
                <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    ✅ 30-day money-back guarantee
                  </span>
                  <span className="flex items-center gap-2">
                    ✅ Cancel anytime
                  </span>
                  <span className="flex items-center gap-2">
                    ✅ Global community access
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setCurrentPath('/subscription-plans')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-green-500/50 flex items-center gap-3"
                >
                  Explore EcoVerse Plans
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => {
                    // Scroll to contact section or open WhatsApp
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105"
                >
                  Book a Discovery Call
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  💡 <strong>Free 7-day trial</strong> available for all plans • No setup fees • Secure payments via Razorpay
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400">500+</div>
                <div className="text-sm text-gray-400">Active Members</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-400">15+</div>
                <div className="text-sm text-gray-400">Eco Spaces</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Impact Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-400">25+</div>
                <div className="text-sm text-gray-400">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTeaserSection;