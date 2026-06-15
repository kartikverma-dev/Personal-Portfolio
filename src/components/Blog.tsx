"use client";

import React, { useState } from "react";
import { BookOpen, Search, Calendar, Clock, ArrowRight, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/portfolioData";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Extract categories dynamically from blogPosts
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 relative overflow-hidden bg-[#02000c]/40" id="tech-journal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <BookOpen className="w-3.5 h-3.5" /> Tech Journal
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Development Tech Journal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            Documenting my learning milestones, technology experiments, and internship journey drafts.
          </motion.p>
        </div>

        {/* Blog Controls: Category Tabs & Search Bar */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-white/10 text-cyan-400 border-cyan-500/30"
                      : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journal entries..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-cyan-500/50 text-gray-200 outline-none transition-all placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Articles Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  key={post.id}
                  className="glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col justify-between group border border-white/5"
                >
                  <div className="p-6 space-y-4">
                    {/* Header meta */}
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-500/20">
                        {post.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                        {post.title}
                      </h4>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="px-6 py-4 border-t border-white/5 bg-white/[0.005]">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                    >
                      View Draft Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <MessageSquare className="w-8 h-8 mx-auto opacity-40 mb-2" />
              <p className="text-sm">No journal entries found.</p>
            </div>
          )}
        </div>

      </div>

      {/* Article Read Modal Viewer */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-panel bg-[#04011e] rounded-3xl border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden relative"
            >
              {/* Header Accent line */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-purple-600" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex gap-4 items-center text-[10px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}
                    </span>
                  </div>
                  
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/5 px-2.5 py-0.5 rounded border border-cyan-500/20 font-bold uppercase">
                    {selectedPost.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white pt-1">
                    {selectedPost.title}
                  </h3>
                </div>

                <div className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-6 font-mono">
                  <p>{selectedPost.content}</p>
                  <p className="bg-white/5 p-4 rounded-xl border border-white/5 text-xs text-gray-400 font-sans">
                    <strong>Status:</strong> Upcoming Draft Entry. This journal post represents Kartik's active development notes.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-white text-cyan-400 text-xs font-bold transition-all"
                  >
                    Close Log
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
