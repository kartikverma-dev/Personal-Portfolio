"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Trophy, Landmark, BookOpen, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { achievements, Achievement } from "@/data/portfolioData";

const categoryMeta = {
  certification: { label: "Certifications", icon: ShieldCheck, color: "text-cyan-400", border: "border-cyan-500/20" },
  competition: { label: "Leadership & Sports", icon: Trophy, color: "text-amber-400", border: "border-amber-500/20" },
  academic: { label: "Academic & Learning", icon: Landmark, color: "text-emerald-400", border: "border-emerald-500/20" }
};

export default function Achievements() {
  const [filter, setFilter] = useState<"all" | "certification" | "competition" | "academic">("all");

  const filtered = filter === "all"
    ? achievements
    : achievements.filter(a => {
        if (filter === "academic") {
          return a.category === "academic" || a.category === "course";
        }
        return a.category === filter;
      });

  return (
    <section className="py-24 relative overflow-hidden bg-[#02000c]/30" id="achievements">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <Award className="w-3.5 h-3.5" /> Accomplishments
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Certifications &amp; Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            Verified credentials, academic awards, and competitive tech standings.
          </motion.p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-white/10 border border-white/10 text-cyan-400"
                : "bg-white/5 border border-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All Achievements
          </button>
          {Object.keys(categoryMeta).map((catKey) => {
            const meta = categoryMeta[catKey as keyof typeof categoryMeta];
            return (
              <button
                key={catKey}
                onClick={() => setFilter(catKey as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  filter === catKey
                    ? "bg-white/10 border border-white/10 text-cyan-400"
                    : "bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const meta = categoryMeta[item.category === "course" ? "academic" : item.category as keyof typeof categoryMeta];
              const Icon = meta.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  key={item.id}
                  className={`glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between glass-panel-hover ${meta.border} relative group overflow-hidden`}
                >
                  <div className="space-y-4">
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg bg-white/5 ${meta.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-gray-500 uppercase bg-white/5 px-2 py-0.5 rounded">
                        {meta.label}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-purple-400 font-medium mt-1">
                        Issued by: {item.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" /> Verified Credential
                    </span>
                    <span>{item.date}</span>
                  </div>

                  {/* Highlight card glow corners */}
                  <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:animate-glow-border pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
