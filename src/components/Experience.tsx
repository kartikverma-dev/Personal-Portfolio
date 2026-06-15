"use client";

import React from "react";
import { GraduationCap, Award, Cpu, Milestone } from "lucide-react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";

export default function Experience() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cpu":
        return <Cpu className="w-4 h-4" />;
      case "book-open":
        return <GraduationCap className="w-4 h-4" />;
      case "award":
        return <Award className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#02000c]/20" id="experience">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <Milestone className="w-3.5 h-3.5" /> Key Milestones
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Work &amp; Education History
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 rounded-2xl border-white/5"
        >
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10 before:z-0">
            {experiences.map((exp, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={exp.id}
                className="relative flex gap-6 z-10 group"
              >
                {/* Icon container */}
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-300 shrink-0">
                  {getIcon(exp.icon)}
                </div>

                {/* Content details */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-500/20">
                    {exp.period}
                  </span>
                  <h4 className="text-base font-bold text-white pt-1">
                    {exp.role}
                  </h4>
                  <p className="text-xs text-purple-400 font-medium font-mono">
                    {exp.company}
                  </p>
                  <ul className="list-disc list-outside ml-4 mt-2 text-xs text-gray-400 space-y-1.5">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
