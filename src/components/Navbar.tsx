"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Tech Journal", href: "#tech-journal" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section on scroll
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "home";
      const triggerLine = 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            currentSection = section;
          }
        }
      }

      // Force last section when scrolled to the very bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      if (isAtBottom) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize immediately on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-navbar py-3 shadow-lg" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Branding */}
          <a
            href="#home"
            className="flex items-center gap-2 group font-semibold text-xl tracking-tight text-white focus:outline-none"
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-lg bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span>
              Kartik<span className="text-cyan-400 font-mono">.V</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors duration-200 hover:text-cyan-400 py-2 px-1 focus:outline-none ${
                      activeSection === item.href.substring(1)
                        ? "text-cyan-400 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.substring(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[280px] max-w-full bg-[#030014]/95 border-l border-white/5 backdrop-blur-xl p-8 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-8 mt-12">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="font-semibold text-lg text-white">Navigation</span>
                  <button
                    onClick={toggleMenu}
                    className="p-1 rounded-full hover:bg-white/5 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav>
                  <ul className="flex flex-col gap-5">
                    {navItems.map((item, idx) => (
                      <motion.li
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.label}
                      >
                        <a
                          href={item.href}
                          onClick={toggleMenu}
                          className={`text-lg font-medium block py-1 hover:text-cyan-400 transition-colors ${
                            activeSection === item.href.substring(1)
                              ? "text-cyan-400 border-l-2 border-cyan-400 pl-3 font-semibold"
                              : "text-gray-300"
                          }`}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 border-t border-white/5 pt-6"
              >
                <p className="text-xs text-gray-500 font-mono text-center">
                  kartik.verma@example.com
                </p>
                <a
                  href="#contact"
                  onClick={toggleMenu}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/10 transition-all duration-300"
                >
                  Get In Touch
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
