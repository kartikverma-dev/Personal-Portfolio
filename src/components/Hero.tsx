"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Download, Terminal, Sparkles, Code2 } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const titles = personalInfo.titles;

  // Typing effect parameters
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const DELAY_BETWEEN = 2000;

  // Typing effect timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[titleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, typedText.length - 1));
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentTitle.substring(0, typedText.length + 1));
      }, TYPING_SPEED);
    }

    // Word complete state
    if (!isDeleting && typedText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIdx, titles]);

  // Mouse follow lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { left, top } = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const bgTemplate = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.12), rgba(168, 85, 247, 0.08) 35%, transparent 70%)`;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      id="home"
    >
      {/* Dynamic lighting spotlight layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-100 transition-opacity duration-300"
        style={{ background: bgTemplate }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Info Card */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Next Gen AI Portfolio
          </motion.div>

          {/* Heading Name */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="gradient-text font-black">Kartik Verma</span>
            </motion.h1>

            {/* Rotating titles container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 flex items-center gap-2 h-12"
            >
              <span className="text-cyan-400 font-mono font-medium">As a </span>
              <span className="typing-cursor border-r-2 border-cyan-400 pr-1 text-white font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                {typedText}
              </span>
            </motion.div>
          </div>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-sm text-white hover:brightness-115 hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel glass-panel-hover font-semibold text-sm text-gray-300 hover:text-white"
            >
              Contact Me
            </a>
            
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-preview"))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-gray-400 hover:text-cyan-400 text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Preview Resume
            </button>
          </motion.div>
        </div>

        {/* Right Graphical Area: Floating tech nodes */}
        <div className="lg:col-span-5 relative h-[380px] lg:h-[450px] flex items-center justify-center">
          
          {/* Main Visual Centerpiece - Floating profile picture with enhanced backing glow */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20 group"
          >
            {/* Glowing Backing Aura */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 to-purple-600 blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            {/* Main Image Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#030014]/60 backdrop-blur-sm shadow-[0_15px_35px_rgba(6,182,212,0.15)] transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)]">
              <img
                src="/images/profile.jpg"
                alt="Kartik Verma"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gloss reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-40 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
