"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Mail, Cpu, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#02000c] relative py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Branding */}
        <div className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Cpu className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          <span>
            Kartik<span className="text-cyan-400 font-mono">.V</span>
          </span>
        </div>

        {/* Center Quick Socials */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all"
            title="GitHub"
            id="footer-github"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all"
            title="LinkedIn"
            id="footer-linkedin"
          >
            <LinkedinIcon className="w-4.5 h-4.5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all"
            title="Email"
            id="footer-email"
          >
            <Mail className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-resume-preview"))}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-cyan-500/10 px-3 py-2 rounded-lg border border-white/5 transition-all cursor-pointer"
            title="Preview Resume"
            id="footer-resume"
          >
            <Download className="w-3.5 h-3.5" /> CV
          </button>
        </div>

        {/* Right Copyright */}
        <p className="text-xs text-gray-500 font-mono text-center md:text-right">
          &copy; {new Date().getFullYear()} Kartik Verma. All rights reserved.
        </p>

      </div>

      {/* Floating Back To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </button>
      )}
    </footer>
  );
}
