import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white py-24">
      <div className="max-w-screen-lg mx-auto px-6 sm:px-12 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-8">Contact Us</h1>
        <p className="text-xl text-gray-300 mb-12">
          We would love to hear from you! For any inquiries, suggestions, or feedback, feel free to reach out.
        </p>

        {/* Contact Information Section */}
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Contact Information</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center justify-center">
              <span className="material-icons mr-2">email</span>
              <a href="mailto:123@gmail.com" className="text-blue-400 hover:underline">
                123@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center">
              <span className="material-icons mr-2">phone</span>
              <span>+000 000 000 0000</span>
            </div>
            <div className="flex items-center justify-center">

              <span>Lokmanya Tilak college of engineering</span>
            </div>
          </div>
        </div>

        {/* Optional Google Map Section (replace with actual map URL) */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Visit Us</h2>
          <div className="w-full h-64 bg-gray-600 rounded-lg">
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0443644231004!2d73.00467317505286!3d19.105709582104964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0da59d0a01b%3A0x56642a54a185f894!2sLokmanya%20Tilak%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1738490224036!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
