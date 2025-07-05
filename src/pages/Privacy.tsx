import React from 'react';

const Privacy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">Outback Hunting New Zealand is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Personal information you provide via forms (name, email, phone, etc.)</li>
      <li>Booking and inquiry details</li>
      <li>Website usage data (analytics, cookies)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>To respond to your inquiries and process bookings</li>
      <li>To improve our website and services</li>
      <li>To send important updates (with your consent)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You may request access to or deletion of your personal data at any time</li>
      <li>We do not sell or share your data with third parties except as required by law</li>
    </ul>
    <p className="mt-8">For questions about this policy, please contact us at info@nzwildhunt.co.nz.</p>
  </div>
);

export default Privacy; 