import React from 'react';

const ParallaxContent: React.FC = () => {
  return (
    <div className="w-full">
      {/* Section 1: Welcome to New Zealand */}
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Welcome to New Zealand's Premier Hunting Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Immerse yourself in the breathtaking landscapes of New Zealand's South Island. 
                Our expert guides will take you on an unforgettable journey through pristine wilderness 
                areas where trophy animals roam freely in their natural habitat.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-lg text-gray-700">20+ years of hunting expertise</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-lg text-gray-700">Exclusive access to private hunting grounds</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-lg text-gray-700">Luxury accommodations and world-class service</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">500+</div>
                    <div className="text-gray-600">Successful Hunts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">98%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">15</div>
                    <div className="text-gray-600">Expert Guides</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">50k+</div>
                    <div className="text-gray-600">Acres of Land</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Trophy Animals & Packages */}
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Trophy Animals & Hunting Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              New Zealand offers some of the world's most sought-after hunting experiences. 
              Our carefully crafted packages ensure you have the best opportunity to harvest 
              trophy-quality animals in stunning wilderness settings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🦌</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Red Stag Hunting</h3>
              <p className="text-gray-600 mb-6 text-center">
                Hunt New Zealand's world-famous red stags during the roaring season. 
                Experience the thrill of calling in these magnificent animals.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Season: March - May</div>
                <div>• Trophy Size: 300-400+ SCI</div>
                <div>• Difficulty: Moderate</div>
                <div>• Success Rate: 95%</div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🐐</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Himalayan Tahr</h3>
              <p className="text-gray-600 mb-6 text-center">
                Challenge yourself with high-altitude hunting for these magnificent 
                mountain goats in the Southern Alps.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Season: Year Round</div>
                <div>• Trophy Size: 10-12+ inches</div>
                <div>• Difficulty: Challenging</div>
                <div>• Success Rate: 85%</div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🦌</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Chamois Hunting</h3>
              <p className="text-gray-600 mb-6 text-center">
                Hunt these agile mountain antelopes in the challenging alpine terrain 
                of New Zealand's high country.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Season: Year Round</div>
                <div>• Trophy Size: 8-10+ inches</div>
                <div>• Difficulty: Very Challenging</div>
                <div>• Success Rate: 80%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: The Outback Experience */}
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-800 mb-8">
                The Outback Hunting Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our hunting expeditions are more than just trips – they're transformative 
                experiences that connect you with New Zealand's wild heart. From the moment 
                you arrive, you'll be immersed in a world of adventure, luxury, and unforgettable memories.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 text-xl">🏕️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Luxury Wilderness Lodges</h3>
                    <p className="text-gray-600">
                      Stay in our exclusive mountain lodges with modern amenities, 
                      gourmet meals, and stunning views of the surrounding wilderness.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
                    <p className="text-gray-600">
                      Our professional guides have intimate knowledge of the terrain, 
                      animal behavior, and the best hunting spots across New Zealand.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 text-xl">🚁</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Helicopter Access</h3>
                    <p className="text-gray-600">
                      Reach remote hunting areas via helicopter, accessing pristine 
                      wilderness that's inaccessible by foot or vehicle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Professional hunting guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Luxury accommodation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">All meals and beverages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Transportation and helicopter access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Trophy preparation and export permits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Hunting licenses and permits</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Testimonial</h3>
                <p className="text-gray-600 italic mb-4">
                  "The most incredible hunting experience of my life. The guides were 
                  professional, the accommodations were luxurious, and the trophy quality 
                  exceeded all expectations. I'll definitely be back!"
                </p>
                <div className="text-gray-500">
                  <strong>— John Smith, Texas</strong><br />
                  <span className="text-sm">Red Stag Hunt, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Plan Your Adventure */}
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Plan Your Ultimate Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to experience the hunt of a lifetime? Our team is standing by to help you 
              plan the perfect New Zealand hunting expedition tailored to your preferences and goals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-2xl">📞</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Phone</h4>
                      <p className="text-gray-600">+64 21 123 4567</p>
                      <p className="text-sm text-gray-500">Available 24/7 during hunting season</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-2xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Email</h4>
                      <p className="text-gray-600">info@outbackhuntingnz.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-2xl">📍</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Location</h4>
                      <p className="text-gray-600">South Island, New Zealand</p>
                      <p className="text-sm text-gray-500">Multiple hunting locations available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Booking</h3>
                <p className="text-gray-600 mb-6">
                  Ready to book? Call us directly or fill out our online inquiry form 
                  for a personalized hunting package quote.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    Request Hunting Package Quote
                  </button>
                  <button className="w-full border-2 border-amber-600 text-amber-600 py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors">
                    Download Hunting Guide
                  </button>
                </div>
              </div>
            </div>
            
            {/* Package Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Popular Packages</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-500 pl-6">
                    <h4 className="text-lg font-semibold mb-2">Red Stag Roar Hunt</h4>
                    <p className="text-gray-600 mb-2">5-day guided hunt during peak roaring season</p>
                    <p className="text-amber-600 font-semibold">From $8,500 NZD</p>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 pl-6">
                    <h4 className="text-lg font-semibold mb-2">Tahr & Chamois Combo</h4>
                    <p className="text-gray-600 mb-2">7-day high country adventure</p>
                    <p className="text-amber-600 font-semibold">From $12,000 NZD</p>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 pl-6">
                    <h4 className="text-lg font-semibold mb-2">Grand Slam Package</h4>
                    <p className="text-gray-600 mb-2">14-day multi-species hunt</p>
                    <p className="text-amber-600 font-semibold">From $25,000 NZD</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">20+ years of hunting expertise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">98% success rate across all species</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Exclusive access to private hunting grounds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Luxury accommodations and gourmet meals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Complete trophy preparation and export service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxContent;
