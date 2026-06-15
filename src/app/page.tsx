import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import TechWall from "@/components/TechWall";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import GithubDashboard from "@/components/GithubDashboard";
import Blog from "@/components/Blog";
import HireMe from "@/components/HireMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  // JSON-LD structured schema data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kartik Verma",
    "jobTitle": "BCA Student & IoT Learner",
    "url": "https://kartikverma.dev",
    "description": "BCA student, technology enthusiast, full-stack web developer, AI experimenter, and ESP32/ESP8266 IoT builder.",
    "knowsAbout": [
      "Computer Science",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Internet of Things",
      "ESP32",
      "ESP8266",
      "Arduino",
      "Artificial Intelligence"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "IMS Ghaziabad (University Courses Campus)"
    },
    "sameAs": [
      "https://github.com/kartikverma-dev",
      "https://www.linkedin.com/in/kartik-verma-5459a5378"
    ]
  };

  return (
    <>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 w-full mx-auto relative z-10" id="main-content">
        {/* Section wrappers mapping back to navigation anchors */}
        <Hero />
        <About />
        <Skills />
        <Experience />
        <TechWall />
        <Projects />
        <Achievements />
        <GithubDashboard />
        <Blog />
        <HireMe />
        <Contact />
      </main>

      <Footer />
      
      {/* Resume Preview Modal */}
      <ResumeModal />
      
      {/* Floating AI Agent */}
      <AiAssistant />
    </>
  );
}
