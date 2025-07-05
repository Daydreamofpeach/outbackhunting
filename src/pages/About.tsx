import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Award, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

interface AboutProps {
  darkMode: boolean;
}

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: 'Mike Thompson',
    title: 'Founder & Lead Guide',
    description: 'With over 25 years of hunting experience across New Zealand, Mike founded Outback Hunting New Zealand in 2005. His passion for conservation and ethical hunting practices has established our reputation for excellence.',
    image: '/assets/img/profile/profile1.png'
  },
  {
    name: 'Sarah Wilson',
    title: 'Operations Manager',
    description: 'Sarah ensures every aspect of your hunting trip runs smoothly, from initial booking to trophy export. Her attention to detail and client-first approach guarantees a hassle-free experience.',
    image: '/assets/img/profile/profile3.png'
  },
  {
    name: 'James Maori',
    title: 'Senior Guide',
    description: 'Born and raised in New Zealand\'s South Island, James has an unparalleled knowledge of the alpine terrain. His tracking skills and understanding of animal behavior are legendary among returning clients.',
    image: '/assets/img/profile/profile4.gif'
  },
  {
    name: 'Emily Chen',
    title: 'Client Relations & Bookings',
    description: 'Emily handles all client communications and special requests. Her multilingual skills and tourism background ensure international clients receive clear information and personalized service.',
    image: '/assets/img/profile/profile1.png'
  }
];

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    document.title = 'About Us | Outback Hunting New Zealand';
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Outback Hunting New Zealand",
    "description": "Learn about Outback Hunting New Zealand's story, our experienced team of hunting guides, and our commitment to providing world-class hunting experiences in New Zealand since 2005.",
    "url": "https://outbackhuntingnz.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Outback Hunting New Zealand",
      "foundingDate": "2005",
      "description": "Premium New Zealand hunting outfitter providing guided hunting experiences for Red Stag, Tahr, Chamois, and other trophy game.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NZ",
        "addressRegion": "South Island"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Mike Thompson",
          "jobTitle": "Founder & Lead Guide",
          "description": "Over 25 years of hunting experience across New Zealand"
        },
        {
          "@type": "Person",
          "name": "Sarah Wilson",
          "jobTitle": "Operations Manager",
          "description": "Ensures every aspect of hunting trips runs smoothly"
        },
        {
          "@type": "Person",
          "name": "James Maori",
          "jobTitle": "Senior Guide",
          "description": "Expert knowledge of alpine terrain and animal behavior"
        },
        {
          "@type": "Person",
          "name": "Emily Chen",
          "jobTitle": "Client Relations & Bookings",
          "description": "Handles client communications and special requests"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides</title>
        <meta name="description" content="Learn about Outback Hunting New Zealand's story, our experienced team of hunting guides, and our commitment to providing world-class hunting experiences in New Zealand since 2005." />
        <meta name="keywords" content="New Zealand hunting guides, hunting outfitter, Mike Thompson, hunting experience, Outback Hunting New Zealand team, hunting expertise, New Zealand hunting history" />
        <link rel="canonical" href="https://outbackhuntingnz.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides" />
        <meta property="og:description" content="Learn about Outback Hunting New Zealand's story, our experienced team of hunting guides, and our commitment to providing world-class hunting experiences in New Zealand since 2005." />
        <meta property="og:image" content="/assets/img/scenery.jpg" />
        <meta property="og:url" content="https://outbackhuntingnz.com/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides" />
        <meta name="twitter:description" content="Learn about Outback Hunting New Zealand's story, our experienced team of hunting guides, and our commitment to providing world-class hunting experiences in New Zealand since 2005." />
        <meta name="twitter:image" content="/assets/img/scenery.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Header */}
      <section 
        ref={headerRef}
        className="relative py-24 md:py-32"
        style={{
          backgroundImage: 'url(/assets/img/backgrounds/landscape.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Outback Hunting New Zealand
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Discover our story, our team, and our commitment to providing world-class hunting experiences in New Zealand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section 
        id="story" 
        ref={storyRef} 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Outback Hunting New Zealand was founded in 2005 by Mike Thompson, a lifelong hunter with a passion for New Zealand's wilderness. What began as a small guiding operation has grown into one of the country's most respected hunting outfitters.
                </p>
                
                <p className="leading-relaxed">
                  Our mission has always been to provide exceptional hunting experiences while promoting conservation and sustainable hunting practices. We believe in preserving New Zealand's unique wildlife habitats for future generations of hunters.
                </p>
                
                <p className="leading-relaxed">
                  Over the years, we've guided hundreds of hunters from around the world, helping them secure trophy-class animals and create memories that last a lifetime. Our team has grown to include experienced guides, logistics experts, and customer service specialists all dedicated to exceeding our clients' expectations.
                </p>
                
                <p className="leading-relaxed">
                  Today, Outback Hunting New Zealand offers access to some of New Zealand's most exclusive hunting territories, from private estates to remote wilderness areas accessible only by helicopter. We continue to innovate and improve our services while maintaining our commitment to ethical hunting and personal attention.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { icon: <Users size={20} className="mr-2" />, text: '1000+ Happy Clients' },
                  { icon: <Award size={20} className="mr-2" />, text: '15+ Years Experience' },
                  { icon: <MapPin size={20} className="mr-2" />, text: '12 Exclusive Locations' },
                  { icon: <ShieldCheck size={20} className="mr-2" />, text: 'Licensed & Insured' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center py-2 px-4 rounded-full text-sm ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/assets/img/gallimg/scenery/1.png" 
                  alt="Hunting in New Zealand wilderness - Professional hunting experience" 
                  className="rounded-lg h-64 object-cover w-full shadow-md"
                  loading="lazy"
                />
                <img 
                  src="/assets/img/gallimg/redstag/1.png" 
                  alt="Trophy Red Stag hunting in New Zealand - Premium hunting experience" 
                  className="rounded-lg h-64 object-cover w-full shadow-md"
                  loading="lazy"
                />
                <img 
                  src="/assets/img/gallimg/scenery/2.png" 
                  alt="New Zealand hunting landscape - Breathtaking wilderness scenery" 
                  className="rounded-lg h-64 object-cover w-full shadow-md"
                  loading="lazy"
                />
                <img 
                  src="/assets/img/gallimg/Tahr/1.png" 
                  alt="Mountain hunting in New Zealand - Alpine hunting adventure" 
                  className="rounded-lg h-64 object-cover w-full shadow-md"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section 
        id="locations" 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Hunting Locations</h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Based in Rolleston, Christchurch, we specialize in hunting the spectacular Canterbury Highlands and McKenzie Country regions
            </p>
          </div>
          
          <div className="relative py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="relative">
                  <iframe 
                    src="https://www.google.com/maps?q=Canterbury,New+Zealand&z=8&output=embed"
                    width="100%"
                    height="400"
                    className="rounded-lg shadow-xl"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map of Canterbury, New Zealand"
                  ></iframe>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg">
                    <p className="text-sm font-semibold">Canterbury, New Zealand</p>
                    <p className="text-xs opacity-90">Our Base Region</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-8">
                {[
                  {
                    region: 'Canterbury Highlands',
                    description: 'Spectacular high country terrain featuring rolling tussock grasslands and rugged mountain ranges. Home to some of New Zealand\'s finest Red Stag and Fallow Deer hunting.',
                    species: ['Red Stag', 'Fallow Deer', 'Wallaby', 'Chamois'],
                    image: '/assets/img/slider/3.png'
                  },
                  {
                    region: 'McKenzie Country',
                    description: 'The iconic McKenzie Basin offers vast open landscapes with stunning alpine backdrops. Perfect for Tahr hunting and challenging alpine pursuits.',
                    species: ['Himalayan Tahr', 'Chamois', 'Red Stag'],
                    image: '/assets/img/slider/4.png'
                  },
                  {
                    region: 'Southern Alps - Canterbury',
                    description: 'The Canterbury section of the Southern Alps provides world-class alpine hunting for Tahr and Chamois in breathtaking mountain scenery.',
                    species: ['Himalayan Tahr', 'Alpine Chamois', 'Red Stag'],
                    image: '/assets/img/slider/5.png'
                  },
                  {
                    region: 'High Country Estates',
                    description: 'Exclusive access to private high country stations offering premium hunting experiences with luxury accommodations and stunning views.',
                    species: ['Red Stag', 'Fallow Deer', 'Elk', 'Wallaby'],
                    image: '/assets/img/slider/6.png'
                  },
                  {
                    region: 'Alpine Wilderness Areas',
                    description: 'Remote alpine regions accessible by helicopter, offering pristine hunting environments for the most adventurous hunters.',
                    species: ['Himalayan Tahr', 'Chamois', 'Red Stag'],
                    image: '/assets/img/slider/8.png'
                  },
                  {
                    region: 'Tussock Grasslands',
                    description: 'Vast expanses of golden tussock grasslands providing excellent habitat for Red Stag and Fallow Deer with spectacular mountain vistas.',
                    species: ['Red Stag', 'Fallow Deer', 'Wallaby'],
                    image: '/assets/img/slider/9.png'
                  }
                ].map((location, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <img 
                          src={location.image} 
                          alt={location.region} 
                          className="rounded w-full h-32 object-cover"
                        />
                      </div>
                      
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-bold mb-2">{location.region}</h3>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {location.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {location.species.map((species, idx) => (
                            <span 
                              key={idx}
                              className="inline-block px-3 py-1 text-xs rounded-full bg-amber-600 text-white"
                            >
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation & Ethics */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Commitment to Conservation
            </h2>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <p className="mb-6">
                At Outback Hunting New Zealand, we believe that ethical hunting and conservation go hand in hand. We are committed to:
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Supporting local conservation initiatives that protect New Zealand's unique ecosystems</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Practicing and promoting sustainable hunting methods that maintain healthy animal populations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Educating our clients about the importance of ethical hunting practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Partnering with landowners to implement habitat improvement projects</span>
                </li>
              </ul>
              
              <p>
                We donate a portion of every booking to local conservation efforts, helping to ensure New Zealand's hunting traditions can continue for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: 'Do I need hunting experience to book with Outback Hunting New Zealand?',
                  answer: 'While experience is beneficial, we welcome hunters of all skill levels. Our guides will adjust the hunt to match your experience and physical abilities, ensuring a safe and enjoyable experience.'
                },
                {
                  question: 'What is the best time of year to hunt in New Zealand?',
                  answer: 'The optimal hunting season depends on your target species. Red Stag hunting is best from March to July, with the rut in April. Tahr hunting peaks from May to August. We can advise on the best timing for your specific hunting goals.'
                },
                {
                  question: 'How physically demanding are your hunts?',
                  answer: 'The physical demands vary by species and location. Estate hunts for Red Stag are generally less strenuous, while alpine hunts for Tahr and Chamois require good fitness levels. We offer options for all fitness levels and can customize the experience to your capabilities.'
                },
                {
                  question: 'Can I bring non-hunting companions?',
                  answer: 'Absolutely! We welcome non-hunting companions and can arrange alternative activities while you hunt. Our luxury accommodations are perfect for those who want to enjoy New Zealand\'s scenery without participating in the hunt.'
                },
                {
                  question: 'What happens if I don\'t get an opportunity at my target species?',
                  answer: 'While we have high success rates, hunting involves some uncertainty. We work tirelessly to provide opportunities, but if circumstances prevent a reasonable chance at your target species, we discuss options which may include additional hunting days or adjusted trophy fees.'
                },
                {
                  question: 'How do I book a hunt with Outback Hunting New Zealand?',
                  answer: 'Contact us through our website or by phone to discuss your hunting goals. Once we understand your preferences, we\'ll propose a suitable package and dates. A 50% deposit is required to secure your booking, with the balance due 60 days before the hunt.'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="mb-6">
                Have other questions? We're here to help!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
              >
                Contact Us <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;