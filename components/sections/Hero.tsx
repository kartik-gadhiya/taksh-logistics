"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/InteractiveEffects";
import { ChevronDown, ArrowRight, Navigation } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#020B18] pt-20 pb-20 transition-colors duration-500"
    >
      {/* ── Background Image & Theme-Adaptive Overlays ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Same Image for both Light & Dark mode */}
        <Image
          src="/hero_container_light_bg.jpg"
          alt="Taksh Logistics Global Container Transportation"
          fill
          priority
          quality={90}
          className="object-cover object-center transition-all duration-700 brightness-100 contrast-100 dark:brightness-[0.45] dark:contrast-125 dark:saturate-[0.85]"
          sizes="100vw"
        />

        {/* Primary vertical gradient: clean crisp white in Light Mode, deep midnight (#020B18) in Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/80 dark:from-[#020B18] dark:via-[#020B18]/70 dark:to-[#020B18]/85 transition-colors duration-500 pointer-events-none" />

        {/* Horizontal balance wash for optimal center readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60 dark:from-[#020B18]/65 dark:via-transparent dark:to-[#020B18]/65 transition-colors duration-500 pointer-events-none" />

        {/* Vignette depth overlay adapting theme-wise */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(255,255,255,0.7)_85%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020B18_85%)] opacity-70 transition-all duration-500 pointer-events-none" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 backdrop-blur-md shadow-sm"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            En Dessus Transport Services (EDTS)
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6 font-outfit drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            Powering{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-red-700 dark:from-red-500 dark:via-rose-300 dark:to-white bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_2px_8px_rgba(220,38,38,0.4)]">
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
            className="text-base md:text-lg text-slate-700 dark:text-white/90 max-w-2xl mx-auto font-normal dark:font-light leading-relaxed mb-10 drop-shadow-[0_1px_4px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
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
              className="group inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Navigation className="w-4 h-4" />
              Track Shipment
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl border border-slate-300/80 dark:border-white/20 bg-white/80 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-sm uppercase tracking-wider backdrop-blur-xl hover:bg-white dark:hover:bg-white/20 hover:border-slate-400 dark:hover:border-white/40 shadow-lg shadow-black/5 dark:shadow-white/5 hover:-translate-y-0.5 transition-all duration-300"
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
        <span className="text-[9px] font-bold text-slate-400 dark:text-white/25 uppercase tracking-[0.35em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-slate-400 dark:text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};
