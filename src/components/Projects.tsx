"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Info, X, Compass, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/portfolioData";

const architectureStages = [
  { key: "problemStatement", label: "1. Problem Statement" },
  { key: "activeSolutions", label: "2. Global Active Solutions" },
  { key: "choiceRationale", label: "3. Why I Chose This Concept" },
  { key: "competitiveAdvantage", label: "4. Why My Solution is Better" },
  { key: "researchPlanning", label: "5. Research & Planning" },
  { key: "stack", label: "6. Hardware / Software Stack" },
  { key: "process", label: "7. Development Process" },
  { key: "resultsImprovements", label: "8. Results & Future Improvements" }
] as const;

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "web" | "ai" | "iot">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setExpandedStage(null);
  };

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section className="py-24 relative overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" /> Project Hub
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            My Creations &amp; Prototypes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            A curated index of hardware firmware repositories, AI system integrations, and full-stack control panels.
          </motion.p>
        </div>

        {/* Highlighted Projects Carousel/Row */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 font-mono">
            <span className="text-cyan-400">&gt;</span> Highlighted Projects
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={`featured-${project.id}`}
                className="relative glass-panel rounded-3xl overflow-hidden border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)] bg-[#04011e] flex flex-col justify-between group hover:border-cyan-500/40 transition-colors duration-300"
              >
                {/* Visual Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-600" />
                
                {/* Body Content */}
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/5 px-2.5 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                      ★ {project.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  {project.highlights && (
                    <ul className="space-y-1.5 pt-2">
                      {project.highlights.slice(0, 3).map((hl, hlIdx) => (
                        <li key={hlIdx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-8 py-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                  >
                    <Info className="w-4 h-4" /> View Architecture
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-white text-cyan-400 text-xs font-bold transition-all"
                      >
                        Live <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories Tab Selector for the full catalog */}
        <div className="border-t border-white/5 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <span className="text-purple-400">&gt;</span> Project Catalog
            </h3>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {(["all", "web", "ai", "iot"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    filter === cat
                      ? "bg-white/10 border border-white/10 text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Catalog */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  key={project.id}
                  className="glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-purple-400 font-bold uppercase bg-purple-400/5 px-2 py-0.5 rounded border border-purple-500/20">
                        {project.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-xs text-gray-400 leading-relaxed h-16 overflow-hidden line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-white/5 bg-white/[0.005] flex items-center justify-between">
                    <button
                      onClick={() => handleSelectProject(project)}
                      className="text-[11px] font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" /> Details
                    </button>

                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                        title="GitHub repo"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Details Dialog overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl glass-panel bg-[#04011e] rounded-3xl border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col max-h-[85vh] md:max-h-[90vh] overflow-hidden relative"
              >
                {/* Top border decor */}
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex-1 overflow-y-auto p-8 pr-6 space-y-6 scrollbar-thin">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/5 px-2.5 py-1 rounded-full border border-cyan-500/20 font-bold uppercase tracking-widest">
                      {selectedProject.status}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-3">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-purple-300 uppercase font-mono tracking-wider">
                      &gt;_ Project Description
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.architecture && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-semibold text-cyan-300 uppercase font-mono tracking-wider">
                        &gt;_ Expandable Project Architecture
                      </h4>
                      <div className="space-y-2">
                        {architectureStages.map((stage, idx) => {
                          const isExpanded = expandedStage === idx;
                          const content = selectedProject.architecture?.[stage.key];
                          if (!content) return null;
                          return (
                            <div
                              key={stage.key}
                              className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.01]"
                            >
                              <button
                                onClick={() => setExpandedStage(isExpanded ? null : idx)}
                                className="w-full flex items-center justify-between p-4 text-left font-mono text-xs font-semibold text-cyan-400 hover:bg-white/5 transition-all focus:outline-none"
                              >
                                <span>{stage.label}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 pt-0 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-white/[0.005]">
                                      {content}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedProject.highlights && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-cyan-300 uppercase font-mono tracking-wider">
                        &gt;_ Key Milestones Achieved
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProject.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase font-mono tracking-wider">
                      &gt;_ Technologies Applied
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-gray-300 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
                    >
                      <GithubIcon className="w-4 h-4" /> GitHub Repository
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white transition-all text-xs font-bold shadow-lg shadow-cyan-500/10"
                      >
                        Live Demonstration <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
