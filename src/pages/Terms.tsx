import React from 'react';

const Terms: React.FC = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800 dark:text-gray-200">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <h2 className="text-xl font-semibold mt-8 mb-2">1. Bookings & Payments</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>A deposit is required to secure your booking. The balance is due before your hunt.</li>
      <li>All prices are in NZD and subject to change.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">2. Cancellations & Refunds</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Deposits are non-refundable except in cases of force majeure or at our discretion.</li>
      <li>We recommend travel insurance for all clients.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">3. Liability</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>All hunting activities are undertaken at your own risk.</li>
      <li>We are not liable for loss, injury, or delays beyond our control.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">4. Code of Conduct</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Clients must comply with New Zealand laws and ethical hunting practices.</li>
      <li>We reserve the right to terminate services for unsafe or inappropriate behavior.</li>
    </ul>
    <p className="mt-8">By booking with Outback Hunting New Zealand, you agree to these terms. For questions, contact info@nzwildhunt.co.nz.</p>
  </div>
);

export default Terms; 