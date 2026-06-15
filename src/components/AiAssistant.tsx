"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Cpu, Sparkles, User, Mail, Download, CornerDownLeft } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import aiKnowledge from "@/data/aiKnowledge.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  actions?: { label: string; href: string; icon: any }[];
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: aiKnowledge.welcomeMessage,
        timestamp: new Date(),
      }
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Match user message keywords against JSON knowledge entries
  const processQuery = (query: string): { text: string; actions?: any[] } => {
    const cleanQuery = query.toLowerCase().replace(/[^\w\s]/g, "");
    const words = cleanQuery.split(/\s+/);
    
    let bestMatch: typeof aiKnowledge.knowledge[0] | null = null;
    let maxMatchCount = 0;

    for (const entry of aiKnowledge.knowledge) {
      let matches = 0;
      for (const kw of entry.keywords) {
        if (words.includes(kw) || cleanQuery.includes(kw)) {
          matches++;
        }
      }

      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestMatch = entry;
      }
    }

    // Prepare actions if user query mentions contact, links, github, linkedin, or resume
    const actions: any[] = [];
    const isAskingContact = cleanQuery.includes("contact") || cleanQuery.includes("hire") || cleanQuery.includes("reach") || cleanQuery.includes("email");
    const isAskingGithub = cleanQuery.includes("github") || cleanQuery.includes("repo") || cleanQuery.includes("code");
    const isAskingLinkedin = cleanQuery.includes("linkedin") || cleanQuery.includes("social");
    const isAskingResume = cleanQuery.includes("resume") || cleanQuery.includes("cv") || cleanQuery.includes("download");

    if (isAskingContact || cleanQuery.includes("who")) {
      actions.push({ label: "Email Kartik", href: `mailto:${aiKnowledge.contacts.email}`, icon: Mail });
    }
    if (isAskingGithub || isAskingContact || cleanQuery.includes("who")) {
      actions.push({ label: "GitHub Profile", href: aiKnowledge.contacts.github, icon: GithubIcon });
    }
    if (isAskingLinkedin || isAskingContact || cleanQuery.includes("who")) {
      actions.push({ label: "LinkedIn Profile", href: aiKnowledge.contacts.linkedin, icon: LinkedinIcon });
    }
    if (isAskingResume) {
      actions.push({ label: "CV Download", href: "#", icon: Download });
    }

    if (maxMatchCount > 0 && bestMatch) {
      return {
        text: bestMatch.answer,
        actions: actions.length > 0 ? actions : undefined
      };
    }

    // Catch-all response
    return {
      text: aiKnowledge.fallbackMessage,
      actions: [
        { label: "Email Kartik", href: `mailto:${aiKnowledge.contacts.email}`, icon: Mail },
        { label: "Connect LinkedIn", href: aiKnowledge.contacts.linkedin, icon: LinkedinIcon }
      ]
    };
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) {
        throw new Error("RAG API Route failed");
      }

      const data = await res.json();
      const localResponse = processQuery(textToSend);

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.text || localResponse.text,
        timestamp: new Date(),
        actions: localResponse.actions
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.warn("Falling back to client-side QA due to API error:", error);
      const response = processQuery(textToSend);
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date(),
        actions: response.actions
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  return (
    <>
      {/* Floating Activation Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -45 }}
              onClick={toggleChat}
              className="relative p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center cursor-pointer group focus:outline-none"
              aria-label="Open AI Assistant"
              id="ai-float-button"
            >
              {/* Outer pulsing glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/25 animate-ping opacity-60" />
              <Cpu className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              <span className="absolute right-12 bottom-2 bg-[#030014] text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                TALK TO KARTIK AI
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-32px)] h-[500px] glass-panel bg-[#04011d]/95 rounded-3xl border-white/10 shadow-[0_10px_50px_rgba(168,85,247,0.2)] flex flex-col justify-between overflow-hidden z-50"
            id="ai-chat-window"
          >
            {/* Header branding */}
            <div className="p-4 border-b border-white/5 bg-[#030014] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Cpu className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight flex items-center gap-1">
                    {aiKnowledge.botName}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono">BCA AI Agent v1.0</p>
                </div>
              </div>

              <button
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                id="ai-chat-close"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 items-start ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/85 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 text-xs">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                    )}
                    
                    <div className="space-y-2 max-w-[80%]">
                      {/* Bubble content */}
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          isBot
                            ? "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none font-sans"
                            : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-tr-none font-medium"
                        }`}
                      >
                        {msg.text.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? "mt-1" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* Bot Quick Actions */}
                      {isBot && msg.actions && (
                        <div className="flex flex-wrap gap-1.5">
                          {msg.actions.map((act, aIdx) => {
                            const ActIcon = act.icon;
                            return (
                              <a
                                key={aIdx}
                                href={act.href}
                                onClick={(e) => {
                                  if (act.label === "CV Download") {
                                    e.preventDefault();
                                    alert("Downloading CV Summary...");
                                  }
                                }}
                                target={act.href === "#" ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 hover:text-white border border-cyan-500/20 text-[10px] text-cyan-400 font-semibold transition-all"
                              >
                                <ActIcon className="w-3 h-3" />
                                {act.label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-lg bg-purple-950/85 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 items-start justify-start">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/85 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#030014]/50 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              {aiKnowledge.suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/5 text-[10px] text-gray-300 hover:text-cyan-400 transition-all font-semibold shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/5 bg-[#030014] flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Kartik AI (e.g. 'skills' or 'contact')"
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-cyan-500/50 text-gray-200 outline-none transition-all placeholder:text-gray-500"
                id="ai-chat-input"
              />
              <button
                onClick={() => handleSend(input)}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:brightness-110 flex items-center justify-center transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                aria-label="Send message"
                id="ai-chat-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
