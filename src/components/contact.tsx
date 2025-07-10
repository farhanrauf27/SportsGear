"use client";

import { useState } from "react";
import Swal from "sweetalert2"; // ✅ import SweetAlert2

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Check your inbox for confirmation.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network error. Please try again later.",
      });
    }
  };
  
  

  return (
    <section className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Info */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6">Get in Touch</h2>
          <p className="text-lg mb-6 text-gray-200">
            Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li><span className="font-semibold">Email:</span> support@sportsgear.com</li>
            <li><span className="font-semibold">Phone:</span> +1 234 567 890</li>
            <li><span className="font-semibold">Address:</span> 123 Sporty St, New York, NY 10001</li>
          </ul>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg text-gray-800">
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600 resize-none"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}
