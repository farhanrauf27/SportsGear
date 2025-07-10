"use client";

import Link from "next/link";
import Image from "next/image";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Company Info */}
        <div>
           <Image
              src="/logo.png"
              alt="SportsGear Logo"
              width={100} // You can increase or decrease this
              height={60}
              
            />
          <p className="text-sm leading-6">
            Elevate your performance with premium sports gear. Designed for champions.
          </p>
          <div className="flex space-x-4 mt-4 text-white text-xl">
  <Link href="#" className="hover:text-blue-400 transition transform hover:scale-110">
    <FaFacebookF />
  </Link>
  <Link href="#" className="hover:text-pink-400 transition transform hover:scale-110">
    <FaInstagram />
  </Link>
  <Link href="#" className="hover:text-sky-400 transition transform hover:scale-110">
    <FaTwitter />
  </Link>
  <Link href="#" className="hover:text-red-500 transition transform hover:scale-110">
    <FaYoutube />
  </Link>
</div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-white transition">Men's Gear</Link></li>
            <li><Link href="#" className="hover:text-white transition">Women's Gear</Link></li>
            <li><Link href="#" className="hover:text-white transition">Kids' Collection</Link></li>
            <li><Link href="#" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link href="#" className="hover:text-white transition">Shipping & Returns</Link></li>
            <li><Link href="#" className="hover:text-white transition">Order Tracking</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SportsGear. All rights reserved.
      </div>
    </footer>
  );
}
