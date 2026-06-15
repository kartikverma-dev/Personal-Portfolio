"use client";

import React from "react";
import { Briefcase, Mail, Download, ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function HireMe() {
  const opportunities = [
    "Software Engineering Internships",
    "Freelance & Contract Projects",
    "IoT / Microcontroller Experiments",
    "AI Integration & Prompt Prototyping",
    "Open-Source Technical Collaborations",
    "Student Developer Initiatives"
  ];

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#040213]/40" id="hire-me">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-12 rounded-3xl border border-cyan-500/20 bg-[#060322]/90 shadow-[0_0_50px_rgba(6,182,212,0.05)] relative overflow-hidden"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <Briefcase className="w-3.5 h-3.5" /> Available for Opportunities
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Let's Collaborate on <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Next-Gen Tech</span>
              </h2>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                As a student, I am eager to apply my skills in real-world professional projects, contribute to team environments, and experiment with hardware integrations. I bring curiosity, dedication, and a hands-on learning mindset to every role.
              </p>

              {/* Checkbox Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {opportunities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider mb-2 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400" /> Professional Channels
              </h3>

              {/* Main CTA */}
              <a
                href="#contact"
                onClick={handleContactScroll}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all group"
              >
                Send a Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-xs transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" /> Write to: {personalInfo.email}
              </a>

              {/* Download CV */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-resume-preview"))}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-400" /> Preview CV / Resume
              </button>

              {/* Social Channels Row */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 text-gray-400 text-[11px] font-mono transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-purple-400 text-gray-400 text-[11px] font-mono transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>
            </div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
