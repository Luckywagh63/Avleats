"use client";
import React from 'react';
import Link from 'next/link';
export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-black via-purple-950 to-slate-500 text-white relative overflow-hidden pt-40"> {/* Added py-16 */}
      <div className="max-w-screen-lg mx-auto px-6 sm:px-12 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-8">About Us</h1>

        <p className="text-xl text-gray-300 mb-8">
          Chemical-Free Food Lookup is a project developed by a group of passionate students
          committed to promoting healthier and more informed food choices. Our mission is to
          provide a platform that helps individuals make informed decisions by understanding the
          chemical components in their food.
        </p>

        {/* Team Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Team Member 1 */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <img
              src="/lucky.png" // Replace with Lucky's image
              alt="Lucky Wagh"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Lucky Wagh</h3>
            <p className="text-gray-300">Roll No: Aiml-A-159</p>
            <p className="text-gray-400 mt-4">
              Passionate about AI and web development. Leading the front-end design and user experience of the project.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <img
              src="/images/aayush.jpg" // Replace with Aayush's image
              alt="Aayush Redij"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Aayush Redij</h3>
            <p className="text-gray-300">Roll No: Aiml-A-141</p>
            <p className="text-gray-400 mt-4">
              AI enthusiast with a deep interest in machine learning. Handling back-end development and data analysis.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <img
              src="/images/ved.jpg" // Replace with Ved's image
              alt="Ved Ringne"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Ved Ringne</h3>
            <p className="text-gray-300">Roll No: Aiml-A-142</p>
            <p className="text-gray-400 mt-4">
              Focused on AI and data science, contributing to the project’s data integration and analysis features.
            </p>
          </div>
        </div>
      </div>

      
        {/*footer*/}
        <section className="mt-32 px-6 sm:px-12 md:px-24 lg:px-32 text-center space-y-20">
      <footer className="bg-gray-900 text-white py-8 w-full absolute bottom-0 left-0">
  <div className="max-w-screen-lg mx-auto px-6">
    <div className="flex justify-between">
      <div className="flex space-x-6">
        <Link href="/" className="text-lg text-gray-300 hover:text-white">Home</Link>
        <Link href="/about" className="text-lg text-gray-300 hover:text-white">About</Link>
        <Link href="/discover" className="text-lg text-gray-300 hover:text-white">Discover</Link>
        <Link href="/contact" className="text-lg text-gray-300 hover:text-white">Contact</Link>
      </div>
      <p className="text-sm text-gray-400 mt-4 md:mt-0">
        © {new Date().getFullYear()} Chemical-Free Food Lookup. All rights reserved.
      </p>
    </div>
  </div>
</footer>
</section>
    </div>
  );
}
