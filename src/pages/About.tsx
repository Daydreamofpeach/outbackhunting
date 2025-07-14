import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Award, MapPin, ShieldCheck, Phone, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [servicesRef, servicesInView] = useInView({
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
    "description": "Learn about Gareth Hall and Outback Hunting New Zealand's story, our guided hunting experiences, and our commitment to providing world-class hunting experiences in New Zealand.",
    "url": "https://outbackhuntingnz.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Outback Hunting New Zealand",
      "description": "Premium New Zealand hunting outfitter providing guided hunting experiences for Red Deer, Chamois, and Tahr.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NZ",
        "addressRegion": "South Island",
        "addressLocality": "Canterbury"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Gareth Hall",
          "jobTitle": "Owner & Lead Guide",
          "description": "Over 30 years of hunting experience across New Zealand and internationally"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides</title>
        <meta name="description" content="Learn about Gareth Hall and Outback Hunting New Zealand's story, our guided hunting experiences, and our commitment to providing world-class hunting experiences in New Zealand." />
        <meta name="keywords" content="New Zealand hunting guides, Gareth Hall, hunting outfitter, hunting experience, Outback Hunting New Zealand, hunting expertise, New Zealand hunting history" />
        <link rel="canonical" href="https://outbackhuntingnz.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides" />
        <meta property="og:description" content="Learn about Gareth Hall and Outback Hunting New Zealand's story, our guided hunting experiences, and our commitment to providing world-class hunting experiences in New Zealand." />
        <meta property="og:image" content="/assets/img/scenery.jpg" />
        <meta property="og:url" content="https://outbackhuntingnz.com/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Outback Hunting New Zealand - Expert New Zealand Hunting Guides" />
        <meta name="twitter:description" content="Learn about Gareth Hall and Outback Hunting New Zealand's story, our guided hunting experiences, and our commitment to providing world-class hunting experiences in New Zealand." />
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
              Meet Gareth Hall and discover our commitment to providing world-class hunting experiences in New Zealand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gareth's Story */}
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
              <h2 className="text-3xl font-bold mb-6">Meet Gareth Hall</h2>
              
              <div className="space-y-4">
                <p className="leading-relaxed">
                  My hunting journey began at the age of 12 when I first picked up a pack and rifle, beginning to pursue all the big game New Zealand has to offer.
                </p>
                
                <p className="leading-relaxed">
                  Over the past 30+ years, I've hunted deep into the South Island's wilderness, creating unforgettable memories for myself and for clients. I've also hunted abroad in Australia and South Africa, expanding my experience in the field.
                </p>
                
                <p className="leading-relaxed">
                  Hunting is more than a hobby, it's a way of life, and I'm proud to now share that with others through Outback Hunting.
                </p>
                
                <p className="leading-relaxed">
                  Outback Hunting was originally run by my uncle David and his wife Hayley. I'm now taking over the business, with Dave supporting the handover to ensure we continue delivering top-quality guided hunts.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { icon: <Users size={20} className="mr-2" />, text: '30+ Years Experience' },
                  { icon: <Award size={20} className="mr-2" />, text: 'International Hunting' },
                  { icon: <MapPin size={20} className="mr-2" />, text: 'South Island Expert' },
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

      {/* Guided Hunts & Services */}
      <section 
        id="services" 
        ref={servicesRef} 
        className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Guided Hunts</h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I offer tailored wilderness foot hunts for:
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <span className="text-amber-600 font-semibold">• Red Deer</span>
              <span className="text-amber-600 font-semibold">• Chamois</span>
              <span className="text-amber-600 font-semibold">• Tahr</span>
            </div>
            <p className={`max-w-2xl mx-auto text-lg mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Every hunt is customised based on your goals, fitness level, and preferences. Whether you're after a challenging backcountry experience or a more accessible private land hunt, I'll put together the right package for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Hunt Options</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span><strong>Backpack Hunts</strong> - Walk into remote alpine country and camp overnight in tents or huts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span><strong>Base Camp Hunts</strong> - Comfortable day hunts based out of a lodge or cabin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span><strong>Helicopter-Assisted Hunts</strong> - Fly into remote areas and save your energy for chasing trophies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span><strong>Private Land Hunts</strong> - Available upon request for those after a more relaxed hunt.</span>
                </li>
              </ul>
              <p className="mt-6 text-sm italic">
                As your guide, I'll do everything I can to help you secure the trophy you're after. Hunting always requires a mix of skill, preparation, and luck - and I'll build your hunt plan accordingly.
              </p>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Included in Your Hunt</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Personalised guided hunt</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Field dressing of game in the field</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Transport of trophies to a taxidermist (if required)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Digital photos and video footage of your hunt – included at no extra cost</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Tent or hut accommodation for overnight hunts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Airport pick-up and drop-off (by arrangement)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Gear You Will Need</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Rifle (hire available: $250 NZD per hunt)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Binoculars</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Day pack</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Sturdy tramping or hunting boots</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Headlamp</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Weather-appropriate clothing (layers recommended)</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h4 className="font-bold mb-2">If Camping Out:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Sleeping bag</li>
                  <li>• Sleeping mat</li>
                  <li>• Larger pack 70L plus</li>
                  <li>• A two-man tent can be provided if required</li>
                </ul>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4">Add-On Experiences</h3>
              <p className="mb-4">If time allows after the hunt, I offer additional activities such as:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                  <span>Sightseeing in iconic South Island locations</span>
                </li>
              </ul>
              <p className="text-sm italic mb-4">
                Let me know if you're interested, and we'll make it happen if the schedule and weather allow.
              </p>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h4 className="font-bold mb-2">Extra Costs (Not Included in Hunt Price):</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Helicopter flights (if applicable)</li>
                  <li>• Hired accommodation (cabins/lodges)</li>
                  <li>• Spirits</li>
                  <li>• Restaurant meals</li>
                  <li>• Add-on experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Logistics */}
      <section 
        id="locations" 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Location & Logistics</h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm based just south of Christchurch, so airport pickups and drop-offs are easily arranged. Depending on your chosen hunt, accommodation options include:
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
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="text-xl font-bold mb-4">Accommodation Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span><strong>Tents or alpine huts</strong> for multi-day backpack hunts</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span><strong>Hired cabins or lodges</strong> for day hunts</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <h3 className="text-xl font-bold mb-4">Hunting Areas</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span><strong>Canterbury Highlands</strong> - Spectacular high country terrain featuring rolling tussock grasslands and rugged mountain ranges</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span><strong>McKenzie Country</strong> - The iconic McKenzie Basin offers vast open landscapes with stunning alpine backdrops</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span><strong>Southern Alps</strong> - World-class alpine hunting for Tahr and Chamois in breathtaking mountain scenery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Pricing</h2>
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <p className="mb-6">
                All pricing is in New Zealand Dollars (NZD) and is inclusive of Taxes.
              </p>
              <p className="mb-6">
                Please contact me for custom quotes or to discuss a package that suits your needs and hunting style.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
              >
                Get Custom Quote <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="mb-8 text-lg">
              Ready to plan your hunt or have a few questions first? I'd be happy to chat and help design a trip you will never forget.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 mb-8">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} w-full max-w-xs mx-auto`}> 
                <div className="flex items-center justify-center mb-4">
                  <Phone size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold mb-2">Phone</h3>
                <a href="tel:+64273113848" className="text-amber-600 hover:text-amber-700">
                  +64 27 311 3848
                </a>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} w-full max-w-sm mx-auto`}> 
                <div className="flex items-center justify-center mb-4">
                  <Mail size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <a href="mailto:info@outbackhuntingnewzealand.com" className="text-amber-600 hover:text-amber-700 break-all">
                  info@outbackhuntingnewzealand.com
                </a>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} w-full max-w-xs mx-auto`}> 
                <div className="flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold mb-2">Book a Hunt</h3>
                <Link to="/contact" className="text-amber-600 hover:text-amber-700">
                  Contact Us
                </Link>
              </div>
            </div>
            
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
            >
              Start Planning Your Hunt <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;