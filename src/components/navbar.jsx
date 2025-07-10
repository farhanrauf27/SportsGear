"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
    else{
      setUser(null)
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".user-dropdown") === null) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out? This will end your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      setUser(null);
  setDropdownOpen(false);
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        router.push("/");
      }
    });
    
  };

  const navItems = [
    {
      name: "Sports",
      subItems: ["Football", "Basketball", "Tennis", "Cricket"],
    },
    {
      name: "Clothing",
      subItems: ["Jerseys", "Shorts", "Shoes", "Accessories"],
    },
    {
      name: "Brands",
      subItems: ["Nike", "Adidas", "Puma", "Under Armour"],
    },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
  <div className="mx-auto w-full max-w-[100vw] px-4 sm:px-6">
    <div className="flex h-16 items-center justify-between md:h-20">
      {/* Logo */}
      {/* <div className="flex flex-shrink-0 items-center">
  <Image
    src="/logo.png" // or /logo.svg for sharper scaling
    alt="SportsGear Logo"
    width={140}
    height={32}
    className="h-8 w-auto object-contain hover:scale-105 transition-transform"
    priority
  />
</div> */}

<div className="flex flex-shrink-0 items-center">
  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform cursor-pointer" onClick={() => router.push('/')}>
    Sports<span className="italic font-extrabold">Gear</span>
  </span>
</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className="relative"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button className="flex items-center whitespace-nowrap px-1 text-sm font-medium text-white hover:text-yellow-300 transition-colors lg:text-[15px]">
              {item.name}
              <svg
                className="ml-1 h-4 w-4 transition-transform duration-200"
                style={{
                  transform: hoveredItem === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Navigation Dropdown */}
            {item.subItems && (
              <div
                className={`absolute left-0 top-full mt-2 w-56 origin-top rounded-lg bg-white py-1 shadow-xl transition-all duration-200 ${
                  hoveredItem === index
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                }`}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Controls */}
      <div className="flex items-center space-x-4">
      {user ? (
  <div className="relative user-dropdown">
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="hidden md:flex items-center space-x-1 focus:outline-none cursor-pointer"
    >
      {/* Display full name safely */}
      <span className="text-sm font-medium text-white">
        {user.firstName || user.given_name || user.name || 'User'}
      </span>

      {/* Display initial safely */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
        {(user?.firstName?.charAt(0) ||
          user?.given_name?.charAt(0) ||
          user?.name?.charAt(0) ||
          'U').toUpperCase()}
      </div>
    </button>

    {/* User Dropdown */}
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
        <button
          onClick={() => {
            handleLogout();
            setDropdownOpen(false);
          }}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
) : (
          <div className="hidden space-x-2 md:flex">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-yellow-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-800 shadow-sm hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <div
    className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden ${
      mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
    }`}
    onClick={() => setMobileMenuOpen(false)}
  >
    <div
      className={`absolute right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-blue-900 to-indigo-800 shadow-xl transition-transform duration-300 ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Image
            src="/logo.png"
            alt="SportsGear Logo"
            width={120}
            height={28}
            className="h-7 object-contain"
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md p-1 text-white hover:text-yellow-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-6">
          {navItems.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="mb-3 flex items-center justify-between text-lg font-medium text-white">
                {item.name}
              </div>
              <div className="ml-3 space-y-2 border-l border-white/10 pl-3">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href="#"
                    className="block py-2 text-sm text-white/80 hover:text-yellow-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <div className="mt-auto border-t border-white/10 p-4">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{user.firstName}</div>
                <div className="text-sm text-white/80">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="mt-auto flex space-x-2 border-t border-white/10 p-4">
            <Link
              href="/login"
              className="flex-1 rounded-md border border-white px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 rounded-md bg-white px-4 py-2 text-center text-sm font-medium text-blue-800 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
</header>
  );
}
