"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    // Set canvas dimensions
    const resizeCanvas = () => {
      // Use parent container bounding box to size canvas
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 800;
      canvas.height = Math.min(rect?.height || 400, 350);
      initParticles();
    };

    class Particle {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      density: number;
      size: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = 0;
        this.vy = 0;
        this.density = Math.random() * 20 + 10;
        this.size = 1.5;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 22; // Radius of the deflection orb

        if (mouse.active && distance < forceRadius) {
          // Calculate force pushing particle away from cursor
          const force = (forceRadius - distance) / forceRadius;
          const directionX = dx / (distance || 1);
          const directionY = dy / (distance || 1);

          // Push the particle away
          this.vx -= directionX * force * 6;
          this.vy -= directionY * force * 6;
        } else {
          // Return to base position (restoring spring force)
          const dxBase = this.baseX - this.x;
          const dyBase = this.baseY - this.y;
          this.vx += dxBase * 0.08;
          this.vy += dyBase * 0.08;
        }

        // Apply friction and speed updates
        this.vx *= 0.82;
        this.vy *= 0.82;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(6, 182, 212, 0.85)"; // Cyan dots
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];

      // Create an offscreen canvas to scan text pixels
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offscreen.width = canvas.width;
      offscreen.height = canvas.height;

      // Draw the "404" text on offscreen canvas
      const fontSize = Math.min(canvas.width / 4, 180);
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `bold ${fontSize}px font-mono, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("404", canvas.width / 2, canvas.height / 2);

      const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Density gap of dots
      const gap = 8;

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 128) {
            particles.push(new Particle(x, y));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw connection lines
      ctx.strokeStyle = "rgba(168, 85, 247, 0.15)"; // Purple lines
      ctx.lineWidth = 0.5;
      const connectionDist = 14;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 3. Draw the cursor orb boundary if active
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        
        // Gradient stroke for a high-end glowing field orb
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 12, mouse.x, mouse.y, 22);
        grad.addColorStop(0, "rgba(6, 182, 212, 0)");
        grad.addColorStop(0.5, "rgba(6, 182, 212, 0.05)");
        grad.addColorStop(1, "rgba(6, 182, 212, 0.4)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Track mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initial setup
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col justify-center items-center relative overflow-hidden px-6">
      {/* Background neon grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08071a_1px,transparent_1px),linear-gradient(to_bottom,#08071a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Background glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10 space-y-8">
        {/* Canvas container */}
        <div className="w-full h-[350px] relative flex justify-center items-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-none"
            style={{ display: "block" }}
          />
        </div>

        {/* Text descriptions */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white/90"
          >
            The page you were looking for doesn&apos;t exist.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-400 text-sm md:text-base max-w-lg mx-auto"
          >
            You may have mistyped the address or the page may have moved.
          </motion.p>
        </div>

        {/* Actions button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all border border-cyan-400/20 group cursor-pointer"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Go back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
