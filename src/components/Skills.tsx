"use client";

import React from "react";
import { Cpu, BrainCircuit, Zap, BookOpen, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { skills, Skill } from "@/data/portfolioData";

const categoryMap = {
  experienced: { 
    label: "Experienced With", 
    icon: CheckCircle2, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10", 
    border: "border-emerald-500/20",
    desc: "Technologies and tools I have actively applied in code scripts and environments."
  },
  knowledge: { 
    label: "Knowledge Areas", 
    icon: BookOpen, 
    color: "text-blue-400", 
    bg: "bg-blue-500/10", 
    border: "border-blue-500/20",
    desc: "Foundational conceptual topics, protocols, and architectural fundamentals."
  },
  learning: { 
    label: "Currently Learning", 
    icon: Zap, 
    color: "text-amber-400", 
    bg: "bg-amber-500/10", 
    border: "border-amber-500/20",
    desc: "Active development topics, web frameworks, and scripting languages I am learning."
  },
  interested: { 
    label: "Interested In", 
    icon: Heart, 
    color: "text-purple-400", 
    bg: "bg-purple-500/10", 
    border: "border-purple-500/20",
    desc: "Specialized fields and automated systems I plan to explore in future projects."
  },
};

export default function Skills() {
  const categories = Object.keys(categoryMap) as (keyof typeof categoryMap)[];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<Skill["category"], Skill[]>);

  return (
    <section className="py-24 relative overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <BrainCircuit className="w-3.5 h-3.5" /> Skill Catalog
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Skills &amp; Technology Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            An authentic roadmap mapping my current coding capabilities, theoretical knowledge base, and ongoing educational pursuits.
          </motion.p>
        </div>

        {/* Competency Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat, catIdx) => {
            const config = categoryMap[cat];
            const Icon = config.icon;
            const skillList = groupedSkills[cat] || [];

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                key={cat}
                className={`glass-panel p-8 rounded-3xl border border-white/5 bg-[#04011e]/90 flex flex-col justify-between group hover:${config.border} transition-colors duration-300`}
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${config.bg} ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {config.label}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-mono">
                    {config.desc}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {skillList.map((skill, sIdx) => (
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        key={skill.name}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:border-cyan-500/30 hover:text-white hover:bg-cyan-500/5 transition-all duration-200`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
