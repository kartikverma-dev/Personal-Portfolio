"use client";

import React from "react";
import { GraduationCap, Award, Target, User } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden" id="about">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <User className="w-3.5 h-3.5" /> About Me
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            My Story &amp; Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            Motivated student exploring embedded networks, scripting, and code architectures.
          </motion.p>
        </div>

        <div className="space-y-8">
          
          {/* Personal Story & Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-2xl border-white/5 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Career Objective
            </h3>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              I am a BCA student passionate about technology, AI, web development, and IoT systems. I enjoy experimenting with ESP8266 and ESP32 platforms, exploring AI-powered tools, and building practical projects that help me understand real-world engineering concepts.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              My learning journey focuses on acquiring hands-on exposure to network foundations, system administration, and basic hardware telemetry protocols, alongside modern UI frameworks.
            </p>

            {/* Info Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <GraduationCap className="w-4.5 h-4.5" />
                  <span>Education</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">{personalInfo.education.degree}</p>
                <p className="text-[11px] text-gray-500">{personalInfo.education.institution}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Award className="w-4.5 h-4.5" />
                  <span>Status &amp; GPA</span>
                </div>
                <p className="text-xs text-gray-400">Status: {personalInfo.education.gpa}</p>
                <p className="text-[11px] text-gray-500">Timeline: {personalInfo.education.duration}</p>
              </div>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-8 rounded-2xl border-white/5 bg-gradient-to-r from-purple-950/20 to-cyan-950/20 relative group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Target className="w-16 h-16 text-cyan-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" /> My Mission
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {personalInfo.mission}
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
