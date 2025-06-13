// src/pages/SubscriptionPlansPage.tsx
import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Shield, Users, Leaf, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import AuthModal from '../components/AuthModal.tsx';

interface Plan {
  id: 'resident' | 'ambassador' | 'warrior';
  name: string;
  price: number;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  popular?: boolean;
  features: string[];
  exclusiveFeatures: string[];
}

const SubscriptionPlansPage: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plans: Plan[] = [
    {
      id: 'resident',
      name: 'EcoVerse Resident',
      price: 999,
      duration: 'month',
      description: 'Perfect for individuals starting their regenerative journey',
      icon: <Leaf className="w-8 h-8" />,
      color: 'text-green-400',
      gradient: 'from-green-500 to-emerald-600',
      features: [
        'Access to ErthaGrama spaces',
        'Basic co-living amenities',
        'Community events participation',
        'Sustainable living workshops',
        'Digital wellness resources',
        'Basic ErthaCANnect networking',
        'ErthaBazaar member discounts',
        'Monthly regenerative circles'
      ],
      exclusiveFeatures: [
        '24/7 space access',
        'Personal sustainability tracker'
      ]
    },
    {
      id: 'ambassador',
      name: 'EcoVerse Ambassador',
      price: 1999,
      duration: 'month',
      description: 'For change-makers ready to lead sustainable communities',
      icon: <Star className="w-8 h-8" />,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-600',
      popular: true,
      features: [
        'All Resident benefits',
        'Priority booking for spaces',
        'Leadership training programs',
        'Community organizing tools',
        'Advanced ErthaCANnect features',
        'Mentorship opportunities',
        'Project collaboration access',
        'Monthly impact reports',
        'Exclusive ambassador events',
        'Startup incubation support'
      ],
      exclusiveFeatures: [
        'Host community events',
        'Ambassador badge & recognition',
        'Monthly strategy sessions'
      ]
    },
    {
      id: 'warrior',
      name: 'EcoVerse Warrior',
      price: 4999,
      duration: 'month',
      description: 'For visionaries creating the regenerative future',
      icon: <Crown className="w-8 h-8" />,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-600',
      features: [
        'All Ambassador benefits',
        'Unlimited space access globally',
        'Private consultation sessions',
        'Investment opportunity access',
        'Direct founder mentorship',
        'Custom project development',
        'Global network connections',
        'Speaking opportunities',
        'Annual retreat participation',
        'Equity participation options',
        'White-label solutions',
        'Enterprise partnerships'
      ],
      exclusiveFeatures: [
        'Global space access',
        'Direct founder access',
        'Equity participation',
        'Custom solutions development'
      ]
    }
  ];

  const handlePlanSelection = async (planId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSelectedPlan(planId);
    setLoading(true);

    try {
      // Initialize Razorpay payment
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/subscriptions/create-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const orderData = await response.json();

      if (response.ok) {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => initializeRazorpay(orderData);
        document.body.appendChild(script);
      } else {
        throw new Error(orderData.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const initializeRazorpay = (orderData: any) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'ErthaLoka',
      description: `${plans.find(p => p.id === selectedPlan)?.name} Subscription`,
      order_id: orderData.id,
      handler: function (response: any) {
        verifyPayment(response);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: {
        color: '#22c55e',
      },
      modal: {
        ondismiss: function () {
          setSelectedPlan(null);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (paymentResponse: any) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/subscriptions/verify-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentResponse,
          planId: selectedPlan,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Subscription activated successfully! Welcome to ErthaLoka!');
        // Refresh user data or redirect to dashboard
        window.location.reload();
      } else {
        throw new Error(result.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 text-white relative z-10">
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Join the EcoVerse
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Choose your path in the regenerative revolution. From conscious living to global leadership, 
              find the plan that matches your impact ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-black/60 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-blue-500/50 shadow-blue-500/20' 
                    : 'border-gray-700/50'
                } hover:shadow-2xl group`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold ${plan.color} mb-2`}>{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                    <span className="text-gray-400">/{plan.duration}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-white">What's included:</h4>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.exclusiveFeatures.length > 0 && (
                  <div className="space-y-4 mb-8 pt-6 border-t border-gray-700">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Exclusive Features:
                    </h4>
                    {plan.exclusiveFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Crown className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-yellow-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handlePlanSelection(plan.id)}
                  disabled={loading && selectedPlan === plan.id}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${plan.gradient} hover:shadow-2xl`}
                >
                  {loading && selectedPlan === plan.id ? (
                    'Processing...'
                  ) : user?.subscriptionPlan === plan.id ? (
                    'Current Plan'
                  ) : (
                    <>
                      Choose {plan.name}
                      <ArrowRight className="inline w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Choose ErthaLoka?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Global Community</h3>
                <p className="text-gray-400">Connect with regenerative pioneers across multiple continents and bioregions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Mentorship</h3>
                <p className="text-gray-400">Learn from successful entrepreneurs, sustainability experts, and impact investors.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Proven Framework</h3>
                <p className="text-gray-400">Systematic approach to building regenerative ventures with measurable impact.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-gray-400">Yes, you can change your plan at any time. Upgrades are effective immediately, while downgrades take effect at the next billing cycle.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400">We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure Razorpay integration.</p>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial available?</h3>
                <p className="text-gray-400">We offer a 7-day free trial for the Resident plan to help you experience the ErthaLoka community before committing.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-400">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="register"
      />
    </div>
  );
};

export default SubscriptionPlansPage;