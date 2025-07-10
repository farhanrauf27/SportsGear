"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/about-us.jfif" 
            alt="About SportsGear" 
            className="rounded-lg shadow-2xl w-full object-cover" 
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            At <span className="font-bold text-blue-700">SportsGear</span>, we believe that sports are not just a game — they're a lifestyle. Since 2015, we've been empowering athletes and enthusiasts with premium sports equipment, apparel, and accessories, curated for performance and style.
          </p>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Our mission is to inspire every individual to achieve greatness by providing world-class gear backed by cutting-edge innovation, exceptional service, and a passion for sports excellence.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-md transition duration-300 cursor-pointer">
              Learn More
            </button>
            <button className="border-2 border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 font-semibold py-3 px-8 rounded-md transition duration-300 cursor-pointer">
              Our Story
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
