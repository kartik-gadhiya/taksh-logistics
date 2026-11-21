"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/InteractiveEffects";
import { ChevronDown, ArrowRight, Navigation } from "lucide-react";

export const Hero = () => {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-[#020B18] pt-20 pb-20"
    >
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none [will-change:transform] transform-gpu"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-[7] container mx-auto px-4 md:px-8 flex items-center justify-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col items-center text-center w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            En Dessus Transport Services (EDTS) By kartik
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 font-outfit drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            Powering{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-500 via-rose-300 to-white bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(220,38,38,0.4)]">
                Global Container
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ transformOrigin: "left", width: "100%" }}
              />
            </span>
            <br />Transportation
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            Lifted with Care, Delivered with Trust. Premium container transport solutions connecting ports, warehouses, and businesses with speed and reliability.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/tracking"
              className="group inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-red-500/55 transition-all duration-300"
            >
              <Navigation className="w-4 h-4" />
              Track Shipment
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl border border-white/20 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-xl hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            >
              Get Freight Quote
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9] flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.35em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};
