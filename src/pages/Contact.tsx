import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, Users, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ContactProps {
  darkMode: boolean;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [searchParams] = useSearchParams();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    huntType: '',
    message: '',
    numHunters: '1',
    preferredDates: '',
    huntDuration: '5 days'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [contact, setContact] = useState<ContactInfo>({ phone: '', email: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body with form data
    const emailBody = `
New Hunting Inquiry from Outback Hunting Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Hunt Type: ${formData.huntType}
Preferred Dates: ${formData.preferredDates}
Hunt Duration: ${formData.huntDuration}
Number of Hunters: ${formData.numHunters}

Additional Information:
${formData.message}

---
This inquiry was submitted through the Outback Hunting New Zealand website.
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@outbackhuntingnewzealand.com?subject=New Hunting Inquiry - ${formData.huntType}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        huntType: '',
        message: '',
        numHunters: '1',
        preferredDates: '',
        huntDuration: '5 days'
      });
    }, 5000);
  };

  useEffect(() => {
    document.title = 'Contact Us | Outback Hunting New Zealand';
  }, []);

  // Handle URL parameters for auto-filling form
  useEffect(() => {
    const packageId = searchParams.get('package');
    const huntType = searchParams.get('huntType');
    const species = searchParams.get('species');
    const price = searchParams.get('price');
    const duration = searchParams.get('duration');
    const location = searchParams.get('location');
    const customPackage = searchParams.get('customPackage');
    const packageDetails = searchParams.get('packageDetails');

    // Handle custom package details
    if (customPackage === 'true' && packageDetails) {
      try {
        const decodedDetails = JSON.parse(decodeURIComponent(packageDetails));
        setSelectedPackage({
          id: 'custom',
          huntType: 'Custom Package',
          species: decodedDetails.hunts.map((hunt: any) => hunt.species).join(', '),
          price: decodedDetails.totalPrice,
          duration: `${decodedDetails.totalDays} days`,
          location: 'Multiple Locations',
          details: decodedDetails
        });
        
        // Auto-fill the form with custom package details
        const huntTypes = decodedDetails.hunts.map((hunt: any) => hunt.name).join(', ');
        const includedItems = decodedDetails.hunts.flatMap((hunt: any) => hunt.included).join(', ');
        const extras = decodedDetails.selectedExtras.map((extra: any) => `${extra.name} (${extra.quantity})`).join(', ');
        
        setFormData(prev => ({
          ...prev,
          huntType: 'Custom Package',
          huntDuration: `${decodedDetails.totalDays} days`,
          message: `I'm interested in booking a custom hunting package.\n\nPackage Details:\n- Hunts: ${huntTypes}\n- Total Duration: ${decodedDetails.totalDays} days\n- Additional Days: ${decodedDetails.additionalDays} days\n- Total Price: $${decodedDetails.totalPrice}\n\nIncluded Items: ${includedItems}\n\nSelected Extras: ${extras || 'None'}\n\nPlease contact me to discuss availability and booking details.`
        }));
        return;
      } catch (error) {
        console.error('Error parsing package details:', error);
      }
    }

    // Handle regular package parameters (existing logic)
    if (packageId && huntType) {
      const packageInfo = {
        id: packageId,
        huntType: huntType,
        species: species,
        price: price,
        duration: duration,
        location: location
      };
      
      setSelectedPackage(packageInfo);
      
      // Auto-fill the form
      setFormData(prev => ({
        ...prev,
        huntType: huntType || '',
        huntDuration: duration || '5 days',
        message: `I'm interested in booking the ${huntType} hunt package.\n\nPackage Details:\n- Species: ${species}\n- Duration: ${duration}\n- Location: ${location}\n- Price: $${price}\n\nPlease contact me to discuss availability and booking details.`
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/contact.json')
      .then(res => res.json())
      .then(data => setContact(data));
  }, []);

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Header */}
      <section 
        ref={headerRef}
        className="relative py-24 md:py-32 pt-32 md:pt-40"
        style={{
          backgroundImage: 'url(/assets/img/backgrounds/landscape.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Get in touch to plan your next hunting adventure in New Zealand. We're here to answer your questions and help you book your dream hunt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section 
        className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <Phone size={20} className="text-amber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{contact.phone}</p>
                      <p className="text-sm mt-1">Available 7 days, 8am-6pm NZST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <Mail size={20} className="text-amber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className={`break-all ${darkMode ? 'text-amber-400 hover:underline' : 'text-amber-700 hover:underline'}`}
                      >
                        {contact.email}
                      </a>
                      <p className="text-sm mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <MapPin size={20} className="text-amber-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium mb-1">Office Location</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
              
              <div className="mt-8">
                <iframe 
                  src="https://www.google.com/maps?q=Canterbury,New+Zealand&z=8&output=embed"
                  width="100%" 
                  height="300" 
                  className="rounded-lg shadow-lg"
                  style={{ border: 0 }}
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Canterbury, New Zealand"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:w-2/3" ref={formRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div id="booking" className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className="text-2xl font-bold mb-6">Book Your Hunt</h2>
                  
                  {selectedPackage && (
                    <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-amber-900/20 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'}`}>
                      <div className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-600 mb-1">
                            Package Selected: {selectedPackage.huntType}
                          </h3>
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Species:</span> {selectedPackage.species}</p>
                            <p><span className="font-medium">Duration:</span> {selectedPackage.duration}</p>
                            <p><span className="font-medium">Location:</span> {selectedPackage.location}</p>
                            <p><span className="font-medium">Price:</span> ${selectedPackage.price?.toLocaleString('en-US')}</p>
                            {selectedPackage.details && (
                              <>
                                <p><span className="font-medium">Additional Days:</span> {selectedPackage.details.additionalDays} days</p>
                                {selectedPackage.details.selectedExtras && selectedPackage.details.selectedExtras.length > 0 && (
                                  <p><span className="font-medium">Extras:</span> {selectedPackage.details.selectedExtras.map((extra: any) => `${extra.name} (${extra.quantity})`).join(', ')}</p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formSubmitted ? (
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} mb-6`}>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        Email Client Opening!
                      </h3>
                      <p className={darkMode ? 'text-green-300' : 'text-green-700'}>
                        Your email client should open with your inquiry details. Please review and send the email to complete your booking request.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block mb-2 font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block mb-2 font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block mb-2 font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="huntType" className="block mb-2 font-medium">
                            Interested In
                          </label>
                          <select
                            id="huntType"
                            name="huntType"
                            value={formData.huntType}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          >
                            <option value="">Select Hunt Type</option>
                            <option value="Red Deer">Red Deer Hunt</option>
                            <option value="Tahr">Tahr Hunt</option>
                            <option value="Chamois">Chamois Hunt</option>
                            <option value="Combination">Combination Hunt</option>
                            <option value="Custom">Custom Package</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="preferredDates" className="flex items-center gap-2 mb-2 font-medium">
                            <Calendar size={16} className="text-amber-500" />
                            Preferred Dates
                          </label>
                          <input
                            type="text"
                            id="preferredDates"
                            name="preferredDates"
                            value={formData.preferredDates}
                            onChange={handleChange}
                            placeholder="e.g., April 2025"
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="huntDuration" className="flex items-center gap-2 mb-2 font-medium">
                            <Clock size={16} className="text-amber-500" />
                            Hunt Duration
                          </label>
                          <select
                            id="huntDuration"
                            name="huntDuration"
                            value={formData.huntDuration}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          >
                            <option value="3 days">3 days</option>
                            <option value="5 days">5 days</option>
                            <option value="6 days">6 days</option>
                            <option value="7 days">7 days</option>
                            <option value="8 days">8 days</option>
                            <option value="10 days">10 days</option>
                            <option value="12 days">12 days</option>
                            <option value="Custom">Custom duration</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="numHunters" className="flex items-center gap-2 mb-2 font-medium">
                            <Users size={16} className="text-amber-500" />
                            Number of Hunters
                          </label>
                          <select
                            id="numHunters"
                            name="numHunters"
                            value={formData.numHunters}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-gray-700 text-white focus:ring-amber-500' 
                                : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                            }`}
                          >
                            <option value="1">1 Hunter</option>
                            <option value="2">2 Hunters</option>
                            <option value="3">3 Hunters</option>
                            <option value="4+">4+ Hunters</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block mb-2 font-medium">
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your hunting experience, specific requirements, or any questions you have."
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                            darkMode 
                              ? 'bg-gray-700 text-white focus:ring-amber-500' 
                              : 'bg-gray-100 text-gray-900 focus:ring-amber-500'
                          }`}
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Send size={18} className="mr-2" />
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;