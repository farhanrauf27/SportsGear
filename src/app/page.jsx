'use client';

import Image from "next/image";
import Link from 'next/link';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Contact from '../components/contact'
import About from '../components/about'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar/>

      {/* Hero Section */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen py-12 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 text-white overflow-hidden isolate">
  {/* Animated background elements */}
  <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-slow" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-float-medium" />
  <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-float-fast" />

  {/* Content */}
  <div className="relative z-10 lg:w-1/2 max-w-2xl mt-8 lg:mt-0 space-y-8">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
      {!isLoggedIn ? (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200 animate-text-shimmer">
          Shop Now!
        </span>
      ) : (
        <span className="inline-block">
          Gear up <span className="text-amber-300">for the</span> 
          <br className="hidden sm:block" /> Game!
        </span>
      )}
    </h2>

    <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 leading-relaxed">
      {isLoggedIn
        ? "Welcome back! Explore top-rated gear to dominate your game."
        : (
          <>
            Premium selection of <span className="font-medium text-white">performance-enhancing</span> gear.
            <br />
            Everything you need to <span className="underline decoration-amber-300">elevate your game</span>.
          </>
        )
      }
    </p>

    <div className="flex flex-wrap gap-4">
      {!isLoggedIn ? (
        <Link
          href="#products"
          className="relative overflow-hidden group bg-white text-blue-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          <span className="relative z-10">Shop Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        </Link>
      ) : (
        <>
          <button
            onClick={() => router.push('/login')}
            className="relative overflow-hidden group bg-white text-blue-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="relative overflow-hidden group bg-transparent border-2 border-white/30 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </>
      )}
    </div>
  </div>

  {/* Image */}
  <div className="relative lg:w-1/2 flex justify-center">
    <div className="relative w-full max-w-lg aspect-square">
      <Image
        src="/banner.png"
        alt="Sports Equipment"
        fill
        className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-xl -z-10" />
    </div>
  </div>
</section>

      {/* Products Section */}
     <section id="products" className="py-16 px-8 bg-gray-50 text-black">
  <div className="max-w-7xl mx-auto text-center">
    <h3 className="text-3xl font-bold mb-6">Top Products</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Product 1 */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Final state (on load)
        transition={{ duration: 0.5 }} // Duration of animation
      >
        <motion.div 
          className="w-full h-72 overflow-hidden mb-4"
          whileHover={{ scale: 1.05 }} // Scale up on hover
          transition={{ duration: 0.3 }}
        >
          <Image src="/product1.jpg" alt="Product 1" width={300} height={300} className="object-cover w-full h-full rounded-md" />
        </motion.div>
        <h4 className="font-semibold text-lg">Sports Shoes</h4>
        <p className="text-gray-600 mb-4">High-quality running shoes for all sports.</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer" onClick={() => router.push('/shop')}>Shop Now</button>
      </motion.div>

      {/* Product 2 */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Final state (on load)
        transition={{ duration: 0.5, delay: 0.2 }} // Delay the animation for the second product
      >
        <motion.div 
          className="w-full h-72 overflow-hidden mb-4"
          whileHover={{ scale: 1.05 }} // Scale up on hover
          transition={{ duration: 0.3 }}
        >
          <Image src="/product2.jpg" alt="Product 2" width={300} height={300} className="object-cover w-full h-full rounded-md" />
        </motion.div>
        <h4 className="font-semibold text-lg">Football</h4>
        <p className="text-gray-600 mb-4">Durable and premium quality football for all levels.</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Shop Now</button>
      </motion.div>

      {/* Product 3 */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Final state (on load)
        transition={{ duration: 0.5, delay: 0.4 }} // Delay the animation for the third product
      >
        <motion.div 
          className="w-full h-72 overflow-hidden mb-4"
          whileHover={{ scale: 1.05 }} // Scale up on hover
          transition={{ duration: 0.3 }}
        >
          <Image src="/product3.jpg" alt="Product 3" width={300} height={300} className="object-cover w-full h-full rounded-md" />
        </motion.div>
        <h4 className="font-semibold text-lg">Tennis Racket</h4>
        <p className="text-gray-600 mb-4">Perfectly balanced rackets for the perfect game.</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Shop Now</button>
      </motion.div>
    </div>
  </div>
</section>


      {/* About Section */}
      <Contact/>
      {/* Contact Section */}
      <About/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
