import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Ramachandran KP',
      role: 'CEO & Founder',
      bioFront: 'Co-Founder @ Dream Holidays, Bengaluru | B.Com (F&A), MS Ramaiah College, Bengaluru',
      bioBack: "An experienced entrepreneur with a strong background in Finance & Accounting. Previously worked with Accenture, Tesco, and C-Cubed Solutions, bringing valuable corporate insight to Erthaloka's leadership.",
      image: '../images/new4.jpg',
      linkedin: '#',
      twitter: '#',
      email: '#',
    },
    {
      name: 'Preethi Shivakumar',
      role: 'CIO',
      bioFront: 'Impact @ Erthaa | Masters in Ecology & Life Science, Pondicherry University',
      bioBack: 'A passionate ecologist focused on sustainable solutions. Experience as Consultant at The Washing Machine Project and Project Manager at Prakti Cookstoves. Also works as a Menstrual Health Facilitator at Ecofemme.',
      image: '../images/preethi-shivakumar.jpg',
      linkedin: '#',
      twitter: '#',
      email: '#',
    },
    {
      name: 'Prapull T M',
      role: 'CDO',
      bioFront: 'Founder & CEO @ Arteco | B.Arch, Nitte School of Planning & Architecture, Bengaluru',
      bioBack: 'Dedicated to creating functional, aesthetic, and energy-efficient spaces that harmonize with nature. Tackles urban challenges through innovative sustainable design principles and operational excellence.',
      image: '../images/prapulla.jpg',
      linkedin: '#',
      twitter: '#',
      email: '#',
    },
    {
      name: 'N T Surya Prakash Bhandari',
      role: 'CTO',
      bioFront: 'CTO @ Arteco | Founder & CEO @ Xenveda | B.Tech, Dayananda Sagar University',
      bioBack: 'Tech innovator with expertise in Blockchain, AI/ML, AR/VR, and DevOps. Specializes in scaling applications and implementing cutting-edge solutions to drive technological advancement at Erthaloka.',
      image: '../images/surya.JPG',
      linkedin: '#',
      twitter: '#',
      email: '#',
    },
  ];

  return (
    <section id="erthalokaTeam" className="py-20  text-white relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 animate-fade-in">
          Meet the Visionaries Behind ErthaLoka
        </h2>
        <p className="text-lg text-white text-center mb-12 max-w-2xl mx-auto animate-fade-in delay-200">
          To truly understand ErthaLoka's vision, get to know the passionate individuals driving its mission.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl bg-black p-6 shadow-lg hover:shadow-purple-500 transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-purple-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-teal-300 mb-1">{member.name}</h3>
                <p className="text-purple-300 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs mb-3">{member.bioFront}</p>

                <div className="absolute inset-0 bg-gray-900 bg-opacity-95 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">{member.name}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed text-center mb-3">{member.bioBack}</p>
                  <div className="flex space-x-4">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">Twitter</a>
                    <a href={`mailto:${member.email}`} className="hover:text-red-400">Email</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
