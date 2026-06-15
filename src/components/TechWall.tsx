"use client";

import React, { useRef, useState } from "react";
import { Cpu, Server, Code, Braces, Terminal, Network, Flame, Info } from "lucide-react";
import { motion } from "framer-motion";

interface TechItem {
  id: string;
  name: string;
  category: "Languages" | "Frameworks" | "AI Tools" | "IoT Hardware";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  specs: string[];
  description: string;
}

const techItems: TechItem[] = [
  {
    id: "esp32",
    name: "ESP32 S3 Sense",
    category: "IoT Hardware",
    icon: Cpu,
    color: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.15)",
    specs: ["Dual-Core 240MHz", "8MB PSRAM", "I2S Support", "Concept Board"],
    description: "Currently learning: Exploring embedded C++ and hardware voice-assistant concepts."
  },
  {
    id: "esp8266",
    name: "ESP8266 NodeMCU",
    category: "IoT Hardware",
    icon: Cpu,
    color: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.15)",
    specs: ["Single-Core 80MHz", "WiFi AP/Station", "SPIFFS Storage", "GPIO Pins"],
    description: "Used in experimental setups for wireless signal activity exploration (LUMOS RF) and simple motor control."
  },
  {
    id: "nextjs",
    name: "Next.js 15/16",
    category: "Frameworks",
    icon: Server,
    color: "text-white",
    glow: "rgba(255, 255, 255, 0.1)",
    specs: ["React 19 App Router", "Server Components", "Tailwind Integration", "Route Handlers"],
    description: "Currently learning: Studying dynamic dashboard configurations and responsive portfolio layouts."
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "Frameworks",
    icon: Flame,
    color: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.15)",
    specs: ["@theme Configurations", "Backdrop Filters", "Responsive Breakpoints", "Zero Runtime CSS"],
    description: "Used to craft beautiful glassmorphism panels, glowing borders, and fluid responsive grids."
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    icon: Braces,
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.15)",
    specs: ["Strict Types", "Interface Declarations", "Safe Compilations", "JSON Parsing"],
    description: "Currently learning: Practicing type safety and state management in front-end projects."
  },
  {
    id: "python",
    name: "Python 3",
    category: "Languages",
    icon: Code,
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.15)",
    specs: ["MySQL Connection", "Data Scripts", "Syntax Basics", "API Requests"],
    description: "Experienced with Python for basic data processing, script automation, and learning security modules."
  },
  {
    id: "gemini",
    name: "Gemini / Groq APIs",
    category: "AI Tools",
    icon: Terminal,
    color: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.15)",
    specs: ["Multimodal Prompting", "Speech Transcriptions", "System Prompts", "Structured Responses"],
    description: "Exploring AI APIs for productivity, prompt layouts, and mock assistant query handling."
  },
  {
    id: "protocols",
    name: "MQTT & WebSockets",
    category: "AI Tools",
    icon: Network,
    color: "text-pink-400",
    glow: "rgba(244, 63, 94, 0.15)",
    specs: ["TCP Bi-directional", "Sub/Pub Channels", "Client Connections", "API Integrations"],
    description: "Currently learning: Studying real-time packet exchange protocols between sensors and controllers."
  }
];

// Interactive 3D tilt card
function TechCard({ item }: { item: TechItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    // Tilt intensity factor
    const MAX_TILT = 15;
    const tiltX = -(y / (height / 2)) * MAX_TILT;
    const tiltY = (x / (width / 2)) * MAX_TILT;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card-container w-full"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d"
        }}
        className="w-full glass-panel p-6 rounded-2xl border-white/5 bg-gradient-to-br from-card-dark to-[#050518] glass-panel-hover duration-100 ease-out relative overflow-hidden group"
      >
        {/* Glow backdrop on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(150px circle at 50% 50%, ${item.glow}, transparent 80%)`
          }}
        />

        <div className="relative z-10 space-y-4" style={{ transform: "translateZ(30px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase border border-white/5 px-2 py-0.5 rounded">
              {item.category}
            </span>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed h-12 overflow-hidden">
              {item.description}
            </p>
          </div>

          {/* Bullet specifications visible on hover reveal */}
          <div className="pt-3 border-t border-white/5 space-y-1.5">
            <div className="flex items-center gap-1 text-[10px] text-cyan-400/70 font-semibold uppercase tracking-wider font-mono mb-1">
              <Info className="w-3 h-3" /> Tech Specs
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {item.specs.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded truncate"
                  title={spec}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal gloss strip */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      </motion.div>
    </div>
  );
}

export default function TechWall() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#02000c]/40" id="tech-wall">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title details */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <Cpu className="w-3.5 h-3.5" /> Interactive Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            The 3D Technology Wall
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            Move your cursor over the components to tilt them and inspect hardware pins, frameworks, and protocol channels.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techItems.map((item) => (
            <TechCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
