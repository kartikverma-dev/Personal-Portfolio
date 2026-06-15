"use client";

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", captcha: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [captchaPrompt, setCaptchaPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Generate a basic math captcha for spam protection
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaAnswer(num1 + num2);
    setCaptchaPrompt(`${num1} + ${num2}`);
    setForm(prev => ({ ...prev, captcha: "" }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.name.trim()) tempErrors.name = "Name is required.";
    
    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!form.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    if (parseInt(form.captcha) !== captchaAnswer) {
      tempErrors.captcha = "Incorrect answer. Try again.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate submission delay
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", captcha: "" });
      generateCaptcha();
    }, 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4"
          >
            <Mail className="w-3.5 h-3.5" /> Direct Bridge
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed"
          >
            Send a message to Kartik, ask an engineering question, or offer an internship role.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Details channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-8 rounded-3xl border-white/5 space-y-8 bg-[#04011d]">
              <h3 className="text-xl font-bold text-white font-mono">
                &gt;_ Contact Channels
              </h3>

              <div className="space-y-6">
                
                {/* Email link */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono">EMAIL</h4>
                    <p className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-none">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn link */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <LinkedinIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono">LINKEDIN</h4>
                    <p className="text-sm font-bold text-white truncate">
                      kartik-verma
                    </p>
                  </div>
                </a>

                {/* GitHub Link */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <GithubIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono">GITHUB</h4>
                    <p className="text-sm font-bold text-white truncate">
                      kartik-verma
                    </p>
                  </div>
                </a>

                {/* Location card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono">LOCATION</h4>
                    <p className="text-sm font-bold text-white">
                      New Delhi, {personalInfo.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Block: Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border-white/5 bg-[#04011d]/90 relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-cyan-400 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white font-mono">Transmission Sent!</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                      Your message has bypassed constraints and landed in Kartik's inbox. He will reply shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold text-xs transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Form state */
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <h3 className="text-xl font-bold text-white font-mono">
                      &gt;_ Encrypted Transmission
                    </h3>

                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="form-name" className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                          Your Name
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full px-4 py-3 text-sm rounded-xl bg-white/5 border outline-none text-white focus:bg-white/[0.08] transition-all ${
                            errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-cyan-500/50"
                          }`}
                          placeholder="Kartik Verma"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="form-email" className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                          Your Email
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full px-4 py-3 text-sm rounded-xl bg-white/5 border outline-none text-white focus:bg-white/[0.08] transition-all ${
                            errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-cyan-500/50"
                          }`}
                          placeholder="client@company.com"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div className="space-y-1">
                      <label htmlFor="form-subject" className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                        Subject
                      </label>
                      <input
                        id="form-subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-white/5 border outline-none text-white focus:bg-white/[0.08] transition-all ${
                          errors.subject ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-cyan-500/50"
                        }`}
                        placeholder="Internship / Collaboration Details"
                      />
                      {errors.subject && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Row 3: Message */}
                    <div className="space-y-1">
                      <label htmlFor="form-message" className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                        Message
                      </label>
                      <textarea
                        id="form-message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-white/5 border outline-none text-white focus:bg-white/[0.08] transition-all resize-none ${
                          errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-cyan-500/50"
                        }`}
                        placeholder="Write details about the project..."
                      />
                      {errors.message && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Row 4: Captcha Verification */}
                    <div className="space-y-1">
                      <label htmlFor="form-captcha" className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                        Anti-Spam Verification: Solve math puzzle
                      </label>
                      <div className="flex gap-3 items-center">
                        <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl font-mono text-sm text-cyan-400 select-none">
                          <span>{captchaPrompt}</span>
                          <span>=</span>
                        </div>
                        <input
                          id="form-captcha"
                          type="number"
                          value={form.captcha}
                          onChange={(e) => setForm({ ...form, captcha: e.target.value })}
                          className={`w-28 px-3 py-2.5 text-sm rounded-xl bg-white/5 border outline-none text-white focus:bg-white/[0.08] font-mono ${
                            errors.captcha ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-cyan-500/50"
                          }`}
                          placeholder="Ans"
                        />
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                          title="Refresh Captcha"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      {errors.captcha && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1 font-mono mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.captcha}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-sm text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading transmission...
                        </>
                      ) : (
                        <>
                          Transmit Signal <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
