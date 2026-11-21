"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const About = () => {
  const steps = [
    {
      title: "Port / ICD",
      sub: "Container Pickup",
      type: "image",
      src: "/fleet_ship.png",
    },
    {
      title: "Custom Clearance",
      sub: "Quick & Hassle Free",
      type: "image",
      src: "/custom_clearance.png",
    },
    {
      title: "Transportation",
      sub: "Safe & Reliable",
      type: "image",
      src: "/indian_truck.png",
    },
    {
      title: "Warehousing",
      sub: "Secure Storage",
      type: "image",
      src: "/indian_warehouse.png",
    },
    {
      title: "Final Delivery",
      sub: "On-Time Delivery",
      type: "image",
      src: "/red_container_delivered.png",
    },
  ];

  const milestones = [
    { year: "2009", label: "Founded", desc: "Started as a local transport provider", icon: "plus" },
    { year: "2012", label: "First Milestone", desc: "Expanded fleet & customer base", icon: "arrow" },
    { year: "2015", label: "Pan India Expansion", desc: "Reached 50+ cities across India", icon: "plane" },
    { year: "2018", label: "Technology Driven", desc: "Integrated GPS tracking & digital system", icon: "arrow" },
    { year: "2021", label: "New Heights", desc: "Handled 3000+ containers/month", icon: "arrow" },
    { year: "2024", label: "Future Ready", desc: "Expanding globally with stronger network", icon: "arrow", highlight: true },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f8fafc] dark:bg-[#04080f] py-16 md:py-24 transition-colors duration-500"
    >
      {/* ── Layered background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] [background-image:linear-gradient(rgba(220,38,38,1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,1)_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* Radial glow blobs */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-red-600/5 dark:bg-red-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 dark:bg-red-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 max-w-[1500px] relative z-10">
        
        {/* ══════════════════════════════════════════════
            PROCESS GRID CONTAINER WITH EMBEDDED TITLE
        ══════════════════════════════════════════════ */}
        <div className="relative border border-red-500/20 dark:border-red-500/10 rounded-[2.5rem] bg-white/30 dark:bg-slate-950/20 backdrop-blur-xl p-8 md:p-10 shadow-lg dark:shadow-none mb-20 transition-all duration-500">
          
          {/* Section Heading centered over top border */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 bg-[#f8fafc] dark:bg-[#04080f] text-red-600 dark:text-red-400 font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs text-center select-none whitespace-nowrap transition-colors duration-500">
            End-to-End Container Transport Solutions
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-2 mt-4">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative group w-full h-full rounded-[2rem] border border-gray-200/50 dark:border-white/5 bg-white dark:bg-white/[0.01] p-5 shadow-sm hover:shadow-xl dark:hover:border-red-500/20 transition-all duration-500 flex flex-col items-center text-center">
                    
                    {/* Visual Container */}
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-5 bg-slate-100 dark:bg-slate-900 border border-gray-100 dark:border-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                      {step.src && (
                        <Image
                          src={step.src}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 20vw"
                        />
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white font-outfit uppercase tracking-wider mb-1">
                      {step.title}
                    </h3>
                    
                    {/* Step Subtitle */}
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-light leading-snug">
                      {step.sub}
                    </p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex lg:hidden items-center justify-center my-2">
                    <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                  </div>
                )}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-1">
                    <ArrowRight className="w-4 h-4 text-red-500/60 dark:text-red-500/40" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TIMELINE SECTION
        ══════════════════════════════════════════════ */}
        <div className="relative">
          
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-8 bg-red-600/40" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-red-600 dark:text-red-400 uppercase">
              Our Journey
            </span>
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-white/5" />
          </div>

          {/* Timeline Track */}
          <div className="relative">
            {/* Horizontal connection line for desktop */}
            <div className="absolute top-5 left-[8%] right-[8%] h-[1.5px] border-t border-dashed border-red-500/30 dark:border-red-500/20 hidden md:block" />

            {/* Vertical connection line for mobile */}
            <div className="absolute top-5 bottom-5 left-5 w-[1.5px] border-l border-dashed border-red-500/30 dark:border-red-500/20 md:hidden" />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4">
              {milestones.map((m, i) => {
                const isHighlight = m.highlight;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="relative flex flex-row md:flex-col items-start md:items-center md:text-center pl-14 md:pl-0 group"
                  >
                    {/* Circle Node */}
                    <div className={`absolute left-0 md:relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 z-10 shadow-lg
                      ${isHighlight 
                        ? "bg-red-600 border-red-600 text-white shadow-red-500/30 dark:shadow-red-500/20" 
                        : "bg-white dark:bg-[#0a1020] border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 group-hover:border-red-600 dark:group-hover:border-red-400 group-hover:bg-red-600 group-hover:text-white"
                      }`}
                    >
                      {m.icon === "plus" && <span className="text-sm font-bold">+</span>}
                      {m.icon === "plane" && (
                        <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                      {m.icon === "arrow" && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>

                    {/* Milestone details */}
                    <div className="flex flex-col md:items-center mt-0.5 md:mt-4">
                      <div className="text-red-600 dark:text-red-400 font-bold text-xs font-outfit leading-none mb-1">
                        {m.year}
                      </div>
                      <div className="text-gray-900 dark:text-white font-bold text-sm mb-1 leading-tight">
                        {m.label}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-[150px]">
                        {m.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
