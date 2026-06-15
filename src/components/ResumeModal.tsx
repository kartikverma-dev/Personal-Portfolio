"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume-preview", handleOpen);
    return () => {
      window.removeEventListener("open-resume-preview", handleOpen);
    };
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#02000c]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-4 md:inset-10 z-50 flex flex-col bg-[#060322]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-5xl mx-auto w-full"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <Eye className="w-4 h-4 animate-pulse" /> Resume / CV Preview
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe View */}
            <div className="flex-1 bg-[#030014]/40 relative p-4 z-10 flex flex-col justify-center items-center">
              {/* Fallback loading indicators */}
              <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-gray-500 text-xs gap-3 font-mono">
                <div className="w-8 h-8 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                Loading PDF Preview...
              </div>

              {/* Render PDF in iframe */}
              <iframe
                src={`${personalInfo.resumeUrl}#toolbar=0`}
                className="w-full h-full rounded-2xl border border-white/5 bg-[#030014]/60 relative z-10"
                title="Resume PDF Viewer"
              />
            </div>
            
            {/* Modal Footer (Responsive Notice) */}
            <div className="px-6 py-3 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-mono gap-2 relative z-10">
              <span>Previewing: Kartik_Verma_Resume.pdf</span>
              <span>Click &quot;Download PDF&quot; to save a copy offline</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
