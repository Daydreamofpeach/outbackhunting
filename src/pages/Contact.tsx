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
        className="relative py-24 md:py-32"
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
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <Phone size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{contact.phone}</p>
                      <p className="text-sm mt-1">Available 7 days, 8am-6pm NZST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <Mail size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className={darkMode ? 'text-amber-400 hover:underline' : 'text-amber-700 hover:underline'}
                      >
                        {contact.email}
                      </a>
                      <p className="text-sm mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <MapPin size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Location</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com"
                      className={`p-3 rounded-full transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-white hover:bg-gray-200'
                      }`}
                      aria-label="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com"
                      className={`p-3 rounded-full transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-white hover:bg-gray-200'
                      }`}
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a 
                      href="https://youtube.com"
                      className={`p-3 rounded-full transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-white hover:bg-gray-200'
                      }`}
                      aria-label="YouTube"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
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
                            <p><span className="font-medium">Price:</span> ${selectedPackage.price}</p>
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